import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { firestore, collection, addDoc } from '../firebase';
import './Signup.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
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

    return isValid;
  };

  const handleSignupRequest = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        await addDoc(collection(firestore, 'users'), {
          email: email,
          approvalStatus: 'pending',
          createdAt: new Date(),
          // Add any other relevant user data fields
        });
        setEmail('');
        setError(null);
        alert('Signup request submitted! Please wait for admin approval.');
        navigate('/waiting');
      } catch (error) {
        console.log('Error submitting signup request:', error);
        setError('Failed to submit signup request');
      }
      setLoading(false);
    }
  };

  return (
    <div className="signup">
      <h2>Request Signup</h2>
      <form onSubmit={handleSignupRequest}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p className="error">{emailError}</p>}
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Signup Request'}
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Signup;