import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ShowCar.css';
import { useNavigate } from 'react-router-dom';

const ShowCar = () => {
    const [cars, setCars] = useState([]);
    const navigate=useNavigate();
    const handleEditClick = (id) => {
        navigate(`/updatecar/${id}`);
    };
    const handleAddClick = (id) => {
        navigate(`/addcar`);
    };

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

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/voiture/${id}`);
            setCars(cars.filter(car => car.id !== id));
            console.log(`Voiture avec l'ID ${id} supprimée avec succès`);
            navigate("/cars")
        } catch (error) {
            console.error(`Erreur lors de la suppression de la voiture avec l'ID ${id} :`, error);
        }
    };

    return (
        <>
        
        <div  style={{ display: 'flex', alignContent:'center',textAlign:'center',flexDirection:"column",marginTop:'10%',marginLeft:'20%' }}>
        <button className="add1" onClick={handleAddClick}  >Ajouter une voiture</button>
            <div className="table-container">
            
                <table className="car-table">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Prix</th>
                            <th>Description</th>
                            <th>Année du modèle</th>
                            <th>État</th>
                            <th>Disponibilité</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map(car => (
                            <tr key={car.id}>
                                <td>{car.nomv}</td>
                                <td>{car.prix}</td>
                                <td>{car.description}</td>
                                <td>{car.annéeModel}</td>
                                <td>{car.etat}</td>
                                <td>{car.disponibilité ? 'Oui' : 'Non'}</td>
                                <td>
                                    <button className="edit" onClick={handleEditClick}>Modifier</button>
                                    <button className="delete" onClick={() => handleDelete(car.id)}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    );
};

export default ShowCar;
