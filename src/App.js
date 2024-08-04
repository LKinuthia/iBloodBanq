import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar.js';
import LoginNavbar from './components/LoginNavbar.js';
import Home from './components/pages/Home';
import AboutUs from './components/pages/AboutUs.js';
import FindBlood from './components/pages/FindBlood.js';
import Login from './components/pages/Login.js';
import Dashboard from './components/pages/Dashboard.js';
import DashboardNavbar from './components/DashboardNavbar.js';
import Requests from './components/pages/AdminRequest.js';
import DonationForm from './components/UserDonation.js';
import BloodRecords  from './components/BloodRecords.js';
import HospitalBloodRecords from './components/HospitalBloodRecords.js'
import HospitalDashboard from './components/pages/HospitalDash.js'

const App = () => {
    const [hospital, setHospital] = useState(null);
    const [notificationCount, setNotificationCount] = useState(0);

    useEffect(() => {
        const savedHospital = localStorage.getItem('hospital');
        if (savedHospital) {
            setHospital(JSON.parse(savedHospital));
        }
    }, []);

    const handleLoginSuccess = (hospital) => {
        setHospital(hospital);
        localStorage.setItem('hospital', JSON.stringify(hospital));
    };

    const handleLogout = () => {
        setHospital(null);
        localStorage.removeItem('hospital');
    };

     // Function to update notification count
     const updateNotificationCount = (count) => {
        setNotificationCount(count);
    };

    return (
        <Router>
            <NavWrapper hospital={hospital} handleLogout={handleLogout} notificationCount={notificationCount} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/findblood" element={<FindBlood />} />
                <Route path="/donate" element={<DonationForm />} />
                <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                <Route path="/dash" element={hospital ? <BloodRecords handleLogout={handleLogout} updateNotificationCount={updateNotificationCount}/> : <Navigate to="/login" />} />
                <Route path="/records" element={hospital ? <Dashboard hospital={hospital} handleLogout={handleLogout} updateNotificationCount={updateNotificationCount}/> : <Navigate to="/login" />} />
                <Route path="/hospital-records" element={hospital ? <HospitalDashboard hospital={hospital} handleLogout={handleLogout} updateNotificationCount={updateNotificationCount}/> : <Navigate to="/login" />} />
                <Route path="/requests" element={hospital ? <Requests handleLogout={handleLogout} updateNotificationCount={updateNotificationCount}/> : <Navigate to="/login" />} />
                <Route path="/hospital-dash" element={hospital ? <HospitalBloodRecords handleLogout={handleLogout}/> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

const NavWrapper = ({ hospital, notificationCount }) => {
    const location = useLocation();

    if (location.pathname === '/login') {
        return <LoginNavbar />;
    } else if (['/dash', '/records', '/requests', '/hospital-dash', '/hospital-records'].includes(location.pathname)) {
        return <DashboardNavbar hospitalName={hospital ? hospital.name : 'Hospital'} notificationCount={notificationCount} />;
    } else {
        return <Navbar />;
    }
};

export default App;
