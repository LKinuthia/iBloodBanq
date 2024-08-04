import React from 'react';
import '../../App.css';
import HeroAbout from '../HeroAbout';
import About from '../About';
import VisionMissionSection from '../VisionMissionSection';
import CampaignPage from '../Campaigns';
import Footer from '../Footer';

function AboutUs() {
  return (
    <>
      <HeroAbout />
      <About />
      <VisionMissionSection />
      <CampaignPage />
      <Footer />
    </>
  );
}

export default AboutUs;