import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import './ShowReservation.css';

const ShowReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [filteredReservations, setFilteredReservations] = useState([]);
    const [filter, setFilter] = useState('Toutes');
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/reservation');
                setReservations(response.data);
                console.log(response.data);
                setFilteredReservations(response.data);
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

    return (
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
                        <th>Nom</th>
                        <th>Adresse</th>
                        <th>CIN</th>
                        <th>Téléphone</th>
                        <th>Statut</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReservations.map(reservation => (
                        <tr key={reservation.id}>
                            <td>{format(new Date(reservation.datereservation), 'yyyy-MM-dd HH:mm:ss')}</td>
                            <td>{format(new Date(reservation.datedebut), 'yyyy-MM-dd HH:mm:ss')}</td>
                            <td>{format(new Date(reservation.datefin), 'yyyy-MM-dd HH:mm:ss')}</td>
                            <td>{reservation.nomv}</td>
                            <td>{reservation.prix}</td>
                            <td>{reservation.nom}</td>
                            <td>{reservation.adresse}</td>
                            <td>{reservation.cin}</td>
                            <td>{reservation.telephone}</td>
                            <td className={new Date(reservation.datefin) < new Date() ? 'status-terminee' : 'status-en-cours'}>
                                {new Date(reservation.datefin) < new Date() ? 'Terminée' : 'En cours'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ShowReservations;
