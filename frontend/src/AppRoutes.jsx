import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar.jsx";
import { Home } from "./pages/Home/Home.jsx";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage.jsx";
import { LoginPage } from "./pages/LoginPage/LoginPage.jsx";
import { AddTask } from "./pages/AddTask/AddTask.jsx";
import { EditTask } from "./pages/EditTask/EditTask.jsx";
import { EditCategory } from "./pages/EditCategory/EditCategory.jsx";
import { AddCategory } from "./pages/AddCategory/AddCategory.jsx";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage.jsx";
import { AdminPanel } from "./pages/AdminPanel/AdminPanel.jsx";

function AppRoutes() {
    const renderLayout = (Component) => (
        <div className="App">
            <div className="navbar">
                <Navbar />
            </div>
            <div className="content-wrapper">
                {Component}
            </div>
        </div>
    );

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/strona-glowna" />} />
                <Route path="/strona-glowna" element={renderLayout(<Home />)} />
                <Route path="/logowanie" element={renderLayout(<LoginPage />)} />
                <Route path="/rejestracja" element={renderLayout(<RegisterPage />)} />
                <Route path="/add-task" element={renderLayout(<AddTask />)} />
                <Route path="/edit-task/:taskId" element={renderLayout(<EditTask />)} />
                <Route path="/edit-category/:categoryId" element={renderLayout(<EditCategory />)} />
                <Route path="/add-category" element={renderLayout(<AddCategory />)} />
                <Route path="/profil" element={renderLayout(<ProfilePage />)} />
                <Route path="/admin-panel" element={renderLayout(<AdminPanel />)} />

                {/*<Route path="/update/:userId" element={renderLayout(<UpdatePage />)} />*/}
            </Routes>
        </Router>
    );
}

export default AppRoutes;
