const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const cors = require('cors');
const serviceAccount = require('./hackathon-reg-malayasia-firebase-adminsdk-64iq3-c870a4a312.json');

const app = express();
app.use(bodyParser.json());
app.use(cors());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://hackathon-reg-malayasia.firebaseio.com'
});

const db = admin.firestore();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

//registration endpoint
app.post('/register', async (req, res) => {
    const { email, password, ...profileData } = req.body;
    try {
      const userRecord = await admin.auth().createUser({ email, password });
      await db.collection('users').doc(userRecord.uid).set(profileData);
      res.status(201).send(userRecord);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

//get all participants
app.get('/participants', async (req, res) => {
    try {
      const snapshot = await db.collection('users').get();
      const participants = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).send(participants);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

// get a single participant
app.get('/participant/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const doc = await db.collection('users').doc(id).get();
      if (!doc.exists) {
        res.status(404).send('User not found');
      } else {
        res.status(200).send({ id: doc.id, ...doc.data() });
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  });  

// create team
app.post('/teams', async (req, res) => {
    const { name, members } = req.body;
    try {
      const teamRef = await db.collection('teams').add({ name, members });
      res.status(201).send({ id: teamRef.id });
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

// join a team
app.post('/teams/:id/join', async (req, res) => {
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
  
// get all teams
app.get('/teams', async (req, res) => {
    try {
      const snapshot = await db.collection('teams').get();
      const teams = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).send(teams);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

// get a single team
app.get('/teams/:id', async (req, res) => {
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
  