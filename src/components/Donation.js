import React, { useState, useEffect } from 'react';
import './Donation.css';

const DonationProcess = () => {
    const steps = [
        { title: 'Register to Donate', description: 'You need to complete a very simple registration form which contains all required contact information needed to begin the donation process.', image: '/images/register.png' },
        { title: 'Screening', description: 'A drop of blood from your finger will be taken for a simple test to ensure that your blood iron levels are suitable for donating blood.', image: '/images/screening.png' },
        { title: 'Donation', description: 'After passing the screening test successfully, you will be directed to a donor bed for donation. This takes between 6-10 minutes only.', image: '/images/donation.png' },
        { title: 'Testing', description: 'Blood is tested for HIV, Hepatitis A & B among other infections.', image: '/images/testing.png' },
        { title: 'Results Collection', description: 'Collect your results at the KNBTS center nearest to where you donated blood from.', image: '/images/results.png' },
    ];

    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep((prevStep) => (prevStep + 1) % steps.length);
        }, 3000); // Change step every 3 seconds

        return () => clearInterval(interval);
    }, [steps.length]);

    return (
        <div className="donation-process">
            <h1>Donation Process</h1>
            <div className='underline'>
                    <span className='line'></span>
                    <img src='/images/img-3.png' alt='Decoration' className='underline-image' />
                    <span className='line'></span>
                </div>
            <div className="step-container">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className={`step ${index === currentStep ? 'active' : ''}`}
                    >
                        <img src={step.image} alt={step.title} className="step-image" />
                        <div className="step-content">
                            <h2>{step.title}</h2>
                            <p>{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="button-container">
                <button className="donate-button" onClick={() => window.location.href='/donate'}>Donate Now</button>
            </div>
        </div>
    );
};

export default DonationProcess;
