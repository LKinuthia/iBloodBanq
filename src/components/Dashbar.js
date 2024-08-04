import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './Dashbar.css';
import RecordListWithModal from './RecordList';

const Dashbar = ({ hospital, handleLogout }) => {
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
                    <RecordListWithModal />
                </div>
            </div>
        </div>
    );
};

export default Dashbar;
