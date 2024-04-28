const express = require('express');
const next = require('next');
const sequelize = require('../config/database'); // Ensure this path is correct

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

// Define an asynchronous function to initialize the database and models
async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection to the PostgreSQL database successful.');

     

        // Consider using .sync({ force: false }) cautiously in development
        // and avoiding it in production environments.
        await sequelize.sync({ force: true }); // This synchronizes all models at once
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
    server.use('/api/users', usersRoutes);

    // Handling all other requests with Next.js
    server.get('*', (req, res) => {
        return handle(req, res);
    });


    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
