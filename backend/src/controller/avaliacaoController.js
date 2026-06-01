import avaliacaoService from '../services/avaliacaoService.js';

function obterStatusErro(error) {
    if (error.message.includes('não encontrada')) {
        return 404;
    }
    if (error.message.includes('permissão')) {
        return 403;
    }
    return 400;
}

async function criar_avaliacao(req, res) {
    try {
        const { id_restaurante, id_prato, nota, comentario } = req.body;
        const id_usuario = req.id;
        const avaliacao = await avaliacaoService.criar_avaliacao({ id_usuario, id_restaurante, id_prato, nota, comentario });
        res.status(201).json(avaliacao);
    } catch (error) {
        res.status(obterStatusErro(error)).json({ error: error.message });
    }
}

async function listar_avaliacoes(req, res) {
    try {
        const { id_restaurante, id_prato, apenas_restaurante } = req.query;
        if (!id_restaurante && !id_prato) {
            return res.status(400).json({ error: 'O ID do restaurante ou do prato é obrigatório na busca.' });
        }
        const avaliacoes = await avaliacaoService.listar_avaliacoes({ 
            id_restaurante, 
            id_prato,
            apenas_restaurante: apenas_restaurante === 'true'
        });
        res.json(avaliacoes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function editar_avaliacao(req, res) {
    try {
        const { id } = req.params;
        const { nota, comentario } = req.body;
        const id_usuario = req.id;
        const avaliacao = await avaliacaoService.editar_avaliacao(id, id_usuario, { nota, comentario });
        res.json(avaliacao);
    } catch (error) {
        res.status(obterStatusErro(error)).json({ error: error.message });
    }
}

async function deletar_avaliacao(req, res) {
    try {
        const { id } = req.params;
        const id_usuario = req.id;
        const avaliacao = await avaliacaoService.deletar_avaliacao(id, id_usuario);
        res.json(avaliacao);
    } catch (error) {
        res.status(obterStatusErro(error)).json({ error: error.message });
    }
}

export default {
    criar_avaliacao,
    editar_avaliacao,
    deletar_avaliacao,
    listar_avaliacoes
}

