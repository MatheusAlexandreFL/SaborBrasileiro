const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const auth = require('../middleware/auth');

// Rotas públicas
router.post('/login', userController.login);

// Rotas protegidas (requerem autenticação JWT)
router.get('/perfil', auth, userController.getPerfil);
router.put('/perfil', auth, userController.updatePerfil);
router.put('/perfil/senha', auth, userController.updateSenha);

module.exports = router;
