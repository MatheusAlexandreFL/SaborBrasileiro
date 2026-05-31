import express from 'express';
import auth from '../middleware/auth.js';
import avaliacaoController from '../controller/avaliacaoController.js';

const router = express.Router();

router.post('/', auth, avaliacaoController.criar_avaliacao);
router.put('/', auth, avaliacaoController.editar_avaliacao);
router.delete('/', auth, avaliacaoController.deletar_avaliacao);
router.get('/', auth, avaliacaoController.listar_avaliacoes);

export default router;