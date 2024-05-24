const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Client = require('../../models/Client');

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Client.findOne({ where: { Email: email } });
        if (!user) {
            return res.status(401).send({ message: 'User not found!' });
        }

        const isMatch = await bcrypt.compare(password, user.Password);
        if (!isMatch) {
            return res.status(401).send({ message: 'Invalid password' });
        }

        // Generate JWT token with user role
        const token = jwt.sign(
            { userId: user.ClientID, role: user.Role }, // Include role in the payload
            'your_secret_key', // Replace with process.env.JWT_SECRET in production
            { expiresIn: '1h' }
        );

        res.send({ token, ClientID: user.ClientID, Role: user.Role});
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' });
        console.error(error);
    }
};

exports.loginUser = loginUser;
