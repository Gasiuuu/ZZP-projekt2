import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../../service/UserService.js';
import './AdminPanel.css';

function AdminPanel() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!UserService.adminOnly()) {
            navigate('/');
            return;
        }

        UserService.getAllUsers()
            .then(response => {
                console.log("Otrzymana odpowiedź:", response);

                setUsers(response.userEntityList);
            })
            .catch(err => {
                console.error("Błąd podczas pobierania użytkowników:", err);
            });

    }, [navigate]);

    return (
        <div className="admin-panel">
            <h1>Lista Użytkowników</h1>
            <table className="users-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>Email</th>
                    <th>Miasto</th>
                    <th>Rola</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.city}</td>
                        <td>{user.role}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export { AdminPanel };
