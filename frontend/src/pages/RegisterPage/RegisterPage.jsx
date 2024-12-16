import React, { useState } from 'react';
import UserService from "../../service/UserService.js";
import './RegisterPage.css';

export function RegisterPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        city: '',
        role: '',
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            await UserService.register(formData);
            setSuccess('Rejestracja zakończona sukcesem!');
        } catch (err) {
            console.error('Error during registration:', err);
            setError('Wystąpił błąd podczas rejestracji.');
        }
    };

    return (
        <div className="register-page">
            <h1>Rejestracja</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="firstName"
                    placeholder="Imię"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Nazwisko"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
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
                <input
                    type="text"
                    name="city"
                    placeholder="Miasto"
                    value={formData.city}
                    onChange={handleChange}
                    required
                />
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                >
                    <option value="">Wybierz rolę</option>
                    <option value="USER">Użytkownik</option>
                    <option value="ADMIN">Administrator</option>
                </select>
                <button type="submit">Zarejestruj</button>
            </form>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
        </div>
    );
}
