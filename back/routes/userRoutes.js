// userRoutes.js

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();

// Route to register a new user

router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Register the user using Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name
    });

    // Save additional user data to Firestore with initial null values
    await db.collection('users').doc(userRecord.uid).set({
      email,
      name,
      skills: null,
      academicBackground: null,
      interests: null
    });

    res.status(201).send({ uid: userRecord.uid });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('An error occurred while registering user');
  }
});

module.exports = router;


// Route to log in a user
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Log in the user using Firebase Authentication
      const userRecord = await admin.auth().getUserByEmail(email);
      if (userRecord) {
        // Get the UID of the logged-in user
        const uid = userRecord.uid;
  
        // Send the UID along with the success response
        res.status(200).send({ message: 'User logged in successfully', uid });
      } else {
        res.status(404).send('User not found');
      }
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).send('An error occurred while logging in user');
    }
  });
  

// Route to log out a user
router.post('/logout', async (req, res) => {
  // Log out the user using Firebase Authentication
  // Implementation for user logout
});

// Route to reset password
router.post('/reset-password', async (req, res) => {
  // Reset user password using Firebase Authentication
  // Implementation for password reset
});

module.exports = router;
