const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const cors = require('cors');
const serviceAccount = require('./hackathon-reg-malayasia-firebase-adminsdk-64iq3-c870a4a312.json');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

// Initialize Firebase 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://hackathon-reg-malayasia.firebaseio.com'
});

const db = admin.firestore();

// Import routes
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const teamRoutes = require('./routes/teamRoutes'); // Add this line

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/teams', teamRoutes); // Add this line

app.listen(port, () => {
  console.log('Server is running on port', port);
});

app.get('/hack', (req, res) => {
  res.send('Hello, Hackathon!');
});

// Get all participants
app.get('/participants', async (req, res) => {
  try {
    const snapshot = await db.collection('users').get();
    const participants = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).send(participants);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get a single participant
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

