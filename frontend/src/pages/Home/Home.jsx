import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TaskService from "../../service/TaskService.js";
import UserService from "../../service/UserService.js";
import CategoryService from "../../service/CategoryService.js";
import { MdEdit, MdDelete } from "react-icons/md";
import './Home.css';

function Home() {
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [profileInfo, setProfileInfo] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const fetchProfileInfo = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsLoggedIn(false);
                return;
            }

            const response = await UserService.getYourProfile(token);
            setProfileInfo(response.userEntity);
            setIsLoggedIn(true);
        } catch (error) {
            console.error('Error fetching profile information: ', error);
            setIsLoggedIn(false);
        }
    };

    useEffect(() => {
        fetchProfileInfo();
        if (isLoggedIn) {
            fetchTasks();
            fetchCategories();
        }
    }, [isLoggedIn]);

    const fetchTasks = async () => {
        try {
            const fetchedTasks = await TaskService.getAllTasks();
            setTasks(fetchedTasks);
        } catch (error) {
            console.error('Error fetching tasks: ', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const fetchedCategories = await CategoryService.getAllCategories();
            setCategories(fetchedCategories);
        } catch (error) {
            console.error('Error fetching categories: ', error);
        }
    };

    const handleEditTask = (taskId) => {
        navigate(`/edit-task/${taskId}`);
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await TaskService.deleteTask(taskId);
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error('Error deleting task: ', error);
        }
    };

    const handleEditCategory = (categoryId) => {
        navigate(`/edit-category/${categoryId}`);
    };

    const handleDeleteCategory = async (categoryId) => {
        try {
            await CategoryService.deleteCategory(categoryId);
            setCategories(categories.filter(category => category.id !== categoryId));
        } catch (error) {
            console.error('Error deleting category: ', error);
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="not-logged-in-container">
                <h1 className="not-logged-in-message">Aplikacja do zarządzania zadaniami, zaloguj się, aby korzystać z aplikacji.</h1>
                <button
                    className="login-button"
                    onClick={() => navigate('/logowanie')}>
                    Zaloguj się
                </button>
            </div>
        );
    }

    return (
        <div>

            <h1 className="hello-header">Cześć, {profileInfo.firstName}!</h1>

            <div className="home-container">
                <h1>Twoje zadania</h1>
                <table className="task-table">
                    <thead>
                    <tr>
                        <th>NAZWA ZADANIA</th>
                        <th>KATEGORIA</th>
                        <th>STATUS</th>
                        <th>OPIS</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {tasks.map((task) => (
                        <tr key={task.id}>
                            <td>{task.title}</td>
                            <td>{task.categoryName || 'Uncategorized'}</td>
                            <td>{task.status}</td>
                            <td>{task.description}</td>
                            <td>
                                <button onClick={() => handleEditTask(task.id)} className="edit-button">
                                    <MdEdit/> Edit
                                </button>
                                <button onClick={() => handleDeleteTask(task.id)} className="delete-button">
                                    <MdDelete/> Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>


                <h1>Twoje kategorie</h1>
                <table className="task-table">
                    <thead>
                    <tr>
                        <th>NAZWA KATEGORII</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td>{category.name}</td>
                            <td>
                                <button onClick={() => handleEditCategory(category.id)} className="edit-button">
                                    <MdEdit/> Edit
                                </button>
                                <button onClick={() => handleDeleteCategory(category.id)} className="delete-button">
                                    <MdDelete/> Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <Link to="/add-category">
                    <button className="add-category-button">Dodaj Kategorię</button>
                </Link>
                <Link to="/add-task">
                    <button className="add-task-button">+</button>
                </Link>

            </div>
        </div>
    );
}

export { Home };
