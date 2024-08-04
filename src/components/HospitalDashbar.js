import React, { useState } from 'react';
import Sidebar from './SiderbarHospital';
import './Dashbar.css';
import RecordListHospital from './RecordListHospital';

const HospitalDashbar = ({ hospital, handleLogout }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard">
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} handleLogout={handleLogout} />
                <div className="dashboard-header">
                    <button className="sidebar-toggle" onClick={toggleSidebar}>
                        ☰
                    </button>
                    </div>
                    <div className="dashboard-content">
                    <h2>Welcome to: {hospital?.name || 'Hospital'}</h2> 
                    <RecordListHospital />
                </div>
            </div>
        </div>
    );
};

export default HospitalDashbar;
