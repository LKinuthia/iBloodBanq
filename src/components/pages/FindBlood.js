import React from 'react';
import '../../App.css';
import HeroBlood from '../FindBloodHero';
import Blood from '../FindingBlood';
import Footer from '../Footer';

function FindBlood() {
  return (
    <>
      <HeroBlood />
      <Blood />
      <Footer />
    </>
  );
}

export default FindBlood;