import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../firebase';
import crypto from 'crypto';
import PasswordGenerator from './PasswordGenerator';
import './Dashboard.css';

// Generate a secure encryption key (you can store this in a secure location or use a key management service)
const encryptionKey = crypto.randomBytes(32).toString('hex');

const encryptPassword = (password) => {
  const cipher = crypto.createCipher('aes-256-cbc', encryptionKey);
  let encryptedPassword = cipher.update(password, 'utf8', 'hex');
  encryptedPassword += cipher.final('hex');
  return encryptedPassword;
};

const decryptPassword = (encryptedPassword) => {
  const decipher = crypto.createDecipher('aes-256-cbc', encryptionKey);
  let decryptedPassword = decipher.update(encryptedPassword, 'hex', 'utf8');
  decryptedPassword += decipher.final('utf8');
  return decryptedPassword;
};

function Dashboard() {
  const [user, setUser] = useState(null);
  const [passwords, setPasswords] = useState([]);
  const [website, setWebsite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserPasswords();
  }, []);

  const fetchUserPasswords = () => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        // Fetch the user's stored passwords from Firestore
        const passwordsRef = firestore.collection('passwords');
        const query = passwordsRef.where('userId', '==', user.uid);
        const unsubscribePasswords = query.onSnapshot((snapshot) => {
          // Map the snapshot data to an array of password objects
          const passwordsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPasswords(passwordsData);
        });

        // Clean up the listener when the component unmounts
        return () => {
          unsubscribePasswords();
        };
      } else {
        setUser(null);
        setPasswords([]);
      }
    });

    return () => unsubscribe();
  };

  const handleAddPassword = async (e) => {
    e.preventDefault();
    try {
      const passwordsRef = firestore.collection('passwords');
      const encryptedPassword = encryptPassword(password);
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
      console.log('Error adding password:', error);
      setError('Failed to add password');
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
          aria-label="Website"
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          aria-label="Username"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-label="Password"
        />
        <button type="submit">Add Password</button>
      </form>

      <h3>Stored Passwords</h3>
      {passwords.map((password) => (
        <div key={password.id}>
          <p>Website: {password.website}</p>
          <p>Username: {password.username}</p>
          <p>
            Password: {decryptPassword(password.password)}
          </p>
        </div>
      ))}

      <PasswordGenerator userId={user && user.uid} />
    </div>
  );
}

export default Dashboard;