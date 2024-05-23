const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


// Function to set admin claim
const setAdmin = async (uid) => {
  try {
    await admin.auth().setCustomUserClaims(uid, { admin: true });
    console.log(`Successfully made ${uid} an admin`);
  } catch (error) {
    console.error('Error setting admin claim:', error);
  }
};

// Replace 'USER_UID' with the actual user ID you want to make an admin
setAdmin('cW7Ugxe1QCTkEjJ8G7lmZqKkt5m1');
