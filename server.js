const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/anime-watch-site', { useNewUrlParser: true, useUnifiedTopology: true });

// Define anime schema
const animeSchema = new mongoose.Schema({
  title: String,
  description: String,
  genres: [String]
});

// Create anime model
const Anime = mongoose.model('Anime', animeSchema);

// API endpoint for fetching anime data
app.get('/api/anime', (req, res) => {
  Anime.find()
    .then(data => res.json(data))
    .catch(error => console.error(error));
});

// Start server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
