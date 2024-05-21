import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase'; // Import firestore from firebase.js
import './Admin.css';

function Admin() {
  const [signupRequests, setSignupRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = firestore
      .collection('users')
      .where('approvalStatus', '==', 'pending')
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
      await firestore.collection('users').doc(requestId).update({
        approvalStatus: 'approved',
      });
    } catch (error) {
      console.log('Error approving request:', error);
    }
    setLoading(false);
  };

  const handleRejectRequest = async (requestId) => {
    setLoading(true);
    try {
      await firestore.collection('users').doc(requestId).update({
        approvalStatus: 'rejected',
      });
    } catch (error) {
      console.log('Error rejecting request:', error);
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
          <div>
            <button
              onClick={() => handleApproveRequest(request.id)}
              disabled={loading}
            >
              {loading ? 'Approving...' : 'Approve'}
            </button>
            <button
              onClick={() => handleRejectRequest(request.id)}
              disabled={loading}
            >
              {loading ? 'Rejecting...' : 'Reject'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Admin;
