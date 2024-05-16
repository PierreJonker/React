import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import './Navigation.css';

function Navigation() {
  const currentUser = auth.currentUser;

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  return (
    <nav className="navigation">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {currentUser ? (
          <>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            {currentUser.role === 'admin' && (
              <li>
                <Link to="/admin">Admin</Link>
              </li>
            )}
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;