import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CarPage.css';
import { useNavigate } from 'react-router-dom';
import ReactSlider from 'react-slider';
import Footer from '../../components/footer';

const CarsPage = () => {
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [filterEtat, setFilterEtat] = useState('Toutes');
    const [filterDisponibilite, setFilterDisponibilite] = useState('Toutes');
    const [filterPrix, setFilterPrix] = useState('Toutes');
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [expandedDescription, setExpandedDescription] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/voiture');
                setCars(response.data);
                setFilteredCars(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des voitures :', error);
            }
        };

        fetchCars();
    }, []);

    useEffect(() => {
        let filtered = cars;

        if (filterEtat !== 'Toutes') {
            filtered = filtered.filter(car => car.etat === filterEtat);
        }

        if (filterDisponibilite !== 'Toutes') {
            const dispo = filterDisponibilite === 'Disponible';
            filtered = filtered.filter(car => car.disponibilité === dispo);
        }

        if (filterPrix !== 'Toutes') {
            filtered = filtered.sort((a, b) => {
                return filterPrix === 'Prix Ascendant' ? a.prix - b.prix : b.prix - a.prix;
            });
        }

        filtered = filtered.filter(car => car.prix >= priceRange[0] && car.prix <= priceRange[1]);

        setFilteredCars(filtered);
    }, [filterEtat, filterDisponibilite, filterPrix, priceRange, cars]);

    const handleDetailClick = (carId) => {
        navigate(`/details/${carId}`);
    };

    const toggleDescription = (index) => {
        setExpandedDescription((prevState) => ({
          ...prevState,
          [index]: !prevState[index],
        }));
      };

    return (
      <>
        <div className="cars-page">
            <div className="sidebar">
                <h3>Filtrer par</h3>
                <div className="filter-group">
                    <label>État</label>
                    <select value={filterEtat} onChange={(e) => setFilterEtat(e.target.value)}>
                        <option value="Toutes">Toutes</option>
                        <option value="mauvais">Mauvais</option>
                        <option value="passable">Passable</option>
                        <option value="bon">Bon</option>
                        <option value="très bon">Très Bon</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label>Disponibilité</label>
                    <select value={filterDisponibilite} onChange={(e) => setFilterDisponibilite(e.target.value)}>
                        <option value="Toutes">Toutes</option>
                        <option value="Disponible">Disponible</option>
                        <option value="Indisponible">Indisponible</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label>Prix</label>
                    <select value={filterPrix} onChange={(e) => setFilterPrix(e.target.value)}>
                        <option value="Toutes">Toutes</option>
                        <option value="Prix Ascendant">Prix Ascendant</option>
                        <option value="Prix Descendant">Prix Descendant</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label>Intervalle de Prix</label>
                    <ReactSlider
                        className="horizontal-slider"
                        thumbClassName="thumb"
                        trackClassName="track"
                        defaultValue={[0, 1000]}
                        min={0}
                        max={1000}
                        value={priceRange}
                        onChange={(value) => setPriceRange(value)}
                    />
                    <div className="price-range-values">
                        <span>{priceRange[0]}€</span>
                        <span>{priceRange[1]}€</span>
                    </div>
                </div>
            </div>
            <div className="cars-grid">
                {filteredCars.map((car, index) => (
                    <figure key={index} className="snip1418">
                        <img src={car.image} alt={car.nomv} />
                        <figcaption>
                            <h3>{car.nomv}</h3>
                            <p>Année : {car.annéeModel}</p>
                            <p>État : {car.etat}</p>
                            <p className={`description ${expandedDescription[index] ? 'expanded' : ''}`}>
                  {car.description}
                </p>
                <button className="toggle-description" onClick={() => toggleDescription(index)}>
                  {expandedDescription[index] ? 'Voir moins' : 'Voir plus'}
                </button>
                            <div className="price">{car.prix}€</div>
                            <button className="see-from-cart" onClick={() => handleDetailClick(car.id)}>voir details de la voiture</button>
                        </figcaption>
                    </figure>
                ))}
            </div>
            
        </div>
       
        </>
    );
};

export default CarsPage;