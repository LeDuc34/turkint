const jwt = require('jsonwebtoken');

const tokenVerification = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Assuming the token is sent as a 'Bearer' token

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Replace 'YOUR_SECRET_KEY' with your actual secret key stored securely
    const decoded = jwt.verify(token,'your_secret_key'); //process.env.JWT_SECRET
    res.status(200).json({ valid: true, decoded });
  } catch (error) {
    res.status(401).json({ valid: false, message: 'Invalid token' });
  }
}

module.exports = { tokenVerification };
