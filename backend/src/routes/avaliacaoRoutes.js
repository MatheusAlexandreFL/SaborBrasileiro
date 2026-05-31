import express from 'express';
import auth from '../middleware/auth.js';
import validarAvaliacao from '../middleware/validarAvaliacao.js';
import avaliacaoController from '../controller/avaliacaoController.js';

const router = express.Router();

router.post('/', auth, validarAvaliacao, avaliacaoController.criar_avaliacao);
router.put('/:id', auth, validarAvaliacao, avaliacaoController.editar_avaliacao);
router.delete('/:id', auth, avaliacaoController.deletar_avaliacao);
router.get('/', auth, avaliacaoController.listar_avaliacoes);

export default router;