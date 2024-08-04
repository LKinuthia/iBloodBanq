import React, { useState, useEffect } from 'react';
import { db, collection, query, where, getDocs, updateDoc, doc } from '../../firebase';
import './AdminRequest.css';
import Sidebar from '../Sidebar';
import axios from 'axios'; 

const Requests = ({ handleLogout }) => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                // Query for 'requests' collection
                const requestsQuery = query(collection(db, 'requests'), where('status', '==', 'pending'));
                const requestsSnapshot = await getDocs(requestsQuery);
                const requestsList = requestsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                // Query for 'bloodRequests' collection
                const bloodRequestsQuery = query(collection(db, 'bloodRequests'), where('status', '==', 'pending'));
                const bloodRequestsSnapshot = await getDocs(bloodRequestsQuery);
                const bloodRequestsList = bloodRequestsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                // Combine both lists
                const combinedRequests = [...requestsList, ...bloodRequestsList];
                setRequests(combinedRequests);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        };

        fetchRequests();
    }, []);

    const sendSMSNotification = async (phone, message) => {
        try {
            await axios.post('http://localhost:5000/send-sms', {
                to: phone,
                body: message
            });
        } catch (error) {
            console.error('Error sending SMS notification:', error);
        }
    };

    const handleApprove = async (id, phone) => {
        try {
            // Determine the collection based on request ID
            const requestRef = await findRequestRef(id);
            if (requestRef) {
                await updateDoc(requestRef, { status: 'approved' });
                setRequests(prevRequests => prevRequests.filter(request => request.id !== id));

                // Send SMS notification
                sendSMSNotification(phone, `Your blood request with ID ${id} has been approved.`);
            }
        } catch (error) {
            console.error('Error approving request:', error);
        }
    };

    const handleReject = async (id, phone) => {
        try {
            // Determine the collection based on request ID
            const requestRef = await findRequestRef(id);
            if (requestRef) {
                await updateDoc(requestRef, { status: 'rejected' });
                setRequests(prevRequests => prevRequests.filter(request => request.id !== id));

                // Send SMS notification
                sendSMSNotification(phone, `Your blood request with ID ${id} has been rejected.`);
            }
        } catch (error) {
            console.error('Error rejecting request:', error);
        }
    };

    // Function to determine the correct collection and document reference based on ID
    const findRequestRef = async (id) => {
        try {
            const requestsRef = collection(db, 'requests');
            const bloodRequestsRef = collection(db, 'bloodRequests');

            let requestDoc = await getDocs(query(requestsRef, where('__name__', '==', id)));
            if (!requestDoc.empty) {
                return doc(db, 'requests', id);
            }

            requestDoc = await getDocs(query(bloodRequestsRef, where('__name__', '==', id)));
            if (!requestDoc.empty) {
                return doc(db, 'bloodRequests', id);
            }

            return null;
        } catch (error) {
            console.error('Error finding request reference:', error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="requests-page">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} handleLogout={handleLogout} />
            <div className={`requests-container ${isSidebarOpen ? 'shifted' : ''}`}>
                <button className="sidebar-toggles" onClick={toggleSidebar}>
                    ☰
                </button>
                <h1>Pending Blood Requests</h1>
                {requests.length === 0 ? (
                    <p>No pending requests.</p>
                ) : (
                    <ul className="requests-list">
                        {requests.map(request => (
                            <li key={request.id} className="request-item">
                                <div className="request-details">
                                    {request.name && <p><strong>User:</strong> {request.name}</p>}
                                    <p><strong>Contact:</strong> {request.contactPerson || request.phone}</p>
                                    <p><strong>Blood Type:</strong> {request.bloodType}</p>
                                    <p><strong>Hospital:</strong> {request.hospitalName || request.hospital}</p>
                                    {request.quantity && <p><strong>Quantity:</strong> {request.quantity}</p>}
                                    {request.componentsNeeded && <p><strong>Components Needed:</strong> {request.componentsNeeded}</p>}
                                    <p><strong>Date:</strong> {new Date(request.timestamp).toLocaleDateString()}</p>
                                    {request.isEmergency && <p className="emergency-label">Emergency</p>}
                                </div>
                                <div className="request-actions">
                                    <button onClick={() => handleApprove(request.id, request.phone)} className="approve-button">Approve</button>
                                    <button onClick={() => handleReject(request.id, request.phone)} className="reject-button">Reject</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Requests;
