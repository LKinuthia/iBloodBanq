import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar, handleLogout }) => {
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        handleLogout();
        toggleSidebar();
        navigate('/login');
    };


    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button className="sidebar-close" onClick={toggleSidebar}>
                &times;
            </button>
            <ul>
                <li>
                    <NavLink
                        to="/dash"
                        activeClassName="active"
                        onClick={toggleSidebar}
                    >
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/records"
                        activeClassName="active"
                        onClick={toggleSidebar}
                    >
                        Blood Records
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/requests"
                        activeClassName="active"
                        onClick={toggleSidebar}
                    >
                        Requests
                    </NavLink>
                </li>
                <li>
                    <button onClick={handleLogoutClick}>
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
