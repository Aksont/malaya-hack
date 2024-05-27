// src/routes/profileRoutes.js

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();

// Route to get user profile by user ID
router.get('/:uid', async (req, res) => {
  const { uid } = req.params;
  try {
    const userDoc = await db.collection('users').doc(uid).get();
    if (userDoc.exists) {
      res.status(200).send(userDoc.data());
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
