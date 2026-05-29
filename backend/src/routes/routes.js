const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
// const auth = require('../middleware/auth'); // O auth está na branch feat-rota-autenticaco
router.post('/login', userController.login);

<<<<<<< Updated upstream
module.exports = router;
=======
// rota de cadastrar teste (campos novos)
//recebe os dados do Cadastro.jsx e lida com a regra de cliente e restaurante
router.post('/cadastrar-teste', async (req, res) => {
    try {
        const { nome, email, senha, tipoUsuario, cnpj } = req.body;
        //criptografia da senha antes de salvar no banco
        const hash = await bcrypt.hash(senha, 10);
        
        //insere na tabela usuarios 
        await db('usuarios').insert({
            nome,
            email,
            senha: hash,
            tipoUsuario,  
            cnpj: tipoUsuario === 'restaurante' ? cnpj : null        });
        //sucesso
        res.json({ message: 'Usuário cadastrado com sucesso.' });
    } catch (error) {
        //falha, envia mensagem de erro para a tela para exibir para o usuário
        res.status(500).json({ error: error.message });
    }
});
>>>>>>> Stashed changes

//const bcrypt = require('bcrypt');    testa a senha,gerando um hash
//router.get('/gerar-senha-teste', async (req, res) => {
   // const hash = await bcrypt.hash('123', 10);
   // res.send(hash);
//});