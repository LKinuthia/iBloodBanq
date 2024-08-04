import React from 'react';
import './Campaigns.css';

const CampaignPage = () => {
    return (
        <div className="campaign-container">
            <h1>Blood Donation Campaigns</h1>
            <div className='underline'>
                <span className='line'></span>
                <img src='/images/img-3.png' alt='Decoration' className='underline-image' />
                <span className='line'></span>
            </div>
            <p className="campaign-description">
            Join our impactful Blood Donation Campaign! We are dedicated to inspiring new blood donors to step forward and encouraging existing donors to continue their life-saving contributions. Be a part of this noble cause and help us make a difference in countless lives. Together, we can ensure a steady and sufficient blood supply for those in need. Join our campaign today and be a hero by giving the gift of life.
            </p>
            <div className="image-section">
                <img src="/images/img-11.png" alt="Campaign 1" />
                <img src="/images/img-17.png" alt="Campaign 2" />
                <img src="/images/img-18.jpg" alt="Campaign 3" />
            </div>
            <div className="image-section">
                <img src="/images/img-19.jpg" alt="Campaign 1" />
                <img src="/images/img-20.jpg" alt="Campaign 2" />
                <img src="/images/img-21.jpg" alt="Campaign 3" />
            </div>
        </div>
    );
};

export default CampaignPage;
