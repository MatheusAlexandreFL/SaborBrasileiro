import express from 'express';
import userController from '../controller/userController.js';
import auth from '../middleware/auth.js';
import bcrypt from 'bcrypt';
import db from '../database/exports.js';
import pratoRoutes from './pratoRoutes.js';
import restaurantRoutes from './restaurantRoutes.js';

const router = express.Router();


router.post('/login', userController.login);
router.use(pratoRoutes);
router.use(restaurantRoutes);


router.get('/perfil', auth, userController.getPerfil);
router.put('/perfil', auth, userController.updatePerfil);
router.put('/perfil/senha', auth, userController.updateSenha);


router.post('/cadastrar-teste', async (req, res) => {
    try {
        const { nome, email, senha, tipoUsuario, cnpj } = req.body;


        const hash = await bcrypt.hash(senha, 10);


        await db('usuarios').insert({
            nome,
            email,
            senha: hash,
            tipoUsuario,
            cnpj: tipoUsuario === 'restaurante' ? cnpj : null
        });


        res.json({ message: 'Usuário cadastrado com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
