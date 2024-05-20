import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../firebase';
import CryptoJS from 'crypto-js';
import PasswordGenerator from './PasswordGenerator';
import { handleError } from '../utils/errorHandling';
import './Dashboard.css';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [passwords, setPasswords] = useState([]);
  const [website, setWebsite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        // Fetch the user's stored passwords from Firestore
        const passwordsRef = firestore.collection('passwords');
        const query = passwordsRef.where('userId', '==', user.uid);
        const unsubscribePasswords = query.onSnapshot((snapshot) => {
          const passwordsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPasswords(passwordsData);
        });

        return () => {
          unsubscribePasswords();
        };
      } else {
        setUser(null);
        setPasswords([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAddPassword = async (e) => {
    e.preventDefault();
    try {
      const passwordsRef = firestore.collection('passwords');
      const encryptedPassword = CryptoJS.AES.encrypt(password, user.uid).toString();
      await passwordsRef.add({
        userId: user.uid,
        website,
        username,
        password: encryptedPassword,
        createdAt: new Date(),
      });
      setWebsite('');
      setUsername('');
      setPassword('');
      setError(null);
    } catch (error) {
      handleError(error, setError);
    }
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <p>Welcome, {user && user.email}!</p>

      <h3>Add New Password</h3>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleAddPassword}>
        <input
          type="text"
          placeholder="Website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Add Password</button>
      </form>

      <h3>Stored Passwords</h3>
      {passwords.map((password) => (
        <div key={password.id}>
          <p>Website: {password.website}</p>
          <p>Username: {password.username}</p>
          <p>
            Password:{' '}
            {CryptoJS.AES.decrypt(password.password, user.uid).toString(CryptoJS.enc.Utf8)}
          </p>
        </div>
      ))}

      <PasswordGenerator userId={user && user.uid} />
    </div>
  );
}

export default Dashboard;