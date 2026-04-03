const express = require('express');
const fetch = require('node-fetch');

const app = express();
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001';

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.get('/', async (_req, res) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/songs`);
    if (!response.ok) {
      throw new Error('Failed API response');
    }

    const songs = await response.json();
    res.render('index', { songs, error: null, apiBaseUrl: API_BASE_URL });
  } catch {
    res.status(502).render('index', {
      songs: [],
      error: 'Unable to load songs from API. Please check the API server.',
      apiBaseUrl: API_BASE_URL
    });
  }
});

module.exports = app;
