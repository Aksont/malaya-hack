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
      res.status(404).send('Team not found');
    } else {
      res.status(200).send({ id: doc.id, ...doc.data() });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
