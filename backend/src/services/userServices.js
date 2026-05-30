import 'dotenv/config.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import database from '../database/exports.js';

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

    if (Object.keys(dadosParaAtualizar).length === 0) {
        throw new Error('Nenhum dado para atualizar');
    }

    // Validar unicidade do CNPJ se fornecido
    if (dadosParaAtualizar.cnpj) {
        const cnpjExistente = await database("usuarios")
            .where({ cnpj: dadosParaAtualizar.cnpj })
            .whereNot({ id: userId })
            .first();
        if (cnpjExistente) {
            throw new Error('CNPJ já cadastrado por outro usuário');
        }
    }

    await database("usuarios").where({ id: userId }).update(dadosParaAtualizar);

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

export default {
    login,
    getPerfil,
    updatePerfil,
    updateSenha,
};
