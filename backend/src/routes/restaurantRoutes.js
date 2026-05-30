const express = require('express');
const restaurantController = require('../controller/restaurantController');
const autenticacao = require('../middleware/auth');

const router = express.Router();

router.get('/restaurantes', restaurantController.listar);
router.get('/restaurantes/:id', restaurantController.buscarPorId);
router.post('/restaurantes', autenticacao, restaurantController.criar);
router.put('/restaurantes/:id', autenticacao, restaurantController.atualizar);
router.delete('/restaurantes/:id', autenticacao, restaurantController.remover);

module.exports = router;
