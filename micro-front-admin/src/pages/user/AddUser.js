import React, { useState } from 'react';
import axios from 'axios';
import './AddUser.css';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
    const [userData, setUserData] = useState({
        ncompte: '',
        nom: '',
        prenom: '',
        email: '',
        age: '',
        password: '',
        adresse: '',
        cin: '',
        ville: '',
        telephone: ''
    });

    const navigate=useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/user/register', userData);
            console.log('Utilisateur ajouté avec succès');
            navigate("/users")
            setUserData({
                ncompte: '',
                nom: '',
                prenom: '',
                email: '',
                age: '',
                password: '',
                adresse: '',
                cin: '',
                ville: '',
                telephone: ''
            });
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
        }
    };

    return (
        <div className="containerUser">
            <form onSubmit={handleSubmit} className="add-user-form">
                <div className="form-row">
                <div className="form-group">
                        <label htmlFor="nom">Nom:</label>
                        <input placeholder="Entrer le nom d'utilisateur"  type="text" id="nom" name="nom" value={userData.nom} onChange={handleChange} />
                    </div><div className="form-group">
                        <label htmlFor="prenom">Prénom:</label>
                        <input placeholder="Entrer le prenom d'utilisateur" type="text" id="prenom" name="prenom" value={userData.prenom} onChange={handleChange} />
                    </div>
                    
                </div>
                <div className="form-row">
                  <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input placeholder="Entrer l'Email d'utilisateur"  type="email" id="email" name="email" value={userData.email} onChange={handleChange} />
                    </div><div className="form-group">
                        <label htmlFor="ncompte">N° Compte:</label>
                        <input placeholder='Entrer le N° Compte' type="number" id="ncompte" name="ncompte" value={userData.ncompte} onChange={handleChange} />
                    </div>
                
                  
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="password">Mot de passe:</label>
                        <input  placeholder='Entrer le mot de passe' type="password" id="password" name="password" value={userData.password} onChange={handleChange} />
                    </div><div className="form-group">
                        <label htmlFor="age">Âge:</label>
                        <input placeholder="Entrer l'age d'utilisateur"  type="number" id="age" name="age" value={userData.age} onChange={handleChange} />
                    </div>
                    
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="adresse">Adresse:</label>
                        <input placeholder="Entrer l'adresse d'utilisateur" type="text" id="adresse" name="adresse" value={userData.adresse} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cin">CIN:</label>
                        <input placeholder="Entrer le CIN d'utilisateur"type="text" id="cin" name="cin" value={userData.cin} onChange={handleChange} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="ville">Ville:</label>
                        <input placeholder="Entrer la ville d'utilisateur"type="text" id="ville" name="ville" value={userData.ville} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="telephone">Téléphone:</label>
                        <input placeholder="Entrer le numero d'utilisateur" type="text" id="telephone" name="telephone" value={userData.telephone} onChange={handleChange} />
                    </div>
                </div>
                <div style={{display:'flex',justifyContent:'center'}}>
                <button type="submit" className="submit-button">Ajouter l'utilisateur</button>
                </div>
            </form>
        </div>
    );
};

export default AddUser;