import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './FindBloodHero.css';

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay !== null) {
      const tick = () => {
        savedCallback.current();
      };
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const FindBlood = () => {
  const [totalDemand, setTotalDemand] = useState(0);
  const [totalDonation, setTotalDonation] = useState(0);
  const [displayDemand, setDisplayDemand] = useState(0);
  const [displayDonation, setDisplayDonation] = useState(0);
  const [bloodTypeCounts, setBloodTypeCounts] = useState([]);
  const [displayBloodTypeCounts, setDisplayBloodTypeCounts] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/data')
      .then(response => {
        calculateTotals(response.data);
        calculateBloodTypeCounts(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const calculateTotals = (data) => {
    const totalDemand = data.reduce((acc, item) => acc + item.Use, 0);
    const totalDonation = data.reduce((acc, item) => acc + item.Donate, 0);
    setTotalDemand(totalDemand);
    setTotalDonation(totalDonation);
  };

  const calculateBloodTypeCounts = (data) => {
    const totalBloodTypes = data.reduce((acc, item) => {
      acc[item['Blood Type']] = (acc[item['Blood Type']] || 0) + item.Donate;
      return acc;
    }, {});
    const counts = Object.entries(totalBloodTypes).map(([bloodType, count]) => ({ bloodType, count }));
    setBloodTypeCounts(counts);
    setDisplayBloodTypeCounts(counts.map(item => ({ ...item, count: 0 })));
  };

  useInterval(() => {
    if (displayDemand < totalDemand) {
      setDisplayDemand(prev => Math.min(prev + Math.ceil(totalDemand / 100), totalDemand));
    }
    if (displayDonation < totalDonation) {
      setDisplayDonation(prev => Math.min(prev + Math.ceil(totalDonation / 100), totalDonation));
    }

    setDisplayBloodTypeCounts(displayBloodTypeCounts.map((item, index) => {
      const targetCount = bloodTypeCounts[index]?.count || 0;
      if (item.count < targetCount) {
        return { ...item, count: Math.min(item.count + Math.ceil(targetCount / 100), targetCount) };
      }
      return item;
    }));
  }, 20);

  // Determine the maximum count for scaling purposes
  const maxCount = Math.max(...bloodTypeCounts.map(item => item.count));

  const handleMouseEnter = (index) => {
    const tooltip = document.getElementById(`tooltip-${index}`);
    if (tooltip) {
      tooltip.style.display = 'block';
    }
  };

  const handleMouseLeave = (index) => {
    const tooltip = document.getElementById(`tooltip-${index}`);
    if (tooltip) {
      tooltip.style.display = 'none';
    }
  };

  return (
    <div className="findblood-hero">
      <div className="findblood-content">
        <div className="data-boxes">
          <div className="data-box">
            <img src='/images/img-14.png' alt="Blood Demand" />
            <h3>Blood Demand</h3>
            <p>{displayDonation} p.a Blood Needed</p>
          </div>
          <div className="data-box">
            <img src='/images/img-15.png' alt="Blood Donation" />
            <h3>Blood Donation</h3>
            <p>{displayDemand} p.a Blood Collected</p>
          </div>
        </div>
        <div className="chart-container">
          <h3>Blood Collection Trends</h3>
          <div className='underline'>
            <span className='line'></span>
            <img src='/images/img-3.png' alt='Decoration' className='underline-image' />
            <span className='line'></span>
          </div>
          <div className="bar-graph">
            {displayBloodTypeCounts.map((item, index) => (
              <div className="bar" key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}>
                <div className="bar-fill" style={{ width: `${(item.count / maxCount) * 100}%` }}>
                  <div id={`tooltip-${index}`} className="tooltip">
                    {item.count}
                  </div>
                </div>
                <span className="bar-label">{item.bloodType}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindBlood;
