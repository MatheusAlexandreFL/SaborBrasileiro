import pratoService from '../services/pratoServices.js';
import { obterStatusErro } from '../utils/httpErrors.js';

async function cadastrarPrato(req, res) {
    try {
        const { nome, descricao, preco, foto, restaurante_id } = req.body;
        const usuario_id = req.id;
        const pratoId = await pratoService.cadastrarPrato(nome, descricao, preco, foto, usuario_id, restaurante_id);
        res.status(201).json({ message: 'Prato cadastrado com sucesso!', pratoId });
    } catch (error) {
        res.status(obterStatusErro(error)).json({ error: error.message });
    }
}

async function atualizarPrato(req, res) {
    try {
        const { id } = req.params;
        const { nome, descricao, preco, foto } = req.body;
        const usuario_id = req.id;
        await pratoService.atualizarPrato(id, nome, descricao, preco, foto, usuario_id);
        res.json({ message: 'Prato updated com sucesso!' }); // keeping consistent message structure
    } catch (error) {
        res.status(obterStatusErro(error)).json({ error: error.message });
    }
}

async function deletarPrato(req, res) {
    try {
        const { id } = req.params;
        const usuario_id = req.id;
        await pratoService.deletarPrato(id, usuario_id);
        res.json({ message: 'Prato deletado com sucesso!' });
    } catch (error) {
        res.status(obterStatusErro(error)).json({ error: error.message });
    }
}

async function listarPratos(req, res) {
    try {
        const id_restaurante = req.query.id_restaurante;
        const pratos = await pratoService.listarPratos(id_restaurante);
        res.json(pratos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function buscarPrato(req, res) {
    try {
        const { id } = req.params;
        const prato = await pratoService.buscarPrato(id);
        res.json(prato);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default {
    cadastrarPrato,
    atualizarPrato,
    deletarPrato,
    listarPratos,
    buscarPrato
};