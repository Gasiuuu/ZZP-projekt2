import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from "../../service/UserService.js";
import './ProfilePage.css';

function ProfilePage() {
    const [profileInfo, setProfileInfo] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    }, []);

    if (!isLoggedIn) {
        return (
            <div>
                <h1>Musisz być zalogowany, aby zobaczyć swój profil.</h1>
            </div>
        );
    }

    return (
        <div className="profile-page-container">
            <h1 className="profile-header">Twój Profil</h1>
            <div>
                <p className="profile-details"><strong>Imię:</strong> {profileInfo.firstName}</p>
                <p className="profile-details"><strong>Nazwisko:</strong> {profileInfo.lastName}</p>
                <p className="profile-details"><strong>Email:</strong> {profileInfo.email}</p>
                <p className="profile-details"><strong>Miasto:</strong> {profileInfo.city}</p>
            </div>

        </div>
    );
}

export { ProfilePage };
