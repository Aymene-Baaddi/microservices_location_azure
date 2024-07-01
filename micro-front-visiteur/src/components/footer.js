import React from 'react';
import './footer.css';
import { FaFacebook, FaGoogle, FaApple, FaAndroid } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="footer">
      <div className="contact-info">
        
        <p>Email: AymeneTaha@carrental.com</p>
        <p>Téléphone: +212637982413</p>
        <p>Adresse: 123 Rue ARD SGHIR, Casablanca, Maroc</p>
        <div className="social-icons">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a>
          <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
            <FaGoogle />
          </a>
        </div>
        <div className="store-badges">
          <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg" alt="App Store" />
          </a>
          
        </div>
      </div>
      <img src="https://images.wallpaperscraft.com/image/single/bmw_headlights_lights_137326_300x188.jpg" alt="About Us" />
    </div>
  );
};

export default Footer;
