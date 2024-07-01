import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaDollarSign, FaLock, FaCar, FaHeadset, FaUser, FaCarSide, FaCheckCircle, FaCalendarCheck } from 'react-icons/fa';
import './home.css';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/footer';

const Home = () => {
  const [cars, setCars] = useState([]);
  const [newcars, setNewCars] = useState([]);
  const navigate = useNavigate();
  const [expandedDescription, setExpandedDescription] = useState({});

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/voiture');
        setCars(response.data);
        setNewCars(response.data.filter(car => car.annéeModel === 2024));
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchCars();
  }, []);

  const handleDetailClick = (id) => {
    navigate(`/details/${id}`);
  };

  const toggleDescription = (index) => {
    setExpandedDescription((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div className="home-container">
      <div className="background-image">
        <span className="animated-text1">Bienvenue </span>
        <span className="animated-text"> Sur CarRental</span>
      </div>

      <div className="qualities-section">
        <h1>Pourquoi nous choisir ?</h1>
        <div className="qualities">
          <div className="quality">
            <FaDollarSign className="icon" />
            <p>Prix Convenable</p>
          </div>
          <div className="quality">
            <FaLock className="icon" />
            <p>Paiement Sécurisé</p>
          </div>
          <div className="quality">
            <FaCar className="icon" />
            <p>Voitures Performantes</p>
          </div>
          <div className="quality">
            <FaHeadset className="icon" />
            <p>Bon Service Client</p>
          </div>
        </div>
      </div>

      <div className="home-page">
        <h1>Nouvelles Collections</h1>
        <div className="home-grid">
          {newcars.slice(0,3).map((car, index) => (
            <figure key={index} className="snip14181">
              <img src={car.image} alt={car.nomv} />
              <figcaption>
                <h3>{car.nomv}</h3>
                <p>Année : {car.annéeModel}</p>
                <p className={`description ${expandedDescription[index] ? 'expanded' : ''}`}>
                  {car.description}
                </p>
                <button className="toggle-description" onClick={() => toggleDescription(index)}>
                  {expandedDescription[index] ? 'Voir moins' : 'Voir plus'}
                </button>
                <div className="price">${car.prix}</div>
                <button className="see-from-cart" onClick={() => handleDetailClick(car.id)}>
                  Voir details de la voiture
                </button>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <div className="steps-section">
        <h1>Comment Réserver</h1>
        <div className="steps-container">
          <div className="route-line"></div>
          <div className="step">
            <div className="step-icon">
              <FaUser />
            </div>
            <div className="step-content">
              <h3>S'authentifier</h3>
              <p>Créez un compte ou connectez-vous pour accéder à toutes les fonctionnalités.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-icon">
              <FaCarSide />
            </div>
            <div className="step-content">
              <h3>Choisir une voiture</h3>
              <p>Parcourez notre catalogue et choisissez la voiture qui vous convient.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-icon">
              <FaCheckCircle />
            </div>
            <div className="step-content">
              <h3>Vérifier la disponibilité</h3>
              <p>Assurez-vous que la voiture est disponible pour la période souhaitée.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-icon">
              <FaCalendarCheck />
            </div>
            <div className="step-content">
              <h3>Réserver</h3>
              <p>Complétez la réservation en fournissant les informations nécessaires et effectuez le paiement.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="home-page">
        <h1>Nos Voitures</h1>
        <div className="home-grid">
          {cars.slice(2, 6).map((car, index) => (
            <figure key={index} className="snip14181">
              <img src={car.image} alt={car.nomv} />
              <figcaption>
                <h3>{car.nomv}</h3>
                <p>Année : {car.annéeModel}</p>
                <p className={`description ${expandedDescription[index] ? 'expanded' : ''}`}>
                  {car.description}
                </p>
                <button className="toggle-description" onClick={() => toggleDescription(index)}>
                  {expandedDescription[index] ? 'Voir moins' : 'Voir plus'}
                </button>
                <div className="price">${car.prix}</div>
                <button className="see-from-cart" onClick={() => handleDetailClick(car.id)}>
                  Voir details de la voiture
                </button>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
     
    
      <div className="about-section">
        <div className="about-section-content">
          <h2>À Propos de Nous</h2>
          <p>
            CarRental est votre partenaire de confiance pour la location de voitures. Nous offrons des services de qualité avec une large gamme de véhicules pour répondre à vos besoins. Notre mission est de vous fournir une expérience de location de voiture facile, sécurisée et agréable.
          </p>
        </div>
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" alt="About Us" />
      </div>
      
      <Footer />
    </div>
  );
};

export default Home;
