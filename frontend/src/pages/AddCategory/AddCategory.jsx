import React, { useState } from 'react';
import CategoryService from "../../service/CategoryService.js";

function AddCategory() {
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const categoryDto = { name };

        try {
            await CategoryService.createCategory(categoryDto);
            setSuccess('Kategoria została dodana pomyślnie!');
            setName('');
        } catch (err) {
            setError('Wystąpił błąd podczas dodawania kategorii.');
        }
    };

    return (
        <div className="login-page">
            <h1>Dodaj Kategorię</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nazwa kategorii"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                {error && <div className="error">{error}</div>}
                {success && <div className="success">{success}</div>}
                <button type="submit">Dodaj Kategorię</button>
            </form>
        </div>
    );
}

export { AddCategory };
