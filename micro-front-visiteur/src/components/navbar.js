import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    navigate("/");
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark bg-dark  fixed-top ${isScrolled ? 'scrolled' : ''}`}>
      <a className="navbar-brand navbar-brand-custom " >AT2Car</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <a className={`nav-item nav-link nav-link-custom text-white`} onClick={() => navigate("/home")} >Home</a>
          <a className={`nav-item nav-link nav-link-custom text-white`}onClick={() => navigate("/cars")} >Cars</a>
          
         
          <div className="dropdown">
                <a className={`nav-item nav-link nav-link-custom text-white`}>Pages</a>
                    <div className="dropdown-content">
                        <button onClick={() => navigate("/favori")}>Favoris</button>
                        <button onClick={() => navigate("/reservation")}>Reservations</button>
                        <button onClick={() => navigate("/setting")}>Mon Compte</button>
                    
                </div>
                
            </div>
          <a onClick={handleLogout} className={`nav-item nav-link nav-link-custom text-white`} >Log out</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;