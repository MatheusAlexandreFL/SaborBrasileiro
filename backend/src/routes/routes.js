const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const pratoController = require('../controller/pratoController');
const autenticacao = require('../middleware/auth');
router.post('/login', userController.login);
router.post('/cadastrar-prato', autenticacao, pratoController.cadastrar_prato);
router.put('/atualizar-prato/:id', autenticacao, pratoController.atualizar_prato);
router.delete('/deletar-prato/:id', autenticacao, pratoController.deletar_prato);
router.get('/listar-pratos', pratoController.listar_pratos);
router.get('/buscar-prato/:id', pratoController.buscar_prato);
//const bcrypt = require('bcrypt');
//const db = require('../database/exports');

//router.post('/cadastrar-teste', async (req, res) => {
  //  try {
      //  const { nome, email, senha } = req.body;
       // const hash = await bcrypt.hash(senha, 10);
        //await db('usuarios').insert({
          //  nome,
            //email,
            //senha: hash,
            //tipoUsuario: 'cliente'
        //});
        //res.json({ message: 'Usuário cadastrado com sucesso!' });
    //} catch (error) {
    //    res.status(500).json({ error: error.message });
    //}
//});

module.exports = router;
