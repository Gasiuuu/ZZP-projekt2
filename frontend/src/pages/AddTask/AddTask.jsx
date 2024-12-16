import React, { useState } from 'react';
import TaskService from "../../service/TaskService.js";


function AddTask() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const taskDto = {
            title,
            description,
            status,
            categoryId: parseInt(categoryId),
        };

        try {
            await TaskService.createTask(taskDto);
            setSuccess('Zadanie zostało dodane pomyślnie!');
            setTitle('');
            setDescription('');
            setStatus('');
            setCategoryId('');
        } catch (err) {
            setError('Wystąpił błąd podczas dodawania zadania.');
        }
    };

    return (
        <div className="login-page">
            <h1>Dodaj Zadanie</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Tytuł"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Opis"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="ID kategorii"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    required
                />
                {error && <div className="error">{error}</div>}
                {success && <div className="success">{success}</div>}
                <button type="submit">Dodaj Zadanie</button>
            </form>
        </div>
    );
}

export {AddTask};
