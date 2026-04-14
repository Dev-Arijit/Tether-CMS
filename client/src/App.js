import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import ContactList from './pages/ContactList';
import AddContact from './pages/AddContact';
import Admin from './pages/Admin';
import './App.css';
import Landing from "./pages/Landing";

function App() {
  const isAuthenticated = localStorage.getItem('token');

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contacts" element={isAuthenticated ? <ContactList /> : <Navigate to="/login" />} />
          <Route path="/add-contact" element={isAuthenticated ? <AddContact /> : <Navigate to="/login" />} />
          <Route path="/admin" element={isAuthenticated ? <Admin /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
