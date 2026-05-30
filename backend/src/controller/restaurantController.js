import restaurantService from '../services/restaurantServices.js';

function obterStatusErro(error) {
  if (error.message.includes('não encontrado')) {
    return 404;
  }

  if (error.message.includes('permissão')) {
    return 403;
  }

  return 400;
}

async function listar(req, res) {
  try {
    const restaurantes = await restaurantService.listar();

    res.json(restaurantes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function buscarPorId(req, res) {
  try {
    const restaurante = await restaurantService.buscarPorId(req.params.id);

    res.json(restaurante);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function criar(req, res) {
  try {
    const restaurante = await restaurantService.criar(req.body, req.usuarioId);

    res.status(201).json(restaurante);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function atualizar(req, res) {
  try {
    const restaurante = await restaurantService.atualizar(
      req.params.id,
      req.body,
      req.usuarioId,
    );

    res.json(restaurante);
  } catch (error) {
    const status = obterStatusErro(error);

    res.status(status).json({ error: error.message });
  }
}

async function remover(req, res) {
  try {
    await restaurantService.remover(req.params.id, req.usuarioId);

    res.status(204).send();
  } catch (error) {
    const status = obterStatusErro(error);

    res.status(status).json({ error: error.message });
  }
}

export default {
  listar,
  buscarPorId,
  criar,
  atualizar,
  remover,
};
