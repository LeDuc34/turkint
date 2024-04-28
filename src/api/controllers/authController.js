const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Client = require('../../models/Client');

const loginUser = async (req, res) => {
    //console.log(req.body); 
    const { email, password } = req.body;
    try {
        const user = await Client.findOne({where:{Email: email}});
        if (!user) {
            return res.status(401).send({ message: 'User not found !' });
        }

        const isMatch = await bcrypt.compare(password, user.Password);
        if (!isMatch) {
            return res.status(401).send({ message: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });
        res.send({ token, ClientID : user.ClientID});
        
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' });
        console.error(error);
    }
};

exports.loginUser = loginUser;