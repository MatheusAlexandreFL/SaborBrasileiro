const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const db = require('../database/exports');

// Rotas públicas
router.post('/login', userController.login);

// Rotas protegidas (requerem autenticação JWT)
router.get('/perfil', auth, userController.getPerfil);
router.put('/perfil', auth, userController.updatePerfil);
router.put('/perfil/senha', auth, userController.updateSenha);

// rota de cadastrar teste (campos novos)
//recebe os dados do Cadastro.jsx e lida com a regra de cliente e restaurante
router.post('/cadastrar-teste', async (req, res) => {
    try {
        const { nome, email, senha, cpf, tipoUsuario, cnpj } = req.body;
        //criptografia da senha antes de salvar no banco
        const hash = await bcrypt.hash(senha, 10);
        
        //insere na tabela usuarios 
        await db('usuarios').insert({
            nome,
            email,
            cpf,          
            senha: hash,
            tipoUsuario,  
            cnpj          
        });
        //sucesso
        res.json({ message: 'Usuário cadastrado com sucesso.' });
    } catch (error) {
        //falha, envia mensagem de erro para o front-end para exibir para o usuário
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;