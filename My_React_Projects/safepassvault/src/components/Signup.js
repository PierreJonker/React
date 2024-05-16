import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth, firestore } from '../firebase';
import './Signup.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      await firestore.collection('signupRequests').doc(user.uid).set({
        email: user.email,
        role,
        approved: false,
      });
      history.push('/waiting');
    } catch (error) {
      console.log('Error signing up:', error);
      setError('Failed to sign up');
    }
    setLoading(false);
  };

  return (
    <div className="signup">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <label>
            <input
              type="radio"
              value="user"
              checked={role === 'user'}
              onChange={() => setRole('user')}
            />
            User
          </label>
          <label>
            <input
              type="radio"
              value="admin"
              checked={role === 'admin'}
              onChange={() => setRole('admin')}
            />
            Admin
          </label>
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Signup;