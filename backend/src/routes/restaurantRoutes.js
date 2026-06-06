import express from 'express';
import restaurantController from '../controller/restaurantController.js';
import auth from '../middleware/auth.js';
import validarRestaurante from '../middleware/validarRestaurante.js';

const router = express.Router();

router.get('/', restaurantController.listar);
router.get('/:id', restaurantController.buscarPorId);
router.post('/', auth, validarRestaurante, restaurantController.criar);
router.put('/:id', auth, validarRestaurante, restaurantController.atualizar);
router.delete('/:id', auth, restaurantController.remover);

export default router;
