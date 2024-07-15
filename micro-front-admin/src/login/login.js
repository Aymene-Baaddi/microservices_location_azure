import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './login.css';

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, setLoggedInUser] = useState(null);
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/admin/login', {
        email: email,
        password: password 
        });

      if (response.data) {
        const userId = response.data.id; 
        setLoggedInUser(response.data);
        setIsLoggedIn(true); 
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userId", userId); 
        alert('Connexion réussie ! Utilisateur connecté :', response.data);
        navigate('/home');
      } else {
        alert('La connexion a échoué. Veuillez vérifier vos informations d\'identification.');
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la connexion :', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="text-center">Se connecter</h2>
        <form onSubmit={handleLogin}>
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
          <button type="submit" className="btn btn-primary btn-block">
            Connexion
          </button>
        </form>
        <div className="text-center mt-3">
         
        </div>
      </div>
    </div>
  );
}

export default Login;
