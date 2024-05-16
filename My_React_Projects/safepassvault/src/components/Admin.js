import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import './Admin.css';

function Admin() {
  const [signupRequests, setSignupRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch signup requests from Firestore
    const unsubscribe = firestore.collection('signupRequests')
      .where('approved', '==', false)
      .onSnapshot((snapshot) => {
        const requests = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSignupRequests(requests);
      });

    return () => unsubscribe();
  }, []);

  const handleApproveRequest = async (requestId) => {
    setLoading(true);
    try {
      await firestore.collection('signupRequests').doc(requestId).update({
        approved: true,
      });
    } catch (error) {
      console.log('Error approving request:', error);
    }
    setLoading(false);
  };

  const handleRemoveRequest = async (requestId) => {
    setLoading(true);
    try {
      await firestore.collection('signupRequests').doc(requestId).delete();
    } catch (error) {
      console.log('Error removing request:', error);
    }
    setLoading(false);
  };

  return (
    <div className="admin">
      <h2>Admin Dashboard</h2>
      <h3>Signup Requests</h3>
      {signupRequests.map((request) => (
        <div key={request.id} className="request">
          <p>Email: {request.email}</p>
          <p>Role: {request.role}</p>
          <div>
            <button onClick={() => handleApproveRequest(request.id)} disabled={loading}>
              {loading ? 'Approving...' : 'Approve'}
            </button>
            <button onClick={() => handleRemoveRequest(request.id)} disabled={loading}>
              {loading ? 'Removing...' : 'Remove'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Admin;