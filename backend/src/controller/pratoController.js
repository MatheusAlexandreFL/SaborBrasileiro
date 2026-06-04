import pratoService from '../services/pratoServices.js';

function obterStatusErro(error) {
    if (error.message.includes('não encontrado') || error.message.includes('não encontrada')) {
        return 404;
    }
    if (error.message.includes('não pertence')) {
        return 403;
    }
    return 400;
}

async function cadastrar_prato(req, res) {
    try {
        const { nome, descricao, preco, foto, restaurante_id } = req.body;
        const usuario_id = req.id;
        const pratoId = await pratoService.cadastrar_prato(nome, descricao, preco, foto, usuario_id, restaurante_id);
        res.status(201).json({ message: 'Prato cadastrado com sucesso!', pratoId });
    } catch (error) {
        res.status(obterStatusErro(error)).json({ error: error.message });
    }
}

async function atualizar_prato(req, res) {
    try {
        const { id } = req.params;
        const { nome, descricao, preco, foto } = req.body;
        const usuario_id = req.id;
        await pratoService.atualizar_prato(id, nome, descricao, preco, foto, usuario_id);
        res.json({ message: 'Prato atualizado com sucesso!' });
    } catch (error) {
        res.status(obterStatusErro(error)).json({ error: error.message });
    }
}

async function deletar_prato(req, res) {
    try {
        const { id } = req.params;
        const usuario_id = req.id;
        await pratoService.deletar_prato(id, usuario_id);
        res.json({ message: 'Prato deletado com sucesso!' });
    } catch (error) {
        res.status(obterStatusErro(error)).json({ error: error.message });
    }
}

async function listar_pratos(req, res) {
    try {
        const id_restaurante = req.query.id_restaurante;
        const pratos = await pratoService.listar_pratos(id_restaurante);
        res.json(pratos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function buscar_prato(req, res) {
    try {
        const { id } = req.params;
        const prato = await pratoService.buscar_prato(id);
        res.json(prato);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default {
    cadastrar_prato,
    atualizar_prato,
    deletar_prato,
    listar_pratos,
    buscar_prato
};