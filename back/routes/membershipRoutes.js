// Import necessary modules and dependencies
const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();

// Endpoint to check if a user is a member of any team
router.get('/checkMembership/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Query the teams collection to check if any team includes the userId in its members array
      const teamsSnapshot = await db.collection('teams').where('members', 'array-contains', userId).get();
  
      if (teamsSnapshot.empty) {
        res.status(200).send({ isMember: false });
      } else {
        res.status(200).send({ isMember: true });
      }
    } catch (error) {
      console.error('Error checking team membership:', error);
      res.status(500).send('An error occurred while checking team membership');
    }
  });

// Export the router
module.exports = router;
