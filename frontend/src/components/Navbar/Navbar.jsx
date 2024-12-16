import React from 'react';
import { Link } from 'react-router-dom';
import UserService from '../../service/UserService.js';
import './Navbar.css';

function Navbar() {
    const isAuthenticated = UserService.isAuthenticated();
    const isAdmin = UserService.isAdmin();

    const handleLogout = () => {
        UserService.logout();
        window.location.reload();
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">TODO APP</Link>
            </div>
            <div className="navbar-links">
                {isAuthenticated ? (
                    <>
                        <Link to="/profil">Profil</Link>
                        {isAdmin && <Link to="/admin-panel">Admin Panel</Link>}
                        <button onClick={handleLogout} className="logout-button">Wyloguj</button>
                    </>
                ) : (
                    <>
                        <Link to="/logowanie">Zaloguj</Link>
                        <Link to="/rejestracja">Zarejestruj</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
