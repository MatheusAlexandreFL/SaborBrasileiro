import express from 'express';
import restaurantController from '../controller/restaurantController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/restaurantes', restaurantController.listar);
router.get('/restaurantes/:id', restaurantController.buscarPorId);
router.post('/restaurantes', auth, restaurantController.criar);
router.put('/restaurantes/:id', auth, restaurantController.atualizar);
router.delete('/restaurantes/:id', auth, restaurantController.remover);

export default router;
