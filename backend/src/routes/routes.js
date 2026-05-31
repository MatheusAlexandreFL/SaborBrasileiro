import express from 'express';
import pratoRoutes from './pratoRoutes.js';
import restaurantRoutes from './restaurantRoutes.js';
import userRoutes from './userRoutes.js';
import avaliacaoRoutes from './avaliacaoRoutes.js';
const router = express.Router();

router.use('/usuarios', userRoutes);
router.use('/restaurantes', restaurantRoutes);
router.use('/pratos', pratoRoutes);
router.use('/avaliacoes', avaliacaoRoutes);

export default router;
