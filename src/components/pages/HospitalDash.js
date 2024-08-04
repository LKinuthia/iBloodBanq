import React from 'react';
import '../../App.css';
import Dashboards from '../HospitalDashbar';
import Footer from '../Footer';

function HospitalDashboard({ hospital, handleLogout}) {

    return (
        <>
            <Dashboards hospital={hospital} handleLogout={handleLogout} />
            <Footer />
        </>
    );
}

export default HospitalDashboard;