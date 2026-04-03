const express = require('express');
const cors = require('cors');
const songsRouter = require('./routes/songs');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/songs', songsRouter);

app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;
