
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port = 3020;

const app = express();
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connexion à MongoDB
const studentsDB = mongoose.createConnection('mongodb://127.0.0.1:27017/students');

studentsDB.on('connected', () => console.log('Connected to the "students" database.'));

// Définir le schéma utilisateur
const userSchema = new mongoose.Schema({
  regd_no: String,
  name: String,
  email: String,
  branch: String,
});

// Modèle Mongoose
const Users = studentsDB.model("data", userSchema, "data");

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'form.html'));
});

app.post('/post', async (req, res) => {
  try {
    console.log("Données reçues :", req.body);
    const { regd_no, name, email, branch } = req.body;
    const user = new Users({
      regd_no,
      name,
      email,
      branch,
    });
    await user.save();
    console.log("Utilisateur enregistré :", user);
    res.send("Form submission successful");
  } catch (err) {
    console.error("Erreur lors de la soumission :", err);
    res.status(500).send("Erreur lors de la soumission du formulaire.");
  }
});


// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




