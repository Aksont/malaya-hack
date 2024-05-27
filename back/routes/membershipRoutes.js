// Import necessary modules and dependencies
const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();

// Endpoint to check if a user is a member of a team
router.get('/checkMembership/:userId/:teamId', async (req, res) => {
  try {
    const { userId, teamId } = req.params;

    // Check if the team exists
    const teamDoc = await db.collection('teams').doc(teamId).get();
    if (!teamDoc.exists) {
      return res.status(404).send('Team not found');
    }

    // Get the team's members
    const teamData = teamDoc.data();
    const members = teamData.members || [];

    // Check if the user is a member of the team
    if (members.includes(userId)) {
      res.status(200).send({ isMember: true });
    } else {
      res.status(200).send({ isMember: false });
    }
  } catch (error) {
    console.error('Error checking team membership:', error);
    res.status(500).send('An error occurred while checking team membership');
  }
});

// Export the router
module.exports = router;
