const express = require('express');
const router = express.Router();
const pratoController = require('../controller/pratoController');
const autenticacao = require('../middleware/auth');

router.post('/cadastrar-prato', autenticacao, pratoController.cadastrar_prato);
router.put('/atualizar-prato/:id', autenticacao, pratoController.atualizar_prato);
router.delete('/deletar-prato/:id', autenticacao, pratoController.deletar_prato);
router.get('/listar-pratos', pratoController.listar_pratos);
router.get('/buscar-prato/:id', pratoController.buscar_prato);

module.exports = router;
