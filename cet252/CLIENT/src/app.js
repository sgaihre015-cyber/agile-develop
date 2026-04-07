const express = require('express');
const path = require('path');

const app = express();
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001';
const viewsDir = path.join(__dirname, 'views');

app.use(express.static(viewsDir));

app.get('/config', (_req, res) => {
  res.json({ apiBaseUrl: API_BASE_URL });
});

app.get('/', (_req, res) => {
  res.sendFile(path.join(viewsDir, 'index.html'));
});

app.get('/index.html', (_req, res) => {
  res.sendFile(path.join(viewsDir, 'index.html'));
});

module.exports = app;
