import React, { useState } from 'react';
import './Request.css';
import { db, collection, addDoc } from '../firebase';

const RequestForm = ({ show, handleClose, location }) => {
  const [hospital, setHospital] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [isEmergency, setIsEmergency] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      hospital,
      name,
      phone,
      bloodType,
      isEmergency,
      location,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    try {
      // Add the request data to your database here
      await addDoc(collection(db, 'requests'), requestData);
      // Notify user
      alert('Your request has been received. Thank you!');
      handleClose();
    } catch (error) {
      console.error('Error adding request:', error);
      alert('There was an error submitting your request. Please try again.');
    }
  };

  return (
    show ? (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={handleClose}>&times;</span>
          <h2>Request Blood</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label htmlFor="hospital">Hospital</label>
              <input
                id="hospital"
                type="text"
                placeholder="Enter your hospital"
                value={hospital}
                onChange={(e) => setHospital(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="text"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <label htmlFor="bloodType">Blood Type</label>
              <input
                id="bloodType"
                type="text"
                placeholder="Enter the blood type"
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <label>
                <input
                  type="checkbox"
                  checked={isEmergency}
                  onChange={(e) => setIsEmergency(e.target.checked)}
                />
                Is it an emergency?
              </label>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    ) : null
  );
};

export default RequestForm;
