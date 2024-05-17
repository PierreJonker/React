import React, { useState } from 'react';
import { auth } from '../firebase';
import './ForgotPassword.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await auth.sendPasswordResetEmail(email);
        setSuccess(true);
      } catch (error) {
        console.log('Error resetting password:', error);
        setError('Failed to reset password');
      }
    }
  };

  return (
    <div className="forgot-password">
      <h2>Forgot Password</h2>
      {success ? (
        <p>Password reset email sent. Please check your inbox.</p>
      ) : (
        <form onSubmit={handleResetPassword}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className="error">{emailError}</p>}
          {error && <p className="error">{error}</p>}
          <button type="submit">Reset Password</button>
        </form>
      )}
    </div>
  );
}

export default ForgotPassword;