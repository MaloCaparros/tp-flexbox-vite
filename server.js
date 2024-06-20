import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs/promises';
import { fileURLToPath } from 'url'; // Importer fileURLToPath depuis 'url'
import path from 'path';
import cors from 'cors'; // Importer le module CORS

const __filename = fileURLToPath(import.meta.url); // Récupérer le nom de fichier avec fileURLToPath
const __dirname = path.dirname(__filename); // Récupérer le répertoire avec path.dirname

const app = express();

// Middleware pour activer CORS avec des options spécifiques
app.use(cors({
  origin: 'https://vachibox.netlify.app', // Supprimez la barre oblique à la fin de l'URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// Middleware pour parser les requêtes JSON
app.use(express.json());

app.post('/saveGameData', async (req, res) => {
  const gameData = req.body;

  if (!gameData.playerName || !gameData.score) {
    return res.status(400).send('Données invalides : playerName et score sont requis');
  }

  try {
    const dataFilePath = path.join(__dirname, 'data.json');
    console.log('Chemin du fichier data.json:', dataFilePath);

    let data = [];
    try {
      const existingData = await fs.readFile(dataFilePath, 'utf-8');
      data = JSON.parse(existingData);
    } catch (readError) {
      console.log('Aucun fichier data.json existant, création d\'un nouveau.');
    }


    // Ajouter les nouvelles données de jeu
    data.push(gameData);

    // Écrire les données mises à jour dans le fichier data.json
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));

    // Répondre avec succès
    res.status(200).send('Données sauvegardées avec succès');
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des données :', error);
    res.status(500).send('Erreur lors de la sauvegarde des données');
  }
});

app.get('/data.json', async (req, res) => {
    try {
      // Résolution du chemin du fichier data.json
      const dataFilePath = path.join(__dirname, 'data.json');
  
      // Lecture du fichier data.json
      const jsonData = await fs.readFile(dataFilePath, 'utf-8');
  
      // Envoyer les données JSON lues
      res.json(JSON.parse(jsonData));
    } catch (error) {
      console.error('Erreur lors de la lecture du fichier data.json :', error);
      res.status(500).send('Erreur lors de la lecture du fichier data.json');
    }
  });

// Démarrer le serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
