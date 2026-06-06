import express from 'express';
import auth from '../middleware/auth.js';
import validarUsuario from '../middleware/validarUsuario.js';
import userController from '../controller/userController.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // limite de 100 requisições por IP
  message: { erro: 'Muitas tentativas de autenticação originadas deste IP, por favor tente novamente após 15 minutos.' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/cadastrar', authLimiter, validarUsuario, userController.cadastrarUsuario);
router.post('/login', authLimiter, userController.login);
router.get('/perfil', auth, userController.getPerfil);
router.put('/perfil', auth, userController.updatePerfil);
router.put('/perfil/senha', auth, userController.updateSenha);
router.delete('/perfil', auth, userController.deletarConta);

export default router;