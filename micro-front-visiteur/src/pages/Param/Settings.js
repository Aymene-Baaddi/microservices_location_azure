import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Settings.css';
import Footer from '../../components/footer';

const SettingsPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    ncompte: '',
    nom: '',
    prenom: '',
    email: '',
    age: 0,
    password: '',
    adresse: '',
    cin: 0,
    ville: '',
    telephone: 0
  });

  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:8080/api/user/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('userId');
      await axios.put(`http://localhost:8080/api/user/${userId}`, user);
      alert('Mise à jour réussie!');
    } catch (error) {
      console.error('Erreur lors de la mise à jour des informations de l\'utilisateur :', error);
      setError('Erreur lors de la mise à jour des informations.');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const userId = localStorage.getItem('userId');
      await axios.delete(`http://localhost:8080/api/user/${userId}`);
      localStorage.removeItem('userId');
      alert('Compte supprimé avec succès.');
      localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    navigate("/");
    } catch (error) {
      console.error('Erreur lors de la suppression du compte utilisateur :', error);
      setError('Erreur lors de la suppression du compte.');
    }
  };

  return (
    <>
    <div className="settings-page">
      <h2>Paramètres du compte</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleUpdate} className="settings-form">
        <div className="form-group">
          <label>Numéro de Compte</label>
          <input type="textr" name="ncompte" value={user.ncompte} onChange={handleChange} disabled />
        </div>
        <div className="form-group">
          <label>Nom</label>
          <input type="text" name="nom" value={user.nom} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Prénom</label>
          <input type="text" name="prenom" value={user.prenom} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={user.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Âge</label>
          <input type="number" name="age" value={user.age} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Mot de passe</label>
          <input type="password" name="password" value={user.password} onChange={handleChange} />
        </div>
        
        <div className="form-group">
          <label>Adresse</label>
          <input type="text" name="adresse" value={user.adresse} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>CIN</label>
          <input type="text" name="Cin" value={user.cin} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Ville</label>
          <input type="text" name="Ville" value={user.ville} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Téléphone</label>
          <input type="text" name="telephone" value={user.telephone} onChange={handleChange} />
        </div>
        <div className="btn2">
        <button type="submit" className="btn1 btn1-primary1">Mettre à jour</button>
        <button type="button" className="btn1 btn1-danger1" onClick={handleDeleteAccount}>Supprimer le compte</button>
        </div>
      </form>
    </div>
    <Footer/>
    </>
  );
};

export default SettingsPage;
