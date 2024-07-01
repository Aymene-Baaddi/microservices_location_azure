import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ShowUser.css';
import { useNavigate } from 'react-router-dom';

const ShowUser = () => {
    const navigate=useNavigate();
    const [users, setUsers] = useState([]);
    const handleAddClick = (id) => {
        navigate(`/adduser`);
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/user');
                setUsers(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/user/${id}`);
            const response = await axios.get('http://localhost:8080/api/user');
            setUsers(response.data);
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'utilisateur :', error);
        }
    };

    return (
        <div className="user-list-container">
             <button className="add" onClick={handleAddClick}  >Ajouter un utilisateur</button>
            <table className="user-table1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>N°compte</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Email</th>
                        <th>Âge</th>
                        <th>Adresse</th>
                        <th>CIN</th>
                        <th>Ville</th>
                        <th>Téléphone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.ncompte}</td>
                            <td>{user.nom}</td>
                            <td>{user.prenom}</td>
                            <td>{user.email}</td>
                            <td>{user.age}</td>
                            <td>{user.adresse}</td>
                            <td>{user.cin}</td>
                            <td>{user.ville}</td>
                            <td>{user.telephone}</td>
                            <td>
                                <button className="delete-button" onClick={() => handleDelete(user.id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ShowUser;
