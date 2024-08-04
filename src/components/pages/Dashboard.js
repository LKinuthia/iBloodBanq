import React, { useEffect } from 'react';
import '../../App.css';
import Dashboards from '../Dashbar';
import Footer from '../Footer';
import { db, collection, query, where, getDocs } from '../../firebase';

function Dashboard({ hospital, handleLogout, updateNotificationCount }) {
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                // Query to get the count of pending notifications from 'requests'
                const requestsQuery = query(collection(db, 'requests'), where('status', '==', 'pending'));
                const requestsSnapshot = await getDocs(requestsQuery);
                const requestsCount = requestsSnapshot.size;

                // Query to get the count of pending notifications from 'bloodRequests'
                const bloodRequestsQuery = query(collection(db, 'bloodRequests'), where('status', '==', 'pending'));
                const bloodRequestsSnapshot = await getDocs(bloodRequestsQuery);
                const bloodRequestsCount = bloodRequestsSnapshot.size;

                // Combine the counts from both collections
                const totalCount = requestsCount + bloodRequestsCount;
                updateNotificationCount(totalCount);
                console.log('Notification count:', totalCount);

            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, [updateNotificationCount]);

    return (
        <>
            <Dashboards hospital={hospital} handleLogout={handleLogout} />
            <Footer />
        </>
    );
}

export default Dashboard;
