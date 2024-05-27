// routes/teamRoutes.js

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();

// Create team
router.post('/', async (req, res) => {
  const { name, members } = req.body;
  try {
    const teamRef = await db.collection('teams').add({ name, members });
    res.status(201).send({ id: teamRef.id });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Join a team
router.post('/:id/join', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const teamRef = db.collection('teams').doc(id);
    const teamDoc = await teamRef.get();
    if (!teamDoc.exists) {
      res.status(404).send('Team not found');
    } else {
      const teamData = teamDoc.data();
      const updatedMembers = [...teamData.members, userId];
      await teamRef.update({ members: updatedMembers });
      res.status(200).send('User added to the team');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});
  
// Get all teams
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('teams').get();
    const teams = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).send(teams);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get a single team
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const doc = await db.collection('teams').doc(id).get();
      if (!doc.exists) {
        return res.status(404).send('Team not found');
      }
  
      const teamData = { id: doc.id, ...doc.data() };
      const memberIds = teamData.members;
  
      if (memberIds && memberIds.length > 0) {
        const memberPromises = memberIds.map(memberId => db.collection('users').doc(memberId).get());
        const memberDocs = await Promise.all(memberPromises);
  
        const members = memberDocs.map(memberDoc => {
          if (memberDoc.exists) {
            return { id: memberDoc.id, ...memberDoc.data() };
          }
          return null;
        }).filter(member => member !== null); // Filter out any null values in case some members don't exist
  
        teamData.members = members;
      } else {
        teamData.members = [];
      }
  
      res.status(200).send(teamData);
    } catch (error) {
      console.error('Error getting team:', error);
      res.status(500).send('An error occurred while retrieving the team');
    }
  });
    
module.exports = router;
