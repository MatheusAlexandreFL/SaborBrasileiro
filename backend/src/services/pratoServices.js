import database from '../database/exports.js';

async function cadastrarPrato(nome, descricao, preco, foto, usuario_id, restaurante_id) {
    let restaurante;
    
    if (restaurante_id) {
        restaurante = await database('restaurantes').where({ id: restaurante_id, usuario_id: usuario_id }).first();
    } else {
        restaurante = await database('restaurantes').where({ usuario_id: usuario_id }).first();
    }
    
    if (!restaurante) {
        const usuario = await database('usuarios').where({ id: usuario_id }).first();
        if (usuario && usuario.tipoUsuario === 'dono') {
            const [newRestauranteId] = await database("restaurantes").insert({
                usuario_id: usuario_id,
                nome: usuario.nome,
                categoria: 'Outros',
                rua: 'Não informado',
                numero: 'S/N',
                bairro: 'Não informado',
                cidade: 'Não informado',
                estado: 'NI'
            });
            restaurante = { id: newRestauranteId };
        } else {
            throw new Error('Nenhum restaurante encontrado associado a este usuário.');
        }
    }

    const [pratoId] = await database('pratos').insert({
        nome,
        descricao,
        preco,
        foto_prato: foto,
        restaurante_id: restaurante.id
    });
    
    return pratoId;
}

async function atualizarPrato(id, nome, descricao, preco, foto, usuario_id) {
    const restauranteIds = await database('restaurantes').where({ usuario_id: usuario_id }).pluck('id');
    if (restauranteIds.length === 0) {
        throw new Error('Nenhum restaurante encontrado associado a este usuário.');
    }

    const prato = await database('pratos')
        .where({ id: id })
        .whereIn('restaurante_id', restauranteIds)
        .first();

    if (!prato) {
        throw new Error('Prato não encontrado ou não pertence ao seu restaurante.');
    }

    await database('pratos')
        .where({ id: id })
        .update({
            nome,
            descricao,
            preco,
            foto_prato: foto
        });
}

async function deletarPrato(id, usuario_id) {
    const restauranteIds = await database('restaurantes').where({ usuario_id: usuario_id }).pluck('id');
    if (restauranteIds.length === 0) {
        throw new Error('Nenhum restaurante encontrado associado a este usuário.');
    }

    const result = await database('pratos')
        .where({ id: id })
        .whereIn('restaurante_id', restauranteIds)
        .del();

    if (result === 0) {
        throw new Error('Prato não encontrado ou não pertence ao seu restaurante.');
    }
}

async function listarPratos(id_restaurante) {
    let query = database('pratos')
        .leftJoin('avaliacoes', 'pratos.id', 'avaliacoes.id_prato')
        .join('restaurantes', 'pratos.restaurante_id', '=', 'restaurantes.id')
        .select(
            'pratos.*', 
            'restaurantes.nome as restaurante_nome',
            database.raw('COALESCE(AVG(avaliacoes.nota), 0) as media_avaliacoes')
        )
        .groupBy('pratos.id', 'restaurantes.nome');

    if (id_restaurante) {
        query = query.where('pratos.restaurante_id', id_restaurante);
    }

    return await query;
}

async function buscarPrato(id) {
    return await database('pratos')
        .leftJoin('avaliacoes', 'pratos.id', 'avaliacoes.id_prato')
        .join('restaurantes', 'pratos.restaurante_id', '=', 'restaurantes.id')
        .where('pratos.id', id)
        .select(
            'pratos.*', 
            'restaurantes.nome as restaurante_nome',
            database.raw('COALESCE(AVG(avaliacoes.nota), 0) as media_avaliacoes')
        )
        .groupBy('pratos.id', 'restaurantes.nome')
        .first();
}

export default {
    cadastrarPrato,
    atualizarPrato,
    deletarPrato,
    listarPratos,
    buscarPrato
};
