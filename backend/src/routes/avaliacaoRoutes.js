import express from 'express';
import auth from '../middleware/auth.js';
import validarAvaliacao from '../middleware/validarAvaliacao.js';
import avaliacaoController from '../controller/avaliacaoController.js';

const router = express.Router();

router.post('/', auth, validarAvaliacao, avaliacaoController.criarAvaliacao);
router.put('/:id', auth, validarAvaliacao, avaliacaoController.editarAvaliacao);
router.delete('/:id', auth, avaliacaoController.deletarAvaliacao);
router.get('/', auth, avaliacaoController.listarAvaliacoes);

export default router;