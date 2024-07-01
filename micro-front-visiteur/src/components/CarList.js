import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CarList.css';

const CarList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/voiture');
        setCars(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchCars();
  }, []);

  return (
    <main>
      {cars.map(car => (
        <div key={car.id} className="card2">
          <img src={car.image} alt="" />
          <div className="card-content2">
            <h2>{car.nomv}</h2>
            <p>{car.description}</p>
            <a href="#" className="button2">
              Find out more 
              <span className="material-symbols-outlined">
                arrow_right_alt
              </span>
            </a>
          </div>
        </div>
      ))}
    </main>
  );
};

export default CarList;