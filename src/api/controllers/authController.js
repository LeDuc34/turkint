// api/controller/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Assume db is your database connection module
const db = require('../your-database-connection-module');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db.findUserByEmail(email);
        if (!user) {
            return res.status(401).send({ message: 'Login failed' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });
        res.send({ token });
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' });
    }
};
