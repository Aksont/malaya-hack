
// profileRoutes.js

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();

// Route to get user profile by user ID
router.get('/:uid', async (req, res) => {
  try {
    const { uid } = req.params;
    
    // Fetch user profile from Firestore
    const userDoc = await db.collection('users').doc(uid).get();
    if (userDoc.exists) {
      res.status(200).send(userDoc.data());
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).send('An error occurred while fetching user profile');
  }
});

// Route to update user profile
router.post('/profile/update', async (req, res) => {
    try {
      const { uid, skills, academicBackground, interests } = req.body;
  
      // Validate that the user exists
      const userRef = db.collection('users').doc(uid);
      const userDoc = await userRef.get();
  
      if (!userDoc.exists) {
        return res.status(404).send('User not found');
      }
  
      // Update the user profile in Firestore
      await userRef.update({
        skills,
        academicBackground,
        interests
      });
  
      res.status(200).send('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).send('An error occurred while updating profile');
    }
  });

// Route to delete user profile
router.delete('/:uid', async (req, res) => {
  try {
    const { uid } = req.params;

    // Delete user profile from Firestore
    await db.collection('users').doc(uid).delete();

    res.status(200).send('User profile deleted successfully');
  } catch (error) {
    console.error('Error deleting user profile:', error);
    res.status(500).send('An error occurred while deleting user profile');
  }
});

module.exports = router;
