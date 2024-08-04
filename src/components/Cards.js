import React from 'react';
import './Cards.css';

function Cards() {
  return (
    <div className='content-container'>
      <div className='heading-container'>
        <h1 className='heading'>
          Learn About Donation
        </h1>
        <div className='underline'>
          <span className='line'></span>
          <img src='/images/img-3.png' alt='Decoration' className='underline-image' />
          <span className='line'></span>
        </div>
      </div>
      <div className='content-body'>
        <div className='left-side'>
          <img src='/images/img-2.png' alt='Sample' className='content-image' />
          <div className='text-below-image'>
            <p>One Blood donation can save up to 3 lives.</p>
            <p>Every 10 minutes, about 10 Kenyans need blood.</p>
          </div>
        </div>
        <div className='right-side'>
          <table className='content-table'>
          <thead>
              <tr>
                <th colSpan="3">Compatible Blood Types Donors</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Blood Type</td>
                <td>Donate Blood To</td>
                <td>Receive Blood From</td>
              </tr>
              <tr>
                <td className='blood-type'>A+</td>
                <td className='data-cell'>A+ AB+</td>
                <td className='data-cell'>A+ A- O+ O-</td>
              </tr>
              <tr>
                <td className='blood-type'>O+</td>
                <td className='data-cell'>O+ A+ B+ AB+</td>
                <td className='data-cell'>O+ O-</td>
              </tr>
              <tr>
                <td className='blood-type'>B+</td>
                <td className='data-cell'>B+ AB+</td>
                <td className='data-cell'>B+ B- O+ O-</td>
              </tr>
              <tr>
                <td className='blood-type'>AB+</td>
                <td className='data-cell'>AB+</td>
                <td className='data-cell'>Everyone</td>
              </tr>
              <tr>
                <td className='blood-type'>A-</td>
                <td className='data-cell'>A+ A- AB+ AB-</td>
                <td className='data-cell'>A- O-</td>
              </tr>
              <tr>
                <td className='blood-type'>O-</td>
                <td className='data-cell'>Everyone</td>
                <td className='data-cell'>O-</td>
              </tr>
              <tr>
                <td className='blood-type'>B-</td>
                <td className='data-cell'>B+ B- AB+ AB-</td>
                <td className='data-cell'>B- O-</td>
              </tr>
              <tr>
                <td className='blood-type'>AB-</td>
                <td className='data-cell'>AB+ AB-</td>
                <td className='data-cell'>AB- A- B- O-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Cards;
