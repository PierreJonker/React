// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import RecipeDetail from './components/RecipeDetail';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import PrivateRecipes from './components/PrivateRecipes';
import PrivateRoute from './components/PrivateRoute';
import DraftRecipes from './components/DraftRecipes';
import { Container } from 'react-bootstrap';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<PrivateRoute><RecipeList type="public" /></PrivateRoute>} />
          <Route path="/recipes" element={<PrivateRoute><RecipeList type="public" /></PrivateRoute>} />
          <Route path="/recipes/:id" element={<PrivateRoute><RecipeDetail /></PrivateRoute>} />
          <Route path="/add-recipe" element={<PrivateRoute><RecipeForm /></PrivateRoute>} />
          <Route path="/edit-recipe/:id" element={<PrivateRoute><RecipeForm /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/private-recipes" element={<PrivateRoute><PrivateRecipes /></PrivateRoute>} />
          <Route path="/draft-recipes" element={<PrivateRoute><DraftRecipes /></PrivateRoute>} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
