const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  verifyToken: (req, res, next) => {
    // get token
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    // verify token
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) return res.sendStatus(403);
      req.session.email = decoded.email;
      next();
    });
  },
  adminOnly: async (req, res, next) => {
    const user = await User.findOne({
      _id: req.session.userId,
      email: req.session.email,
    });
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });
    if (user.role != 'admin')
      return res.status(403).json({ message: 'Akses terlarang' });
    next();
  },
};
