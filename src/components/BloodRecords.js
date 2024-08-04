import React, { useState } from 'react';
import Sidebar from './Sidebar';
import BloodSupplyChart from './BloodSupplyChart';
import './BloodRecords.css';

const BloodRecords = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [predictions, setPredictions] = useState([]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const fetchPredictions = () => {
        fetch('http://127.0.0.1:5000/dashboard/')
            .then(response => response.json())
            .then(data => setPredictions(data))
            .catch(error => console.error('Error fetching predictions:', error));
    };

    return (
        <div className="blood-records-container">
            <Sidebar
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                handleLogout={() => { }}
            />
            <div className="blood-records-content">
                <button className="sidebar-toggler" onClick={toggleSidebar}>
                    ☰
                </button>
                <h1>Blood Records Dashboard</h1>
                <div>
                    <button onClick={fetchPredictions}>Fetch Predictions</button>
                </div>
                <BloodSupplyChart data={predictions} />
            </div>
        </div>
    );
};

export default BloodRecords;
