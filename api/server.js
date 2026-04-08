const path = require('node:path');
const express = require('express');
const cors = require('cors');
const musicRouter = require('./routes/music');
const { initDb } = require('./db/database');

initDb();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/music', musicRouter);
app.use('/docs', express.static(path.join(__dirname, 'docs')));

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

if (require.main === module) {
  const port = Number(process.env.PORT) || 3000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

module.exports = app;
