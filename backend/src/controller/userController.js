import userService from '../services/userServices.js';

async function login(req, res) {
    try {   
        const { email, senha } = req.body; 
        const { token, foto_perfil } = await userService.login(email, senha); 
        
        res.json({ token, foto_perfil });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

async function getPerfil(req, res) {
    try {
        const usuario = await userService.getPerfil(req.id);
        res.json(usuario);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

async function updatePerfil(req, res) {
    try {
        const usuarioAtualizado = await userService.updatePerfil(req.id, req.body);
        res.json(usuarioAtualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function updateSenha(req, res) {
    try {
        const { senhaAtual, novaSenha } = req.body;

        if (!senhaAtual || !novaSenha) {
            return res.status(400).json({ error: 'Senha atual e nova senha são obrigatórias' });
        }

        if (novaSenha.length < 6) {
            return res.status(400).json({ error: 'A nova senha deve ter pelo menos 6 caracteres' });
        }

        const resultado = await userService.updateSenha(req.id, senhaAtual, novaSenha);
        res.json(resultado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export default {
    login,
    getPerfil,
    updatePerfil,
    updateSenha,
};