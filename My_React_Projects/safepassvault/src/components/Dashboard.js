import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../firebase';
import CryptoJS from 'crypto-js';
import './Dashboard.css';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [passwords, setPasswords] = useState([]);
  const [website, setWebsite] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        // Fetch the user's stored passwords from Firestore
        firestore
          .collection('passwords')
          .where('userId', '==', user.uid)
          .onSnapshot((snapshot) => {
            const passwordData = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setPasswords(passwordData);
          });
      } else {
        setUser(null);
        setPasswords([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAddPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const encryptedPassword = CryptoJS.AES.encrypt(password, user.uid).toString();
      await firestore.collection('passwords').add({
        userId: user.uid,
        website,
        email,
        password: encryptedPassword,
      });
      setWebsite('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.log('Error adding password:', error);
      setError('Failed to add password');
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      // Redirect to the home page after logout
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <p>Welcome, {user.email}!</p>
      <h3>Stored Passwords</h3>
      {passwords.map((password) => (
        <div key={password.id}>
          <p>Website: {password.website}</p>
          <p>Email: {password.email}</p>
          <p>
            Password: {CryptoJS.AES.decrypt(password.password, user.uid).toString(CryptoJS.enc.Utf8)}
          </p>
        </div>
      ))}
      <h3>Add New Password</h3>
      <form onSubmit={handleAddPassword}>
        <input
          type="text"
          placeholder="Website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
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
          {loading ? 'Adding...' : 'Add Password'}
        </button>
      </form>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;