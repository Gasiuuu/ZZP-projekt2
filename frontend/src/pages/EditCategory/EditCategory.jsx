import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CategoryService from "../../service/CategoryService.js";

function EditCategory() {
    const { categoryId } = useParams(); // Pobieramy categoryId z parametrów URL
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    // Pobieranie danych kategorii na podstawie categoryId
    useEffect(() => {
        const fetchCategoryDetails = async () => {
            try {
                const category = await CategoryService.getCategoryById(categoryId);
                setName(category.name); // Ustawienie nazwy z pobranych danych
            } catch (err) {
                setError('Wystąpił błąd podczas pobierania danych kategorii.');
            }
        };

        fetchCategoryDetails();
    }, [categoryId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const updatedCategoryDto = { name }; // Przygotowanie DTO do wysłania

        try {
            await CategoryService.updateCategory(categoryId, updatedCategoryDto);
            setSuccess('Kategoria została zaktualizowana pomyślnie!');
            setTimeout(() => navigate("/strona-glowna"), 1000); // Przekierowanie po sukcesie
        } catch (err) {
            setError('Wystąpił błąd podczas aktualizacji kategorii.');
        }
    };

    return (
        <div className="login-page">
            <h1>Edytuj Kategorię</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nazwa kategorii"
                    value={name} // Ustawienie wartości inputa
                    onChange={(e) => setName(e.target.value)} // Aktualizacja stanu name
                    required
                />
                {error && <div className="error">{error}</div>}
                {success && <div className="success">{success}</div>}
                <button type="submit">Zaktualizuj Kategorię</button>
            </form>
        </div>
    );
}

export { EditCategory };
