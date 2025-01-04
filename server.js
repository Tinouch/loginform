
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port = 3019;

const app = express();
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connexion à MongoDB
const studentsDB = mongoose.createConnection('mongodb+srv://tinouchouakli:Tinatigrine@login.paduq.mongodb.net/loginDB?retryWrites=true&w=majority&appName=login',
  {
    tls: true, // Active TLS
    tlsInsecure: true,
  }
);

studentsDB.on('connected', () => {
  console.log('Connected to MongoDB successfully.');
});

studentsDB.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Définir le schéma utilisateur
const userSchema = new mongoose.Schema({
  regd_no: String,
  name: String,
  email: String,
  branch: String,
});

// Modèle Mongoose
const Users = studentsDB.model("data", userSchema, 'students');

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route pour la page de succès
app.get('/success', (req, res) => {
  res.send('<h1>Form submission successful!</h1><p>Thank you for submitting the form.</p>');
});

app.post('/post', async (req, res) => {
  try {
    console.log("Données reçues :", req.body);
    const { regd_no, name, email, branch } = req.body;

    if (!regd_no || !name || !email || !branch) {
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }

    const user = new Users({
      regd_no,
      name,
      email,
      branch,
    });

    await user.save();
    console.log("Utilisateur enregistré :", user);

    // Réponse JSON
    res.status(201).json({ message: "Formulaire soumis avec succès !" });
  } catch (err) {
    console.error("Erreur lors de la soumission :", err);

    // Réponse JSON en cas d'erreur
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
