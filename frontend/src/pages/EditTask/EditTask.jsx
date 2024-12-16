import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TaskService from "../../service/TaskService.js";

function EditTask() {
    const { taskId } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTaskDetails = async () => {
            try {
                const task = await TaskService.getTaskById(taskId);
                setTitle(task.title);
                setDescription(task.description);
                setCategoryId(task.categoryId);
            } catch (err) {
                setError('Wystąpił błąd podczas pobierania danych zadania.');
            }
        };

        fetchTaskDetails();
    }, [taskId]);

    console.log("Task ID from URL:", taskId);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const updatedTaskDto = {
            title,
            description,
            categoryId: parseInt(categoryId),
        };

        try {
            await TaskService.updateTask(taskId, updatedTaskDto); // Przekazujemy taskId jako pierwszy argument
            setSuccess('Zadanie zostało zaktualizowane pomyślnie!');
            setTimeout(() => navigate("/strona-glowna"), 1000);
        } catch (err) {
            setError('Wystąpił błąd podczas aktualizacji zadania.');
        }
    };

    return (
        <div className="login-page">
            <h1>Edytuj Zadanie</h1>
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
                    type="number"
                    placeholder="ID kategorii"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    required
                />
                {error && <div className="error">{error}</div>}
                {success && <div className="success">{success}</div>}
                <button type="submit">Zaktualizuj Zadanie</button>
            </form>
        </div>
    );
}

export { EditTask };
