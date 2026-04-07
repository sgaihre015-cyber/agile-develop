const { initializeDatabase, db } = require('./database');

initializeDatabase()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Database seeded successfully.');
    db.close((error) => {
      if (error) {
        // eslint-disable-next-line no-console
        console.error('Database close failed:', error.message);
        process.exit(1);
      }
      process.exit(0);
    });
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Database seed failed:', error.message);
    process.exit(1);
  });
