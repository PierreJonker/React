import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, firestore } from '../firebase';
import zxcvbn from 'zxcvbn';
import './Signup.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;

    if (email.trim() === '') {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email is invalid');
      isValid = false;
    } else {
      setEmailError('');
    }

    const passwordResult = zxcvbn(password);
    if (passwordResult.score < 3) {
      setPasswordError('Password is too weak');
      isValid = false;
    } else {
      setPasswordError('');
    }

    setPasswordStrength(passwordResult.score);

    return isValid;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        const { user } = await auth.createUserWithEmailAndPassword(email, password);
        await firestore.collection('signupRequests').doc(user.uid).set({
          email: user.email,
          role,
          approved: false,
        });
        navigate('/waiting');
      } catch (error) {
        console.log('Error signing up:', error);
        setError('Failed to sign up');
      }
      setLoading(false);
    }
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
        {emailError && <p className="error">{emailError}</p>}
        <div className="password-input">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        {passwordError && <p className="error">{passwordError}</p>}
        {passwordStrength !== null && (
          <div className="password-strength">
            <progress value={passwordStrength} max="4" />
            <p>Password Strength: {passwordStrength}/4</p>
          </div>
        )}
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