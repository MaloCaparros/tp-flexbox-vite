import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
  origin: 'https://vachibox.netlify.app',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

app.post('/saveGameData', async (req, res) => {
  const gameData = req.body;

  if (!gameData.playerName || !gameData.score) {
    return res.status(400).send('Données invalides : playerName et score sont requis');
  }

  try {
    const dataFilePath = ("https://vachibox.vercel.app/data.json")

    let data = [];
    try {
      const existingData = await fs.readFile(dataFilePath, 'utf-8');
      if (existingData) {
        data = JSON.parse(existingData);
      }
    } catch (readError) {
      console.error('Erreur lors de la lecture des données existantes :', readError);
    }

    data.push(gameData);

    try {
      await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
      res.status(200).send('Données sauvegardées avec succès');
    } catch (writeError) {
      console.error('Erreur lors de l\'écriture des données :', writeError);
      res.status(500).send('Erreur lors de l\'écriture des données');
    }
  } catch (error) {
    console.error('Erreur générale lors de la sauvegarde des données :', error);
    res.status(500).send('Erreur générale lors de la sauvegarde des données');
  }
});

app.get('/data.json', async (req, res) => {
  try {
    const dataFilePath = path.join(__dirname, 'data.json');
    const jsonData = await fs.readFile(dataFilePath, 'utf-8');
    res.json(JSON.parse(jsonData));
  } catch (error) {
    console.error('Erreur lors de la lecture du fichier data.json :', error);
    res.status(500).send('Erreur lors de la lecture du fichier data.json');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
