import database from '../database/exports.js';

async function criar_avaliacao(dados) {
    const { id_usuario, id_restaurante, id_prato, nota, comentario } = dados;

    if (id_restaurante) {
        const restaurante = await database("restaurantes").where({ id: id_restaurante }).first();
        if (restaurante && String(restaurante.usuario_id) === String(id_usuario)) {
            throw new Error('Você não pode avaliar o seu próprio estabelecimento ou prato.');
        }
    }

    await database("avaliacoes").insert({
        id_usuario: id_usuario,
        id_prato: id_prato,
        id_restaurante: id_restaurante,
        nota: nota,
        comentario: comentario
    });

    return { message: 'Avaliação criada com sucesso' };
}

async function listar_avaliacoes(filtros) {
    let query = database("avaliacoes")
        .join('usuarios', 'avaliacoes.id_usuario', 'usuarios.id')
        .select(
            'avaliacoes.*',
            'usuarios.nome as usuario_nome',
            'usuarios.foto_perfil as usuario_foto'
        );

    if (filtros.id_restaurante) {
        query = query.where('avaliacoes.id_restaurante', filtros.id_restaurante);
        if (filtros.apenas_restaurante) {
            query = query.whereNull('avaliacoes.id_prato');
        }
    }
    if (filtros.id_prato) {
        query = query.where('avaliacoes.id_prato', filtros.id_prato);
    }

    return await query;
}

async function editar_avaliacao(id_avaliacao, id_usuario, dados) {
    const { nota, comentario } = dados;

    const result = await database("avaliacoes").where({ id: id_avaliacao, id_usuario: id_usuario }).update({
        nota: nota,
        comentario: comentario
    });

    if (result === 0) {
        throw new Error('Avaliação não encontrada ou você não tem permissão para editá-la.');
    }

    return { message: 'Avaliação editada com sucesso' };
}

async function deletar_avaliacao(id_avaliacao, id_usuario) {
    const result = await database("avaliacoes").where({ id: id_avaliacao, id_usuario: id_usuario }).delete();

    if (result === 0) {
        throw new Error('Avaliação não encontrada ou você não tem permissão para deletá-la.');
    }

    return { message: 'Avaliação deletada com sucesso' };
}

export default {
    criar_avaliacao,
    editar_avaliacao,
    deletar_avaliacao,
    listar_avaliacoes
}
