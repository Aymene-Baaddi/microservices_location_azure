import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './home.css';
import GrapheReservation from '../components/graphe/graphereservation';
import { IoCash, IoPeople, IoCarSport, IoTime, IoCheckmarkDone, IoCalendar } from 'react-icons/io5';
import GrapheReservationsParAge from '../components/graphe/GrapheReservationsParAge';

const Home = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalCars, setTotalCars] = useState(0);
  const [totalReservations, setTotalReservations] = useState(0);
  const [ongoingReservations, setOngoingReservations] = useState(0);
  const [completedReservations, setCompletedReservations] = useState(0);
  const [totalGains, setTotalGains] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:8080/api/user')
      .then(response => {
        setTotalUsers(response.data.length);
      })
      .catch(error => {
        console.error('Il y a eu une erreur lors de la récupération des utilisateurs:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8080/api/voiture')
      .then(response => {
        setTotalCars(response.data.length);
      })
      .catch(error => {
        console.error('Il y a eu une erreur lors de la récupération des voitures:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8080/api/reservation')
      .then(response => {
        const reservations = response.data;
        setTotalReservations(reservations.length);

        const ongoing = reservations.filter(reservation => new Date(reservation.datefin) > new Date()).length;
        const completed = reservations.filter(reservation => new Date(reservation.datefin) <= new Date()).length;
        const gains = reservations.reduce((total, reservation) => {
          const dateDebut = new Date(reservation.datedebut);
          const dateFin = new Date(reservation.datefin);
          const days = Math.floor((dateFin - dateDebut) / (1000 * 60 * 60 * 24));
          return total + (reservation.prix * days);
        }, 0);
        setOngoingReservations(ongoing);
        setCompletedReservations(completed);
        setTotalGains(gains);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des réservations:', error);
      });
  }, []);

  return (
    <div className="home">
      <div className="card1 green">
        <div className="card1-content">
          <IoCash size={30} />
          <span>Total des gains:</span>
          <h2>{totalGains} €</h2>
        </div>
      </div>
      <div className="card1 red">
        <div className="card1-content">
          <IoPeople size={30} />
          <span>Total des utilisateurs:</span>
          <h2>{totalUsers}</h2>
        </div>
      </div>
      <div className="card1 blue">
        <div className="card1-content">
          <IoCarSport size={30} />
          <span>Total des voitures:</span>
          <h2>{totalCars}</h2>
        </div>
      </div>
      <div className="card1 orange">
        <div className="card1-content">
          <IoTime size={30} />
          <span>Réservations en cours:</span>
          <h2>{ongoingReservations}</h2>
        </div>
      </div>
      <div className="card1 purple">
        <div className="card1-content">
          <IoCheckmarkDone size={30} />
          <span>Réservations terminées:</span>
          <h2>{completedReservations}</h2>
        </div>
      </div>
      <div className="card1 teal">
        <div className="card1-content">
          <IoCalendar size={30} />
          <span>Total des réservations:</span>
          <h2>{totalReservations}</h2>
        </div>
      </div>
      
      <GrapheReservation />
      <GrapheReservationsParAge/>
    </div>
  );
};

export default Home;
