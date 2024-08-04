import React, { useEffect, useState } from 'react';
import { getBloodRecords } from '../services/bloodService';
import './RecordList.css';
import { db, collection, addDoc } from '../firebase';

const RecordListHospital = () => {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        location: '',
        bloodType: '',
        hospitalName: '',
        contactPerson: '',
        quantity: '',
        componentsNeeded: '',
        timestamp: new Date().toISOString(),
        status: 'pending'
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const records = await getBloodRecords();
                setData(records);
            } catch (error) {
                console.error("Error fetching blood records:", error);
            }
        };
        fetchData();
    }, []);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setForm({
            location: '',
            bloodType: '',
            hospitalName: '',
            contactPerson: '',
            quantity: '',
            componentsNeeded: '',
            timestamp: new Date().toISOString(),
            status: 'pending'
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requestedData = { ...form };
        try {
            // Add the request data to your database here
            await addDoc(collection(db, 'bloodRequests'), requestedData);
            alert('Request submitted successfully!');
            handleCloseModal();
        } catch (error) {
            console.error('Error submitting request: ', error);
        }
    };

    return (
        <div className="blood-bank-container">
            <h1>Available Blood Records</h1>
            <button className="add-request-button" onClick={handleOpenModal}>Request For Blood</button>
            {data.map((item) => (
                <div className="blood-bank-box" key={item.id}>
                    <div className="blood-bank-info">
                        <div className="blood-bank-name-location">
                            <h2>{item.location}</h2>
                            <p>Blood Type: {item.bloodType}</p>
                        </div>
                        <div className="blood-bank-stock">
                            <p>Stock:</p>
                            <ul>
                                {(item.bloodStock || []).map((bloodType, index) => (
                                    <li key={index}>{bloodType.type}: {bloodType.amount}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <h2>Request Blood</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="input-container">
                                <label>Location</label>
                                <input
                                    name="location"
                                    value={form.location}
                                    onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
                                    placeholder="Location"
                                    required
                                />
                            </div>
                            <div className="input-container">
                                <label>Blood Type</label>
                                <input
                                    name="bloodType"
                                    value={form.bloodType}
                                    onChange={(e) => setForm((prev) => ({ ...prev, bloodType: e.target.value }))}
                                    placeholder="Blood Type"
                                    required
                                />
                            </div>
                            <div className="input-container">
                                <label>Hospital Name</label>
                                <input
                                    name="hospitalName"
                                    value={form.hospitalName}
                                    onChange={(e) => setForm((prev) => ({ ...prev, hospitalName: e.target.value }))}
                                    placeholder="Hospital Name"
                                    required
                                />
                            </div>
                            <div className="input-container">
                                <label>Contact Person</label>
                                <input
                                    name="phonenumber"
                                    type="number"
                                    value={form.contactPerson}
                                    onChange={(e) => setForm((prev) => ({ ...prev, contactPerson: e.target.value }))}
                                    placeholder="Phone Number"
                                    required
                                />
                            </div>
                            <div className="input-container">
                                <label>Quantity (Units)</label>
                                <input
                                    name="quantity"
                                    type="number"
                                    value={form.quantity}
                                    onChange={(e) => setForm((prev) => ({ ...prev, quantity: e.target.value }))}
                                    placeholder="Quantity"
                                    required
                                />
                            </div>
                            <div className="input-container">
                                <label>Components Needed</label>
                                <input
                                    name="componentsNeeded"
                                    value={form.componentsNeeded}
                                    onChange={(e) => setForm((prev) => ({ ...prev, componentsNeeded: e.target.value }))}
                                    placeholder="Components Needed"
                                    required
                                />
                            </div>
                            <button type="submit">Submit Request</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecordListHospital;
