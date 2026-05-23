const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
// const auth = require('../middleware/auth'); // O auth está na branch feat-rota-autenticaco
router.post('/login', userController.login);

module.exports = router;
