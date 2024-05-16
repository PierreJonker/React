import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth, firestore } from '../firebase';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await auth.signInWithEmailAndPassword(email, password);
      const user = auth.currentUser;
      const signupRequestDoc = await firestore.collection('signupRequests').doc(user.uid).get();
      if (signupRequestDoc.exists) {
        const { approved } = signupRequestDoc.data();
        if (approved) {
          history.push('/dashboard');
        } else {
          history.push('/waiting');
        }
      } else {
        history.push('/dashboard');
      }
    } catch (error) {
      console.log('Error logging in:', error);
      setError('Invalid email or password');
    }
    setLoading(false);
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p>
        <Link to="/forgot-password">Forgot Password?</Link>
      </p>
      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}

export default Login;