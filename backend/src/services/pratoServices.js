import database from '../database/exports.js';

async function cadastrar_prato(nome, descricao, preco, foto, usuario_id){
    const restaurante = await database('restaurantes').where({ usuario_id: usuario_id }).first();
    if (!restaurante) {
        throw new Error('Nenhum restaurante encontrado associado a este usuário.');
    }

    await database('pratos').insert({
        nome,
        descricao,
        preco,
        foto_prato: foto,
        restaurante_id: restaurante.id
    });
}

async function atualizar_prato(id, nome, descricao, preco, foto, usuario_id){
    const restaurante = await database('restaurantes').where({ usuario_id: usuario_id }).first();
    if (!restaurante) {
        throw new Error('Nenhum restaurante encontrado associado a este usuário.');
    }

    const result = await database('pratos')
        .where({ id: id, restaurante_id: restaurante.id })
        .update({
            nome,
            descricao,
            preco,
            foto_prato: foto
        });

    if (result === 0) {
        throw new Error('Prato não encontrado ou não pertence ao seu restaurante.');
    }
}

async function deletar_prato(id, usuario_id){
    const restaurante = await database('restaurantes').where({ usuario_id: usuario_id }).first();
    if (!restaurante) {
        throw new Error('Nenhum restaurante encontrado associado a este usuário.');
    }

    const result = await database('pratos')
        .where({ id: id, restaurante_id: restaurante.id })
        .del();

    if (result === 0) {
        throw new Error('Prato não encontrado ou não pertence ao seu restaurante.');
    }
}

async function listar_pratos(){
    return await database('pratos').select('*');
}

async function buscar_prato(id){
    return await database('pratos').where({ id: id }).select('*').first();
}

export default {
    cadastrar_prato,
    atualizar_prato,
    deletar_prato,
    listar_pratos,
    buscar_prato
};
