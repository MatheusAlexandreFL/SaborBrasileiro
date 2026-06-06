import database from '../database/exports.js';

const CAMPOS_PERMITIDOS = [
  'nome',
  'descricao',
  'categoria',
  'rua',
  'numero',
  'bairro',
  'cep',
  'cidade',
  'estado',
  'telefone',
  'imagem_url',
  'galeria',
];

function montarEnderecoCompleto(restaurante) {
  const { rua, numero, bairro, cidade, estado, cep } = restaurante;
  const partes = [rua, numero, bairro, cidade, estado].filter(Boolean);
  if (cep) partes.push(cep);
  return partes.join(', ');
}

function montarPayloadRestaurante(dados) {
  return CAMPOS_PERMITIDOS.reduce((payload, campo) => {
    if (dados[campo] !== undefined) {
      payload[campo] = dados[campo];
    }

    return payload;
  }, {});
}

function validarCamposObrigatorios(payload) {
  const obrigatorios = ['nome', 'categoria', 'rua', 'numero', 'bairro', 'cidade', 'estado'];
  const ausentes = obrigatorios.filter((campo) => !payload[campo]);

  if (ausentes.length > 0) {
    throw new Error(`Campos obrigatórios ausentes: ${ausentes.join(', ')}`);
  }
}

async function listar() {
  const restaurantes = await database('restaurantes')
    .leftJoin('avaliacoes', 'restaurantes.id', 'avaliacoes.id_restaurante')
    .select('restaurantes.*')
    .select(database.raw('COALESCE(AVG(avaliacoes.nota), 0) as nota'))
    .groupBy('restaurantes.id')
    .orderBy('restaurantes.nome');

  return restaurantes.map((r) => ({
    ...r,
    endereco_completo: montarEnderecoCompleto(r),
  }));
}

async function buscarPorId(id) {
  const restaurante = await database('restaurantes')
    .leftJoin('avaliacoes', 'restaurantes.id', 'avaliacoes.id_restaurante')
    .select('restaurantes.*')
    .select(database.raw('COALESCE(AVG(avaliacoes.nota), 0) as nota'))
    .where('restaurantes.id', id)
    .groupBy('restaurantes.id')
    .first();

  if (!restaurante) {
    throw new Error('Restaurante não encontrado');
  }

  restaurante.endereco_completo = montarEnderecoCompleto(restaurante);
  return restaurante;
}

async function criar(dados, usuarioId) {
  const payload = montarPayloadRestaurante(dados);
  validarCamposObrigatorios(payload);

  const [id] = await database('restaurantes').insert({
    ...payload,
    usuario_id: usuarioId,
  });

  return buscarPorId(id);
}

async function atualizar(id, dados, usuarioId) {
  const restaurante = await database('restaurantes')
    .where({ id, usuario_id: usuarioId })
    .first();

  if (!restaurante) {
    throw new Error('Você não tem permissão para atualizar este restaurante');
  }

  const payload = montarPayloadRestaurante(dados);

  if (Object.keys(payload).length === 0) {
    throw new Error('Nenhum campo válido para atualizar');
  }

  await database('restaurantes')
    .where({ id })
    .update(payload);

  return buscarPorId(id);
}

async function remover(id, usuarioId) {
  await buscarPorId(id);

  const removido = await database('restaurantes')
    .where({ id, usuario_id: usuarioId })
    .del();

  if (!removido) {
    throw new Error('Você não tem permissão para remover este restaurante');
  }
}

export default {
  listar,
  buscarPorId,
  criar,
  atualizar,
  remover,
};
