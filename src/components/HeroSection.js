import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';

function HeroSection() {
    return (
        <>
            <div className='hero-container'>
                {/* <video src='/videos/video-1.mp4' autoPlay loop muted /> */}
                <h1>Save Life Donate Blood </h1>
                <p>What are you waiting for?</p>
                <div className='hero-btns'>
                    <Button
                        className='btns'
                        buttonStyle='btn--primary'
                        buttonSize='btn--large'
                    >
                        GET STARTED
                    </Button>
                </div>
            </div>
            <div className='boxes'>
                <div className='box'>
                    <h2>Satellitte Hospitals</h2>
                    <p>18 Satellitte Hospitals</p>
                </div>
                <div className='box'>
                    <h2>Blood Banks</h2>
                    <p>6 Regional Blood Banks</p>
                </div>
                <div className='box'>
                    <h2>Blood Drives</h2>
                    <p>Locate nearest Red cross Offices</p>
                </div>

            </div>
        </>
    );
}

export default HeroSection;
