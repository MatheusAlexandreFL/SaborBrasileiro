const express = require('express');
const router = express.Router(); // nao esquecer de exportar o router no final do arquivo
const userController = require('../controller/userController');

const bcrypt = require('bcrypt');
const db = require('../database/exports'); // Importação do banco de dados correta resgatada!

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
            cnpj: tipoUsuario === 'restaurante' ? cnpj : null // Lógica de CNPJ correta mantida!
        });
        
        // Sucesso
        res.json({ message: 'Usuário cadastrado com sucesso.' });
    } catch (error) {
        // Falha, envia mensagem de erro para o front-end para exibir para o usuário
        res.status(500).json({ error: error.message });
    }
});

// 👇 O module.exports TEM que ser a última linha do arquivo!
module.exports = router;