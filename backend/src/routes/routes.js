const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const pratoRoutes = require('./pratoRoutes');
router.post('/login', userController.login);
router.use(pratoRoutes);

const bcrypt = require('bcrypt');
const db = require('../database/exports');

router.post('/cadastrar-teste', async (req, res) => {
   try {
       const { nome, email, senha } = req.body;
       const hash = await bcrypt.hash(senha, 10);
        await db('usuarios').insert({
          nome,
            email,
            senha: hash,
            tipoUsuario: 'cliente'
        });
        res.json({ message: 'Usuário cadastrado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;
