const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const cors = require('cors');
const serviceAccount = require('./hackathon-reg-malayasia-firebase-adminsdk-64iq3-c870a4a312.json');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

//init firebase 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://hackathon-reg-malayasia.firebaseio.com'
});

const db = admin.firestore();

// Import routes
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/profiles', profileRoutes);

app.listen(port, () => {
  console.log('Server is running on default port');
});

app.get('/hack', (req, res) => {
    res.send('Hello, Hackathon!');
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
