import express from 'express';
import cors from 'cors';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';


dotenv.config();

const app = express();

const corsOptions = {
  origin: 'https://vachibox.netlify.app',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); 

app.use(express.json());

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
};

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

app.post('/saveGameData', async (req, res) => {
  const gameData = req.body;

  if (!gameData.playerName || !gameData.score) {
    return res.status(400).send('Données invalides : playerName et score sont requis');
  }

  try {
    const docRef = await db.collection('gameData').add(gameData);
    res.status(200).send('Données sauvegardées avec succès');
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des données :', error);
    res.status(500).send('Erreur lors de la sauvegarde des données');
  }
});

app.get('/data.json', async (req, res) => {
  try {
    const snapshot = await db.collection('gameData').get();
    const data = snapshot.docs.map((doc) => doc.data());
    res.json(data);
  } catch (error) {
    console.error('Erreur lors de la lecture des données :', error);
    res.status(500).send('Erreur lors de la lecture des données');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
