import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import ReactToPrint from 'react-to-print';
import './ReservationDetailsPage.css';

const ReservationDetailsPage = () => {
    const { id } = useParams();
    const [reservation, setReservation] = useState(null);
    const componentRef = useRef();

    useEffect(() => {
        const fetchReservationDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/reservation/${id}`);
                setReservation(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des détails de la réservation :', error);
            }
        };

        fetchReservationDetails();
    }, [id]);

    if (!reservation) {
        return <div>Loading...</div>;
    }

    const totalPrice = reservation.prix * (new Date(reservation.datefin) - new Date(reservation.datedebut)) / (1000 * 60 * 60 * 24);

    return (
        <div className="reservation-details-container">
            <ReactToPrint
                trigger={() => <button className="print-button">Télécharger en PDF</button>}
                content={() => componentRef.current}
            />
            <div ref={componentRef} className="reservation-details">
                <header>
                    <h2>Détails de la Réservation</h2>
                </header>
                <div className="reservation-info">
                    <table>
                        <tbody>
                            <tr>
                                <td><strong>Date de Réservation:</strong></td>
                                <td>{format(new Date(reservation.datereservation), 'yyyy-MM-dd')}</td>
                            </tr>
                            <tr>
                                <td><strong>Date de Début:</strong></td>
                                <td>{format(new Date(reservation.datedebut), 'yyyy-MM-dd')}</td>
                            </tr>
                            <tr>
                                <td><strong>Date de Fin:</strong></td>
                                <td>{format(new Date(reservation.datefin), 'yyyy-MM-dd')}</td>
                            </tr>
                            <tr>
                                <td><strong>Voiture:</strong></td>
                                <td>{reservation.nomv}</td>
                            </tr>
                            <tr>
                                <td><strong>Prix par Jour:</strong></td>
                                <td>{reservation.prix}€</td>
                            </tr>
                            <tr>
                                <td><strong>Année Modèle:</strong></td>
                                <td>{reservation.annéeModel}</td>
                            </tr>
                            <tr>
                                <td><strong>Nom:</strong></td>
                                <td>{reservation.nom}</td>
                            </tr>
                            <tr>
                                <td><strong>Prénom:</strong></td>
                                <td>{reservation.prenom}</td>
                            </tr>
                            <tr>
                                <td><strong>Adresse:</strong></td>
                                <td>{reservation.adresse}</td>
                            </tr>
                            <tr>
                                <td><strong>CIN:</strong></td>
                                <td>{reservation.cin}</td>
                            </tr>
                            <tr>
                                <td><strong>Email:</strong></td>
                                <td>{reservation.email}</td>
                            </tr>
                            <tr>
                                <td><strong>Téléphone:</strong></td>
                                <td>{reservation.telephone}</td>
                            </tr>
                            <tr>
                                <td><strong>Prix Total:</strong></td>
                                <td>{totalPrice}€</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="reservation-image">
                    <img src={reservation.image} alt="Voiture" />
                </div>
                <footer>
                    <p>Merci pour votre réservation !</p>
                </footer>
            </div>
        </div>
    );
};

export default ReservationDetailsPage;