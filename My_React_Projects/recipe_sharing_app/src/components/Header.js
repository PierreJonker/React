// src/components/Header.js
import React, { useEffect, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">RecipeApp</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {user && <Nav.Link as={Link} to="/recipes">Recipes</Nav.Link>}
          {user && <Nav.Link as={Link} to="/add-recipe">Add Recipe</Nav.Link>}
          {user && <Nav.Link as={Link} to="/private-recipes">Private Recipes</Nav.Link>}
          {user && <Nav.Link as={Link} to="/draft-recipes">Draft Recipes</Nav.Link>}
          {user && <Nav.Link as={Link} to="/profile">Profile</Nav.Link>}
        </Nav>
        <Nav>
          {user ? (
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
