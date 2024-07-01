import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './login/login';
import Home from './pages/home/home';
import Register from './register/register';
import Navbar from './components/navbar';
import { useLocation } from 'react-router-dom';
import CarDetailsPage from './pages/CarDetails/CarDetailsPage';
import CarPage from './pages/CarDetails/CarPage';
import FavoritesPage from  './pages/favoris/FavoritesPage';
import Reservation from './pages/reservation/Reservation';
import SettingsPage from './pages/Param/Settings';
import ReservationDetailsPage from './pages/reservation/ReservationDetailsPage';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(isAuthenticated);
  }, []);

  return (
    <Router>
      <ConditionalNavbar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        {isLoggedIn ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/details/:id" element={<CarDetailsPage />} />
            <Route path="/cars" element={<CarPage/>} />
            <Route path="/favori" element={<FavoritesPage/>} />
            <Route path="/reservation" element={<Reservation/>} />
            <Route path="/setting" element={<SettingsPage/>} />
            <Route path="/reservation-details/:id" element={<ReservationDetailsPage/>} />
            

           
          </>
        ) : (
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        )}
      </Routes>
    </Router>
  );
};

const ConditionalNavbar = ({ isLoggedIn }) => {
  const location = useLocation();

  const isLoginPage = location.pathname === '/';
  const isRegisterPage = location.pathname === '/register';

  return isLoggedIn && !isLoginPage && !isRegisterPage && <Navbar />;
};

export default App;