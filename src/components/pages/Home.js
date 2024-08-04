import React from 'react';
import '../../App.css';
import Cards from '../Cards';
import Content from '../Content';
import DonationProcess from '../Donation';
import HeroSection from '../HeroSection';
import Footer from '../Footer';

function Home() {
  return (
    <>
      <HeroSection />
      <Cards />
      <Content />
      <DonationProcess />
      <Footer />
    </>
  );
}

export default Home;
