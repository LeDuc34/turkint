const express = require('express');
const next = require('next');
const sequelize = require('../config/database');
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const Commande = require('../src/models/Commande.js');
const Client = require('../src/models/Client'); 
const Article = require('../src/models/Commande.js');
const Basket = require('../src/models/Basket.js'); 

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the PostgreSQL database successful.');
    await sequelize.sync();
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database or synchronize models:', error);
    process.exit(1); // Exit the process with an error code
  }
}

nextApp.prepare().then(async () => {
  const server = express();
  server.use(express.json()); // Middleware to parse JSON bodies

  // Initialize database and models
  await initializeDatabase();

  // Define custom API routes
  const usersRoutes = require('./api/routes/usersRoutes.js');
  const basketsRoutes = require('./api/routes/basketsRoutes');
  const ordersRoutes = require('./api/routes/ordersRoutes');
  const paymentRoutes = require('./api/routes/paymentRoutes');
  server.use('/api/users', usersRoutes);
  server.use('/api/baskets', basketsRoutes);
  server.use('/api/orders', ordersRoutes);
  server.use('/api/payments',paymentRoutes);

  // Handling all other requests with Next.js
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
}).catch((err) => {
  console.error('Failed to initialize server:', err);
  process.exit(1); // Exit the process with an error code
});
