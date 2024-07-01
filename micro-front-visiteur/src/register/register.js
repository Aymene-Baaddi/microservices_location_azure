import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './register.css'; // Assurez-vous que le fichier CSS est correctement importé

function Register() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [ville, setVille] = useState('');
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.log('Les mots de passe ne correspondent pas.');
      
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/user/register', {
        nom: nom,
        prenom: prenom,
        email: email,
        password: password,
        ville: ville
      });

      if (response.data) {
        alert('Inscription réussie ! Utilisateur enregistré :', response.data);
        navigate('/');
      } else {
        alert('L\'inscription a échoué. Veuillez vérifier vos informations.');
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de l\'inscription :', error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="text-center">S'inscrire</h2>
        <form onSubmit={registerUser}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Entrez votre nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Entrez votre prénom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Entrez votre ville"
              value={ville}
              onChange={(e) => setVille(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Entrez votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Confirmez votre mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
         
          <button type="submit" className="btn btn-primary btn-block">
            S'inscrire
          </button>
        </form>
        <div className="text-center mt-3">
          <span>Vous avez déjà un compte ?</span>{' '}
          <span onClick={() => { navigate(`/`) }} className="btn btn-link" style={{ marginBottom:"1%",color: 'black', textDecoration: 'none' }}>
            <span style={{ color: "#323e5b" }}>Se connecter</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Register;
