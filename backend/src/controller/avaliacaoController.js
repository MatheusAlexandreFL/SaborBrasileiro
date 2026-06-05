import avaliacaoService from '../services/avaliacaoService.js';
import { obterStatusErro } from '../utils/httpErrors.js';

async function criarAvaliacao(req, res) {
    try {
        const { id_restaurante, id_prato, nota, comentario } = req.body;
        const id_usuario = req.id;
        const avaliacao = await avaliacaoService.criarAvaliacao({ id_usuario, id_restaurante, id_prato, nota, comentario });
        res.status(201).json(avaliacao);
    } catch (error) {
        res.status(obterStatusErro(error)).json({ error: error.message });
    }
}

async function listarAvaliacoes(req, res) {
    try {
        const { id_restaurante, id_prato, apenas_restaurante } = req.query;

        const avaliacoes = await avaliacaoService.listarAvaliacoes({
            id_restaurante,
            id_prato,
            apenas_restaurante: apenas_restaurante === 'true'
        });
        res.json(avaliacoes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function editarAvaliacao(req, res) {
    try {
        const { id } = req.params;
        const { nota, comentario } = req.body;
        const id_usuario = req.id;
        const avaliacao = await avaliacaoService.editarAvaliacao(id, id_usuario, { nota, comentario });
        res.json(avaliacao);
    } catch (error) {
        res.status(obterStatusErro(error)).json({ error: error.message });
    }
}

async function deletarAvaliacao(req, res) {
    try {
        const { id } = req.params;
        const id_usuario = req.id;
        const avaliacao = await avaliacaoService.deletarAvaliacao(id, id_usuario);
        res.json(avaliacao);
    } catch (error) {
        res.status(obterStatusErro(error)).json({ error: error.message });
    }
}

export default {
    criarAvaliacao,
    editarAvaliacao,
    deletarAvaliacao,
    listarAvaliacoes
};
