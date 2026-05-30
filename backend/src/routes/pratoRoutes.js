const express = require('express');
const router = express.Router();
const pratoController = require('../controller/pratoController');
const autenticacao = require('../middleware/auth');
const validarPrato = require('../middleware/validarPrato');

router.post('/cadastrar-prato', autenticacao, validarPrato, pratoController.cadastrar_prato);
router.put('/atualizar-prato/:id', autenticacao, validarPrato, pratoController.atualizar_prato);
router.delete('/deletar-prato/:id', autenticacao, pratoController.deletar_prato);
router.get('/listar-pratos', autenticacao, pratoController.listar_pratos);
router.get('/buscar-prato/:id', autenticacao, pratoController.buscar_prato);

module.exports = router;
