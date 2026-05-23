const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
// const auth = require('../middleware/auth'); // O auth está na branch feat-rota-autenticaco
router.post('/login', userController.login);

module.exports = router;

//const bcrypt = require('bcrypt');    testa a senha,gerando um hash
//router.get('/gerar-senha-teste', async (req, res) => {
   // const hash = await bcrypt.hash('123', 10);
   // res.send(hash);
//});
