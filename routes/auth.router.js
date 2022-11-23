const express = require('express');
const { Login, Register, RefreshToken, Logout } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/register', Register);
router.post('/login', Login);
router.get('/token', RefreshToken);
router.delete('/logout', Logout);

module.exports = router;
