const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize the app with a service account, granting admin privileges
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https//recipesharingapp-1be92.firebaseio.com' // Update with your database URL
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Define the password reset endpoint
app.post('/resetPassword', async (req, res) => {
  const { uid, newPassword } = req.body;

  try {
    await admin.auth().updateUser(uid, { password: newPassword });
    res.status(200).send('Password updated successfully');
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(400).send('Error updating password: ' + error.message);
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});