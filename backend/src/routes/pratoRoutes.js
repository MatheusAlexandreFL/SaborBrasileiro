import express from 'express';
import pratoController from '../controller/pratoController.js';
import auth from '../middleware/auth.js';
import validarPrato from '../middleware/validarPrato.js';

const router = express.Router();

router.post('/cadastrar-prato', auth, validarPrato, pratoController.cadastrar_prato);
router.put('/atualizar-prato/:id', auth, validarPrato, pratoController.atualizar_prato);
router.delete('/deletar-prato/:id', auth, pratoController.deletar_prato);
router.get('/listar-pratos', auth, pratoController.listar_pratos);
router.get('/buscar-prato/:id', auth, pratoController.buscar_prato);

export default router;
