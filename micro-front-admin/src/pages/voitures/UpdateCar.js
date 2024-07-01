import React, { useState, useEffect ,} from 'react';
import axios from 'axios';
import './UpdateCar.css';
import { useNavigate ,useParams } from 'react-router-dom';

const UpdateCar = () => {
    
    const navigate=useNavigate();
    const { id } = useParams();
    const [carData, setCarData] = useState({
        nomv: '',
        prix: '',
        description: '',
        annéeModel: '',
        image: '',
        etat: '',
        disponibilité: ''
    });

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/voiture/${id}`);
                console.log(response);
                setCarData(response.data);

            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
            }
        };

        fetchCar();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarData({ ...carData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/voiture/${id}`, carData);
            console.log('Voiture modifiée avec succès !');
        
            navigate('/cars')
        } catch (error) {
            console.error('Erreur lors de la modification de la voiture :', error);
        }
    };

   return (
        <div className="container1">
            <form onSubmit={handleSubmit} className="modify-car-form1">
                <label>
                    Nom de la voiture:
                    <input  placeholder={carData.nomv} type="text" name="nomv" value={carData.nomv} onChange={handleChange} />
                </label>
                <label>
                    Prix:
                    <input
                    placeholder={carData.prix}
                    type="number" 
                    name="prix" 
                    value={carData.prix}
                    onChange={handleChange}
                    />

                </label>
                <label>
                    Description:
                    <textarea  placeholder={carData.description} name="description" value={carData.description} onChange={handleChange} />
                </label>
                <label>
                    Année du modèle:
                    <input  placeholder={carData.annéeModel} type="number" name="annéeModel" value={carData.annéeModel} onChange={handleChange} />
                </label>
                <label>
                    Image:
                    <input  placeholder={carData.image} type="text" name="image" value={carData.image} onChange={handleChange} />
                </label>
                <label>
                    État:
                    <select  placeholder={carData.etat} name="etat" value={carData.etat} onChange={handleChange}>
                    <option value="très bon">Très Bon</option>
                        <option value="passable">Passable</option>
                        <option value="bon">Bon</option>
                        <option value="mauvais">Mauvais</option>
                        
                    </select>
                </label>
                <label>
                    Disponibilité:
                    <select  placeholder={carData.disponibilité} name="disponibilité" value={carData.disponibilité} onChange={handleChange}>
                        <option value="true">Oui</option>
                        <option value="false">Non</option>
                    </select>
                </label>
                <button type="submit">Modifier la voiture</button>
            </form>
            <img src="https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?cs=srgb&dl=pexels-mayday-1545743.jpg&fm=jpg" alt="image" className="registration-image" />
        </div>
    );
};


export default UpdateCar;
