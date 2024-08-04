import React from 'react';
import { Link } from 'react-router-dom'; 
import './DashboardNavbar.css'; 

const DashboardNavbar = ({ hospitalName, notificationCount }) => {
  return (
    <nav className="dashboard-navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          Dashboard
        </Link>
      </div>
      <div className="navbar-right">
        <span className="hospital-name">{hospitalName}</span>
        <div className="notifications">
          <i className="fas fa-bell"></i>
          {notificationCount > 0 && (
            <span className="notification-count">{notificationCount}</span>
          )}
        </div>
        <div className="profile">
          <Link className="profile-link">
            <i className="fas fa-user-circle"></i>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
