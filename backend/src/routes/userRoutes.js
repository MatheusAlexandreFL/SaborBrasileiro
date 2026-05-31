import express from 'express';
import auth from '../middleware/auth.js';
import userController from '../controller/userController.js';

const router = express.Router();

router.post('/cadastrar', userController.cadastrarUsuario);
router.post('/login', userController.login);
router.get('/perfil', auth, userController.getPerfil);
router.put('/perfil', auth, userController.updatePerfil);
router.put('/perfil/senha', auth, userController.updateSenha);


export default router;