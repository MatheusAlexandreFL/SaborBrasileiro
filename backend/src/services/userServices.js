import 'dotenv/config.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import database from '../database/exports.js';

async function cadastrarUsuario(dados) {
    const { nome, email, senha, tipoUsuario, cnpj, foto_perfil, nome_restaurante } = dados;

    const usuario = await database("usuarios").select("*").where({ email: email }).first();
    if (usuario) {
        throw new Error('Usuario já cadastrado');
    }

    const hash = await bcrypt.hash(senha, 10);
    const tipo = cnpj ? 'dono' : (tipoUsuario || 'cliente');
    const [userId] = await database("usuarios").insert({
        nome,
        email,
        senha: hash,
        tipoUsuario: tipo,
        cnpj,
        foto_perfil
    });

    if (tipo === 'dono') {
        await database("restaurantes").insert({
            usuario_id: userId,
            nome: nome_restaurante || nome,
            categoria: 'Outros',
            rua: 'Não informado',
            numero: 'S/N',
            bairro: 'Não informado',
            cidade: 'Não informado',
            estado: 'NI'
        });
    }
}

async function login(email, senha) {
   const usuario = await database("usuarios").select("*").where({ email: email }).first();
   
   if (!usuario) {
       throw new Error('Usuario não encontrado');
   }
   
   const isMatch = await bcrypt.compare(senha, usuario.senha);
   if (!isMatch) {
       throw new Error('Senha inválida');
   }
   
   const token = jwt.sign(
       { id: usuario.id, tipoUsuario: usuario.tipoUsuario, nome: usuario.nome },
       process.env.SECRET_KEY,
       { expiresIn: '1h' }
   );
   return { token, foto_perfil: usuario.foto_perfil };
}

async function getPerfil(userId) {
    const usuario = await database("usuarios")
        .select('id', 'nome', 'email', 'foto_perfil', 'tipoUsuario', 'cnpj')
        .where({ id: userId })
        .first();

    if (!usuario) {
        throw new Error('Usuário não encontrado');
    }

    if (usuario.tipoUsuario?.toLowerCase() === 'dono') {
        const restaurantes = await database("restaurantes")
            .select('id', 'nome', 'descricao', 'categoria', 'rua', 'numero', 'bairro', 'cep', 'cidade', 'estado', 'telefone', 'imagem_url')
            .where({ usuario_id: userId });
        if (restaurantes.length > 0) {
            usuario.restaurantes = restaurantes;
            usuario.restaurante_ids = restaurantes.map(r => r.id);
            // Manter as chaves singulares para não quebrar componentes que ainda não foram atualizados
            usuario.restaurante_id = restaurantes[0].id;
            usuario.restaurante = restaurantes[0];
        } else {
            usuario.restaurantes = [];
            usuario.restaurante_ids = [];
        }
    }

    return usuario;
}

async function updatePerfil(userId, dados) {
    const camposPermitidos = ['nome', 'foto_perfil', 'cnpj'];
    const dadosParaAtualizar = {};

    for (const campo of camposPermitidos) {
        if (dados[campo] !== undefined) {
            dadosParaAtualizar[campo] = dados[campo];
        }
    }

    if (dadosParaAtualizar.cnpj) {
        if (typeof dadosParaAtualizar.cnpj !== 'string' || dadosParaAtualizar.cnpj.length !== 14) {
            throw new Error('O CNPJ deve ter exatamente 14 caracteres numéricos.');
        }

        const cnpjExistente = await database("usuarios")
            .where({ cnpj: dadosParaAtualizar.cnpj })
            .whereNot({ id: userId })
            .first();
        if (cnpjExistente) {
            throw new Error('CNPJ já cadastrado por outro usuário');
        }
    }

    if (dadosParaAtualizar.cnpj) {
        dadosParaAtualizar.tipoUsuario = 'dono';
    }

    if (Object.keys(dadosParaAtualizar).length > 0) {
        await database("usuarios").where({ id: userId }).update(dadosParaAtualizar);
    }

    // A atualização de restaurantes agora é feita diretamente nos endpoints de restaurantes
    // devido ao suporte de múltiplos restaurantes por dono.

    return await getPerfil(userId);
}

async function updateSenha(userId, senhaAtual, novaSenha) {
    const usuario = await database("usuarios").select('senha').where({ id: userId }).first();

    if (!usuario) {
        throw new Error('Usuário não encontrado');
    }

    const isMatch = await bcrypt.compare(senhaAtual, usuario.senha);
    if (!isMatch) {
        throw new Error('Senha atual incorreta');
    }

    const hash = await bcrypt.hash(novaSenha, 10);
    await database("usuarios").where({ id: userId }).update({ senha: hash });

    return { message: 'Senha alterada com sucesso' };
}

async function deletarConta(userId) {
    const deletados = await database("usuarios").where({ id: userId }).del();
    if (deletados === 0) {
        throw new Error('Usuário não encontrado');
    }
    return { message: 'Conta excluída com sucesso' };
}

export default {
    login,
    getPerfil,
    updatePerfil,
    updateSenha,
    cadastrarUsuario,
    deletarConta
};
