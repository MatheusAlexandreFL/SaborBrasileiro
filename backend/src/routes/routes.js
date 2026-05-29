const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// 👇 Importações necessárias para a rota de cadastro funcionar
const bcrypt = require('bcrypt');
// const db = require('../database/connection'); // IMPORTANTE: Descomente e ajuste o caminho do seu banco Knex aqui!

// const auth = require('../middleware/auth'); // O auth está na branch feat-rota-autenticaco

// Rota de Login
router.post('/login', userController.login);

// Rota de Cadastrar Teste (campos novos)
// Recebe os dados do Cadastro.jsx e lida com a regra de cliente e restaurante
router.post('/cadastrar-teste', async (req, res) => {
    try {
        const { nome, email, senha, tipoUsuario, cnpj } = req.body;
        
        // Criptografia da senha antes de salvar no banco
        const hash = await bcrypt.hash(senha, 10);
        
        // Insere na tabela usuarios 
        await db('usuarios').insert({
            nome,
            email,
            senha: hash,
            tipoUsuario,  
            cnpj: tipoUsuario === 'restaurante' ? cnpj : null
        });
        
        // Sucesso
        res.json({ message: 'Usuário cadastrado com sucesso.' });
    } catch (error) {
        // Falha, envia mensagem de erro para a tela para exibir para o usuário
        res.status(500).json({ error: error.message });
    }
});

// TESTE DE SENHA (Comentado)
// router.get('/gerar-senha-teste', async (req, res) => {
//     const hash = await bcrypt.hash('123', 10);
//     res.send(hash);
// });

// 👇 O module.exports TEM que ser a última linha do arquivo!
module.exports = router;