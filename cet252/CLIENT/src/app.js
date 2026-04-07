const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001';
const viewsDir = path.join(__dirname, 'views');

app.set('views', viewsDir);
app.set('view engine', 'ejs');
app.use(express.static(viewsDir));

app.get('/config', (_req, res) => {
  res.json({ apiBaseUrl: API_BASE_URL });
});

app.get('/', async (_req, res) => {
  let songs = [];
  let error = null;

  try {
    const response = await fetch(`${API_BASE_URL}/api/songs`);
    if (!response.ok) {
      throw new Error('Failed API response');
    }
    songs = await response.json();
  } catch {
    error = 'Unable to load songs from API. Please check the API server.';
  }

  res.render('index', { apiBaseUrl: API_BASE_URL, songs, error });
});

app.get('/index.html', (_req, res) => {
  res.sendFile(path.join(viewsDir, 'index.html'));
});

module.exports = app;
