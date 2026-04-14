import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ userName }) => {
    const navigate = useNavigate();

    
    const isLoggedIn = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('userRole') === 'admin';
        

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('userRole');
        navigate('/login');
    };

    if (!isLoggedIn) {
        return null; 
    }

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-left">
                    <div className="logo">
                        <span className="logo-icon">👤</span>
                        <span className="logo-text">ContactManager</span>
                    </div>
                    <div className="nav-links">
                        <button className="nav-link" onClick={() => navigate('/contacts')}>
                            <span className="nav-icon">📞</span> Contacts
                        </button>
                        <button onClick={() => isAdmin ? navigate('/admin') : alert('Access Denied: Admins Only')}
                            className="nav-link">
                            <span className="nav-icon">⚙️</span> Admin Panel
                        </button>
                    </div>
                </div>
                <div className="navbar-right">
                    <span className="welcome-text">Welcome, {userName || 'John'}!</span>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;