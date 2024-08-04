import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserDonation.css';

const DonationForm = () => {
    // State variables
    const [donationLocation, setDonationLocation] = useState('bloodBank'); // Default to blood bank
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const navigate = useNavigate();

    // Handle location change
    const handleLocationChange = (event) => {
        setDonationLocation(event.target.value);
    };

    // Handle address change
    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    // Handle name change
    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    // Handle phone number change
    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const donationDetails = {
            name,
            phone,
            location: donationLocation,
            address: donationLocation === 'home' ? address : 'N/A'
        };
        console.log('Donation Details:', donationDetails);

        try {
            // Send data to the backend
            await axios.post('http://localhost:5000/api/donate', donationDetails);
             // Show a success message
            if (donationLocation === 'home') {
                alert('Thank you for your donation! You will be contacted within the next 48 hours.');
            } else {
                alert('Donation details submitted successfully!');
            }
            navigate('/');
        } catch (error) {
            console.error('Error submitting donation details:', error);
            alert('There was an error submitting your donation.');
        }
    };

    return (
        <div className="donation-form">
            <h1>Donate Blood</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Phone Number:
                        <input
                            type="tel"
                            value={phone}
                            onChange={handlePhoneChange}
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        <input
                            type="radio"
                            value="bloodBank"
                            checked={donationLocation === 'bloodBank'}
                            onChange={handleLocationChange}
                        />
                        Donate at a Blood Bank
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="home"
                            checked={donationLocation === 'home'}
                            onChange={handleLocationChange}
                        />
                        Donate at Home
                    </label>
                </div>
                {donationLocation === 'home' && (
                    <div className="form-group">
                        <label>
                            Address:
                            <input
                                type="text"
                                value={address}
                                onChange={handleAddressChange}
                                required
                            />
                        </label>
                    </div>
                )}
                <button className='user' type="submit">Submit Donation</button>
            </form>
        </div>
    );
};

export default DonationForm;
