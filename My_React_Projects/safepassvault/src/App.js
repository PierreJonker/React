import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Admin from './components/Admin';
import Waiting from './components/Waiting';
import PrivateRoute from './components/PrivateRoute';
import Unauthorized from './components/Unauthorized';
import Navigation from './components/Navigation';
import Profile from './components/Profile';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route element={<PrivateRoute roles={['admin']} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route path="/waiting" element={<Waiting />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
