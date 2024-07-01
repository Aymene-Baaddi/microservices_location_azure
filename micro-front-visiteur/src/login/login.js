import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import './login.css';

function Login({ setIsLoggedIn }) { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const [, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/user/login', {
        email: email,
        password: password,
      });
        
      if (response.data) {
        const userId = response.data.id; 
        setLoggedInUser(response.data);
        setIsLoggedIn(true); 
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userId", userId); 
        
        navigate('/home');
      } else {
        console.error('Login failed:', e);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'La connexion a échoué. Veuillez vérifier vos informations d\'identification.'
        });
  
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
          <span>Vous n'avez pas de compte ?</span>{' '}
          <span
            onClick={() => { navigate(`/register`) }}
            className="btn btn-link"
            style={{ color: 'black', textDecoration: 'none', marginBottom: "1%" }}
          >
            <span style={{ color: "#323e5b" }}>S'inscrire</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
