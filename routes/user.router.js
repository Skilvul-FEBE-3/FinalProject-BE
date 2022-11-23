const express = require('express');
const router = express.Router();

const {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.controller');
const { verifyToken, adminOnly } = require('../middleware/authUser');

router.get('/', verifyToken, adminOnly, getUsers);
router.get('/:id', verifyToken, adminOnly, getUserById);
router.post('/', verifyToken, adminOnly, addUser);
router.patch('/:id', verifyToken, adminOnly, updateUser);
router.delete('/:id', verifyToken, adminOnly, deleteUser);

module.exports = router;
