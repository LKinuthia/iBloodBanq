import React from 'react';
import './VisionMissionSection.css';

const VisionMissionSection = () => {
    return (
        <div className="vision-mission-section">
            <div className="overlay">
                <div className="vision-container">
                    <div className="vertical-line"></div>
                    <div className="content">
                        <h2>Our Vision</h2>
                        <p>To save lives through the provision of safe and adequate blood and blood products, effectively and efficiently to all people in need.</p>
                        <div className="highlight">
                            <div className="red-box">In 10Yrs</div>
                            <p>To create a seamless and efficient healthcare ecosystem where every individual has timely access to safe blood and essential health information, regardless of their location.</p>
                        </div>
                    </div>
                </div>
                <div className="mission-container">
                    <div className="vertical-line"></div>
                    <div className="content">
                        <h2>Our Mission</h2>
                        <p>To empower hospitals and healthcare facilities with real-time digital solutions for managing and sharing blood supplies, ensuring that no patient suffers due to the unavailability of blood. We strive to connect donors and healthcare providers through a unified platform, promoting life-saving blood donations and efficient resource distribution across all regions.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VisionMissionSection;
