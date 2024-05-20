import { firestore } from '../firebase';

export const logEvent = async (userId, action, details = {}) => {
  try {
    await firestore.collection('auditLogs').add({
      userId,
      action,
      timestamp: new Date(),
      details,
    });
  } catch (error) {
    console.log('Error logging event:', error);
  }
};