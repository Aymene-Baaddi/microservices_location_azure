import React, { useState } from 'react';
import axios from 'axios';
import './AddCar.css';
import { useNavigate } from 'react-router-dom';

const AddCar = () => {
    const navigate=useNavigate();
    const [carData, setCarData] = useState({
        nomv: '',
        prix: '',
        description: '',
        annéeModel: '',
        image: '',
        etat: '',
        disponibilité: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarData({ ...carData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const response =axios.post("http://localhost:8080/api/voiture", {
            nomv: carData.nomv,
            prix: carData.prix,
            description: carData.description,
            annéeModel: carData.annéeModel,
            image: carData.image,
            etat: carData.etat,
            disponibilité: carData.disponibilité
        });
        console.log(response.carData);
        setCarData({
            nomv: '',
            prix: '',
            description: '',
            annéeModel: '',
            image: '',
            etat: '',
            disponibilité: ''
        });
        navigate('/cars');
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="add-car-form">
                <label>
                    Nom de la voiture:
                    <input type="text" name="nomv" value={carData.nomv} onChange={handleChange} />
                </label>
                <label>
                    Prix:
                    <input type="number" name="prix" value={carData.prix} onChange={handleChange} />
                </label>
                <label>
                    Description:
                    <textarea name="description" value={carData.description} onChange={handleChange} />
                </label>
                <label>
                    Année du modèle:
                    <input type="number" name="annéeModel" value={carData.annéeModel} onChange={handleChange} />
                </label>
                <label>
                    Image:
                    <input type="text" name="image" value={carData.image} onChange={handleChange} />
                </label>
                <label>
                    État:
                    <select name="etat" value={carData.etat} onChange={handleChange}>
                        <option value="très bon">Très Bon</option>
                        <option value="passable">Passable</option>
                        <option value="bon">Bon</option>
                        <option value="mauvais">Mauvais</option>
                    </select>
                </label>
                <label>
                    Disponibilité:
                    <select name="disponibilité" value={carData.disponibilité} onChange={handleChange}>
                        <option value="true">Oui</option>
                        <option value="false">Non</option>
                    </select>
                </label>
                <button type="submit" >Ajouter la voiture</button>
            </form>
            <img src="https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?cs=srgb&dl=pexels-mayday-1545743.jpg&fm=jpg" alt="image" className="registration-image" />
        </div>
    );
};

export default AddCar;