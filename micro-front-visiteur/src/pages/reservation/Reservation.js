import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import './Reservation.css';
import Footer from '../../components/footer';

const Reservation = () => {
    const [reservations, setReservations] = useState([]);
    const [filteredReservations, setFilteredReservations] = useState([]);
    const [filter, setFilter] = useState('Toutes');
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const getUserId = () => {
        const userId = localStorage.getItem('userId');
        console.log('User ID:', userId);
        return userId;
    };

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/reservation');
                const userReservations = response.data.filter(reservation => reservation.id_user == getUserId());
                const sortedReservations = userReservations.sort((a, b) => new Date(b.datereservation) - new Date(a.datereservation));
                console.log(userReservations);
                setReservations(sortedReservations);
                setFilteredReservations(sortedReservations);
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
            }
        };

        fetchReservations();
    }, []);

    useEffect(() => {
        const filterReservations = () => {
            switch (filter) {
                case 'Toutes':
                    setFilteredReservations(reservations);
                    break;
                case 'En cours':
                    setFilteredReservations(reservations.filter(reservation => new Date(reservation.datefin) > new Date()));
                    break;
                case 'Terminée':
                    setFilteredReservations(reservations.filter(reservation => new Date(reservation.datefin) < new Date()));
                    break;
                default:
                    setFilteredReservations(reservations);
                    break;
            }
        };

        filterReservations();
    }, [reservations, filter]);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleFilterChange = (value) => {
        setFilter(value);
        setShowDropdown(false);
    };

    const handleViewDetails = (reservationId) => {
        navigate(`/reservation-details/${reservationId}`);
    };

    return (
        <>
        <div className="reservation-list-container">
            <div className="dropdown">
                <button className="dropbtn" onClick={toggleDropdown}>Filtrer par statut : {filter}</button>
                {showDropdown && (
                    <div className="dropdown-content">
                        <button onClick={() => handleFilterChange('Toutes')}>Toutes</button>
                        <button onClick={() => handleFilterChange('En cours')}>En cours</button>
                        <button onClick={() => handleFilterChange('Terminée')}>Terminée</button>
                    </div>
                )}
            </div>
            <table className="reservation-table">
                <thead>
                    <tr>
                        <th>D.réservation</th>
                        <th>D.début</th>
                        <th>D.fin</th>
                        <th>Voiture</th>
                        <th>Prix</th>
                        <th>Année Modèle</th>
                        <th>Status</th>
                        <th>Détails</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReservations.map(reservation => (
                        <tr key={reservation.id}>
                            <td>{format(new Date(reservation.datereservation), 'yyyy-MM-dd ')}</td>
                            <td>{format(new Date(reservation.datedebut), 'yyyy-MM-dd ')}</td>
                            <td>{format(new Date(reservation.datefin), 'yyyy-MM-dd ')}</td>
                            <td>{reservation.nomv}</td>
                            <td>{reservation.prix}</td>
                            <td>{reservation.annéeModel}</td>
                            <td className={new Date(reservation.datefin) < new Date() ? 'status1-terminee' : 'status1-en-cours'}>
                                {new Date(reservation.datefin) < new Date() ? 'Terminée' : 'En cours'}
                            </td>
                            <td>
                                <button className="details-button" onClick={() => handleViewDetails(reservation.id)}>Détails</button>
                           </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
       
        </>
    );
};

export default Reservation;