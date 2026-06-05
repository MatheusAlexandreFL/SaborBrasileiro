import express from 'express';
import pratoController from '../controller/pratoController.js';
import auth from '../middleware/auth.js';
import validarPrato from '../middleware/validarPrato.js';

const router = express.Router();

router.post('/', auth, validarPrato, pratoController.cadastrarPrato);
router.put('/:id', auth, validarPrato, pratoController.atualizarPrato);
router.delete('/:id', auth, pratoController.deletarPrato);
router.get('/', pratoController.listarPratos);
router.get('/:id', pratoController.buscarPrato);

export default router;
