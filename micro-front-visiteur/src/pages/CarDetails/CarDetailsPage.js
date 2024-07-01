import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import './CarDetailsPage.css';
import { format, startOfDay, endOfDay, addDays, differenceInDays } from 'date-fns';
import Footer from '../../components/footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcVisa, faPaypal, faCcMastercard } from '@fortawesome/free-brands-svg-icons';

const CarDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expandedDescription, setExpandedDescription] = useState({});
  const [car, setCar] = useState(null); 
  const [reviews, ] = useState([
    { user: 'John Doe', comment: "J'ai eu l'occasion de conduire cette voiture récemment et je dois dire qu'elle a dépassé toutes mes attentes. La conduite est incroyablement fluide et agréable, ce qui rend chaque trajet un véritable plaisir.", rating: 5, avatar: 'https://i.pravatar.cc/100?img=1' },
    { user: 'Jane Smith', comment: "J'ai eu l'occasion de conduire cette voiture récemment et je dois dire qu'elle a dépassé toutes mes attentes. La conduite est incroyablement fluide et agréable, ce qui rend chaque trajet un véritable plaisir.", rating: 4, avatar: 'https://i.pravatar.cc/100?img=2' },
    { user: 'Jack Johnson', comment: "J'ai eu l'occasion de conduire cette voiture récemment et je dois dire qu'elle a dépassé toutes mes attentes. La conduite est incroyablement fluide et agréable, ce qui rend chaque trajet un véritable plaisir.", rating: 5, avatar: 'https://i.pravatar.cc/100?img=3' },
  ]);
  const [recommendedCars, setRecommendedCars] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [reservationDetails, setReservationDetails] = useState({
    datereservation: '',
    datedebut: '',
    datefin: ''
  });
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

  const getUserId = () => {
    const userId = localStorage.getItem('userId');
    console.log('User ID:', userId);
    return userId;
  };

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/voiture/${id}`);
        setCar(response.data); 
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de la voiture :', error);
      }
    };

    const fetchRecommendedCars = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/voiture');
        setRecommendedCars(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des voitures recommandées :', error);
      }
    };

    fetchCarDetails();
    fetchRecommendedCars();
  }, [id]); 

  const handleAddToFavorites = async () => {
    try {
      const favoritesResponse = await axios.get('http://localhost:8080/api/favori');
      console.log("Car ID:", car.id);
      console.log("User ID:", getUserId());

      const existingFavorite = favoritesResponse.data.find(favorite => favorite.vid === car.id && favorite.utiId == getUserId());
      console.log("Existing Favorite:", existingFavorite);

      if (existingFavorite) {
        Swal.fire({
          icon: 'warning',
          title: 'Déjà Favori',
          text: 'Cette voiture est déjà dans vos favoris.'
        });
      } else {
        const response = await axios.post('http://localhost:8080/api/favori', {
          vid: car.id,
          utiId: getUserId()
        });
        console.log('Voiture ajoutée aux favoris:', response.data);
        Swal.fire({
          icon: 'success',
          title: 'Favori Ajouté',
          text: 'Voiture ajoutée aux favoris.'
        });
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la voiture aux favoris:', error);
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur s\'est produite lors de l\'ajout de la voiture aux favoris.'
      });
    }
  };

  const handleOpenModal = () => {
    setError('');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setReservationDetails({
      ...reservationDetails,
      [e.target.name]: e.target.value
    });
  };

  const DateAffectation = () => {
    return format(addDays(new Date(),1), 'yyyy-MM-dd');
  };

  const fetchReservations = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/reservation');
      const userReservations = response.data.filter(reservation => reservation.id_voiture === car.id);
      setReservations(userReservations);
    } catch (error) {
      console.error('Erreur lors de la récupération des réservations :', error);
    }
  }, [car]);

  useEffect(() => {
    if (car) {
      fetchReservations();
    }
  }, [car, fetchReservations]);

  if (!car) {
    return <div>Loading...</div>;
  }

  const handleReserveCar = async (e) => {
    e.preventDefault();

    const startDate = new Date(reservationDetails.datedebut);
    const endDate = new Date(reservationDetails.datefin);

    if (startDate > endDate) {
      setError('La date de fin doit être supérieure ou égale à la date de début.');
      return;
    }

    const adjustedStartDate = startOfDay(addDays(startDate, 1));
    const adjustedEndDate = endOfDay(addDays(endDate, 1));
    
    const isDateConflict = reservations.some(reservation => {
      const existingStart = new Date(reservation.datedebut);
      const existingEnd = new Date(reservation.datefin);
      return (adjustedStartDate <= existingEnd && adjustedEndDate >= existingStart);
    });

    if (isDateConflict) {
      setError('Les dates sélectionnées sont déjà réservées.');
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Les dates sélectionnées sont déjà réservées.'
      });
      return;
    }

    
    const daysCount = differenceInDays(adjustedEndDate, adjustedStartDate) + 1; // Include both start and end day
    const totalAmount = daysCount * car.prix;
    setTotalAmount(totalAmount);

    
    setIsConfirmModalOpen(true);
    handleCloseModal();
  };

  const handleConfirmReservation = async () => {
    try {
      const startDate = new Date(reservationDetails.datedebut);
      const endDate = new Date(reservationDetails.datefin);
      const adjustedStartDate = startOfDay(addDays(startDate, 1));
      const adjustedEndDate = endOfDay(addDays(endDate, 1));

      const response = await axios.post('http://localhost:8080/api/reservation', {
        id_voiture: car.id,
        id_user: getUserId(),
        datereservation: DateAffectation(),
        datedebut: adjustedStartDate,
        datefin: adjustedEndDate
      });

      console.log('Réservation créée:', response.data);
      Swal.fire({
        icon: 'success',
        title: 'Réservation réussie!',
        text: 'Votre réservation a été confirmée.'
      });

     
      
      setIsConfirmModalOpen(false);
    } catch (error) {
      console.error('Erreur lors de la réservation:', error);
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur s\'est produite lors de la réservation.'
      });
    }
  };

  const handleCancelReservation = () => {
    setIsConfirmModalOpen(false);
  };

  const handleDetailClick = (id) => {
    navigate(`/details/${id}`);
  };

  const toggleDescription = (index) => {
    setExpandedDescription((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <>
    <div className="car-details-page">
      <div className="car-details-container">
        <div className="car-details-content">
          <div className="car-details-image">
            <img src={car.image} alt={car.nomv} />
          </div>
          <div className="car-details-info">
            <h2>{car.nomv}</h2>
            <p className="car-details-description">{car.description}</p>
            <div className="car-details-attributes">
              <p><strong>Année Modèle:</strong> {car.annéeModel}</p>
              <p><strong>État:</strong> {car.etat}</p>
              <p><strong>Disponibilité:</strong> {car.disponibilité ? 'Disponible' : 'Indisponible'}</p>
            </div>
            <div className="car-details-price">${car.prix}</div>
            <div className="payment-icons">
            <FontAwesomeIcon icon={faCcVisa} className="payment-icon" />
            <FontAwesomeIcon icon={faPaypal} className="payment-icon" />
            <FontAwesomeIcon icon={faCcMastercard} className="payment-icon" />
          </div>
            <div className="car-details-buttons">
              <button className="reserve-button" onClick={handleOpenModal}>Réserver la voiture</button>
              <button className="favorite-button" onClick={handleAddToFavorites}>Ajouter aux favoris</button>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <div className="car-reviews">
            <h1 style={{ marginLeft: '40%', marginBottom: '5%', marginTop: '2%' }}>Commentaires et avis</h1>
            <div className="reviews-grid">
              {reviews.map((review, index) => (
                <div key={index} className="car-review-card">
                  <img src={review.avatar} alt={review.user} className="review-avatar" />
                  <div className="review-content">
                    <p className="review-user"><strong>{review.user}</strong></p>
                    <p className="review-comment">{review.comment}</p>
                    <p className="review-rating">Note: {'★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="home-page">
  <h1>Voitures Recommandées</h1>
  <div className="home-grid">
    {recommendedCars.slice(0, 3).map((car, index) => (
      <figure key={index} className="snip14181">
        <img src={car.image} alt={car.nomv} />
        <figcaption>
          <h3>{car.nomv}</h3>
          <p>Année : {car.annéeModel}</p>
          <p className={`description ${expandedDescription[index] ? 'expanded' : ''}`}>
            {car.description}
          </p>
          <button className="toggle-description" onClick={() => toggleDescription(index)}>
            {expandedDescription[index] ? 'Voir moins' : 'Voir plus'}
          </button>
          <div className="price">${car.prix}</div>
          <button className="see-from-cart" onClick={() => handleDetailClick(car.id)}>
            Voir détails de la voiture
          </button>
        </figcaption>
      </figure>
    ))}
  </div>
</div>

      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Formulaire de Réservation"
        className="reservation-modal"
        overlayClassName="reservation-modal-overlay"
      >
        <h2>Formulaire de Réservation</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleReserveCar}>
          <div className="form-group">
            <label>Date de début</label>
            <input
              type="date"
              name="datedebut"
              value={reservationDetails.datedebut}
              onChange={handleChange}
              min={DateAffectation()} 
              required
            />
          </div>
          <div className="form-group">
            <label>Date de fin</label>
            <input
              type="date"
              name="datefin"
              value={reservationDetails.datefin}
              onChange={handleChange}
              min={reservationDetails.datedebut}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Vérifier la disponibilité</button>
          <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Annuler</button>
        </form>
      </Modal>
      <Modal
        isOpen={isConfirmModalOpen}
        onRequestClose={handleCancelReservation}
        contentLabel="Confirmation de Réservation"
        className="reservation-modal"
        overlayClassName="reservation-modal-overlay"
      >
        <h2>Confirmation de Réservation</h2>
        <p>Le montant total à payer est de : ${totalAmount}</p>
        <p>Voulez-vous confirmer cette réservation ?</p>
        <button type="button" className="btn btn-primary" onClick={handleConfirmReservation}>Confirmer</button>
        <button type="button" className="btn btn-secondary" onClick={handleCancelReservation}>Annuler</button>
      </Modal>
    </div>
    <Footer/>
    </>
  );
};

export default CarDetailsPage;
