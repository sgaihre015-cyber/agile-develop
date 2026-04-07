const express = require('express');
const path = require('path');

const app = express();
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001';

app.get('/config', (_req, res) => {
  res.json({ apiBaseUrl: API_BASE_URL });
});

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

module.exports = app;
