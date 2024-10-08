// src/api/controllers/usersController.js
const User = require('../../models/Client'); // Adjust the path as necessary
const bcrypt = require('bcryptjs');
const Client = require('../../models/Client');

const registerUser = async (req, res) => {
  try {
    const {email, password ,username} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    const newUser = await User.create({ Email: email, Password: hashedPassword,Username:username });
    res.status(201).send({ Client: newUser});
  } catch (error) {
  console.error(error); // Log the full error for server-side debugging
  if (error.name === 'ValidationError') {
    return res.status(400).send({ message: 'Validation error', errors: error.errors });
  }
  res.status(500).send({ message: 'An unexpected error occurred' });
}

};


const displayUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (error) {
    console.error('Failed to fetch users:', error);
    res.status(500).send([]); // Send an empty array on error
  }
};

const updateRole = async (req, res) => {
  try {
    const { ClientID, Role } = req.body;
    const user = await User.findByPk(ClientID);
    if (!user) {
      return res.status(404).send({ message: 'Utilisateur non trouvé' });
    }
    user.Role = Role;
    await user.save();
    res.status(200).send({ Client: user });
  }catch (error) {
    console.error('Impossible de mettre à jour le rôle:', error);
    res.status(500).send({ message: 'Erreur' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { ClientID } = req.body;
    console.log(ClientID);
    const user = await User.findByPk(ClientID);
    if (!user) {
      return res.status(404).send({ message: 'Utilisateur non trouvé' });
    }
    res.status(200).send({ message: 'User deleted successfully' });
  }
  catch (error) {
    console.error('Failed to delete user:', error);
    res.status(500).send({ message: 'An unexpected error occurred' });
  }
}
const getRole = async (req, res) => {
  try {
    const { ClientID } = req.body;
    const user = await User.findByPk(ClientID);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send({ Role: user.Role });
  }
  catch (error) {
    console.error('Failed to get user role:', error);
    res.status(500).send({ message: 'An unexpected error occurred' });
  }
};

const getUser = async (req, res) => {
  try {
    const { ClientID } = req.body;
    const user = await Client.findByPk(ClientID);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send(user);
  } catch (error) {
    console.error('Failed to fetch user:', error);
    res.status(500).send({ message: 'An unexpected error occurred' });
  }
};


module.exports = {
  registerUser,
  displayUsers,
  updateRole,
  deleteUser,
  getRole,
  getUser
};



