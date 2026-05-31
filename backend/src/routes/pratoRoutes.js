import express from 'express';
import pratoController from '../controller/pratoController.js';
import auth from '../middleware/auth.js';
import validarPrato from '../middleware/validarPrato.js';

const router = express.Router();

router.post('/', auth, validarPrato, pratoController.cadastrar_prato);
router.put('/:id', auth, validarPrato, pratoController.atualizar_prato);
router.delete('/:id', auth, pratoController.deletar_prato);
router.get('/', auth, pratoController.listar_pratos);
router.get('/:id', auth, pratoController.buscar_prato);

export default router;
