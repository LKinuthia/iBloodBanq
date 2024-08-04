import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import './FindBlood.css';
import RequestForm from './Request';

const FindingBlood = () => {
  const [data, setData] = useState([]);
  const [groupedData, setGroupedData] = useState({});
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showRequestForm, setShowRequestForm] = useState(false);

  const containerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = {
    lat: -1.2921,
    lng: 36.8219,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/data');
        console.log('Data type:', typeof response.data);
        console.log('Response:', response.data);

        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error('Data received is not an array');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const memoizedGroupedData = useMemo(() => {
    const grouped = data.reduce((acc, item) => {
      const location = item.Location;
      const bloodType = item['Blood Type'];
      const supply = item.Supplied;

      if (!acc[location]) {
        acc[location] = {};
      }
      if (!acc[location][bloodType]) {
        acc[location][bloodType] = 0;
      }
      acc[location][bloodType] += supply;

      return acc;
    }, {});

    console.log('Grouped Data:', grouped);
    return grouped;
  }, [data]);

  useEffect(() => {
    setGroupedData(memoizedGroupedData);
  }, [memoizedGroupedData]);

  const getCoordinates = (location) => {
    const locations = {
      'Nairobi': { lat: -1.286389, lng: 36.817223 },
      'Mombasa': { lat: -4.043477, lng: 39.668206 },
      'Kisumu': { lat: -0.091702, lng: 34.768096 },
      'Nakuru': { lat: -0.28333, lng: 36.06666 },
      'Eldoret': { lat: 0.51667, lng: 35.28333 },
    };
    return locations[location] || center;
  };

  const handleMouseOver = useCallback((location) => {
    setHoveredMarker(location);
  }, []);

  const handleMouseOut = useCallback(() => {
    setHoveredMarker(null);
  }, []);

  const handleMarkerClick = useCallback((location) => {
    setSelectedLocation(location);
    setShowRequestForm(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    setShowRequestForm(false);
    setSelectedLocation(null);
  }, []);

  return (
    <div className='finding-blood-container'>
      <h2>Blood Stock Availability</h2>
      <div className='underline'>
        <span className='line'></span>
        <img src='/images/img-3.png' alt='Decoration' className='underline-image' />
        <span className='line'></span>
      </div>
      <LoadScript googleMapsApiKey="AIzaSyD07cMGrAdZzFU1FexlCWLCWlPX-J3g6p4">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={6}>
          {Object.keys(groupedData).map((location, index) => (
            <Marker
              key={index}
              position={getCoordinates(location)}
              onMouseOver={() => handleMouseOver(location)}
              onMouseOut={handleMouseOut}
              onClick={() => handleMarkerClick(location)}
            >
              {hoveredMarker === location && (
                <InfoWindow
                  position={getCoordinates(location)}
                  onCloseClick={() => setHoveredMarker(null)}
                >
                  <div>
                    <h3>{location}</h3>
                    {Object.keys(groupedData[location]).map((bloodType, idx) => (
                      <p key={idx}>Blood Type: {bloodType} : {groupedData[location][bloodType]}</p>
                    ))}
                  </div>
                </InfoWindow>
              )}
            </Marker>
          ))}
        </GoogleMap>
      </LoadScript>
      {selectedLocation && (
        <RequestForm
          show={showRequestForm}
          handleClose={handleCloseForm}
          location={selectedLocation}
        />
      )}
    </div>
  );
};

export default FindingBlood;
