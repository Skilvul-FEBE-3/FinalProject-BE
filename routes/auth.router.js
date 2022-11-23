const express = require('express');
const { Login, Register, Logout } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/register', Register);
router.post('/login', Login);
router.delete('/logout', Logout);

module.exports = router;
