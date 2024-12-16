import React, { useState } from 'react';
import UserService from '../../service/UserService.js';
import { useNavigate } from "react-router";

import './LoginPage.css';

function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const data = await UserService.login(formData.email, formData.password);
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);
            setSuccess('Zalogowano pomyślnie!');
            setTimeout(() => navigate("/strona-glowna"), 1000);
        } catch (err) {
            setError('Nieprawidłowy email lub hasło.');
        }
    };

    return (
        <div className="login-page">
            <h1>Logowanie</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Hasło"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Zaloguj</button>
            </form>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
        </div>
    );
}

export { LoginPage };
