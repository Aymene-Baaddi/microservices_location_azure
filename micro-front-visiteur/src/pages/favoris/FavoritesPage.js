import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FavoritesPage.css';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/footer';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [expandedDescription, setExpandedDescription] = useState({});
  const navigate = useNavigate();

  const getUserId = () => {
    const userId = localStorage.getItem('userId');
    console.log('User ID:', userId);
    return userId;
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/favori');
        const userFavorites = response.data.filter(favori => favori.utiId == getUserId());
        console.log(userFavorites);
        setFavorites(userFavorites);
      } catch (error) {
        console.error('Erreur lors de la récupération des favoris :', error);
      }
    };

    fetchFavorites();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/favori/${id}`);
      setFavorites(favorites.filter((favori) => favori.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression du favori :', error);
    }
  };

  

  const toggleDescription = (index) => {
    setExpandedDescription((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <>
    <div className="favorites-page">
      <h1>Vos Voitures Favoris</h1>
      <div className="favorites-grid">
        {favorites.map((car, index) => (
          <figure key={index} className="snip1418">
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
              <button className="see-from-cart" onClick={() => handleDelete(car.id)}>
              Supprimer des favoris
              </button>
             
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default FavoritesPage;
