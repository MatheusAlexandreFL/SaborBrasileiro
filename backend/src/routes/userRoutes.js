import express from 'express';
import auth from '../middleware/auth.js';
import validarUsuario from '../middleware/validarUsuario.js';
import userController from '../controller/userController.js';

const router = express.Router();

router.post('/cadastrar', validarUsuario, userController.cadastrarUsuario);
router.post('/login', userController.login);
router.get('/perfil', auth, userController.getPerfil);
router.put('/perfil', auth, userController.updatePerfil);
router.put('/perfil/senha', auth, userController.updateSenha);
router.delete('/perfil', auth, userController.deletarConta);


export default router;