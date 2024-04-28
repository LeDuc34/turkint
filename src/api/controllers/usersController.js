// src/api/controllers/usersController.js
const User = require('../../models/Client'); // Adjust the path as necessary
const bcrypt = require('bcryptjs');
const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    const newUser = await User.create({ Email: email, Password: hashedPassword });
    res.status(201).send({ Client: newUser});
  } catch (error) {
  console.error(error); // Log the full error for server-side debugging
  if (error.name === 'ValidationError') {
    return res.status(400).send({ message: 'Validation error', errors: error.errors });
  }
  res.status(500).send({ message: 'An unexpected error occurred' });
}

};

module.exports = {
  registerUser,
};



