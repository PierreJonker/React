import React, { useState } from 'react';
import { auth } from '../firebase';
import './ForgotPassword.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await auth.sendPasswordResetEmail(email);
      setSuccess(true);
    } catch (error) {
      console.log('Error resetting password:', error);
      setError('Failed to reset password');
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
          {error && <p className="error">{error}</p>}
          <button type="submit">Reset Password</button>
        </form>
      )}
    </div>
  );
}

export default ForgotPassword;