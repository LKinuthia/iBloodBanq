import React from 'react';
import './About.css';

const AboutUs = () => {
    return (
        <div className="about-us">
            <div className="about-us-header">
                <h1>Who we are</h1>
                <div className='underline'>
                    <span className='line'></span>
                    <img src='/images/img-3.png' alt='Decoration' className='underline-image' />
                    <span className='line'></span>
                </div>
                <p>iBloodBanq is a technology platform designed to facilitate easier access to vital, life-saving health information. Every day, millions of patients face life-threatening situations due to a lack of real-time health information. For instance, nearly 3 out of every 5 mothers are at risk of death during childbirth, partly due to the unavailability of safe blood for transfusion. This happens even though the necessary blood products might be available at a nearby hospital.
iBloodBanq addresses this issue by connecting all hospitals to a single digital platform, enabling them to share real-time information. This connectivity allows hospitals to quickly source blood products from neighboring facilities when they do not have the required resources themselves.</p>
                <p>Unfortunately, not every Kenyan willing to donate blood could do so due to geographical limitations. iBloodBanq aims to overcome these challenges by enabling any willing Kenyan to participate in life-saving blood donation from anywhere in the country. It also facilitates real-time networking among facilities, allowing for the efficient exchange of donated blood products and ensuring timely medical care for those in need.</p>
            </div>
        </div>
    );
};

export default AboutUs;