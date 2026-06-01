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
    const [userId] = await database("usuarios").insert({
        nome,
        email,
        senha: hash,
        tipoUsuario,
        cnpj,
        foto_perfil
    });

    if (tipoUsuario === 'restaurante') {
        await database("restaurantes").insert({
            usuario_id: userId,
            nome: nome_restaurante || nome,
            categoria: 'Outros',
            endereco: 'Não informado',
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

    if (usuario.tipoUsuario?.toLowerCase() === 'restaurante' || usuario.tipoUsuario?.toLowerCase() === 'dono') {
        const restaurante = await database("restaurantes")
            .select('id', 'nome', 'descricao', 'categoria', 'endereco', 'cidade', 'estado', 'telefone', 'imagem_url')
            .where({ usuario_id: userId })
            .first();
        if (restaurante) {
            usuario.restaurante_id = restaurante.id;
            usuario.restaurante = restaurante;
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
        const cnpjExistente = await database("usuarios")
            .where({ cnpj: dadosParaAtualizar.cnpj })
            .whereNot({ id: userId })
            .first();
        if (cnpjExistente) {
            throw new Error('CNPJ já cadastrado por outro usuário');
        }
    }

    if (Object.keys(dadosParaAtualizar).length > 0) {
        await database("usuarios").where({ id: userId }).update(dadosParaAtualizar);
    }

    const usuario = await database("usuarios").select("tipoUsuario").where({ id: userId }).first();

    if (usuario && usuario.tipoUsuario === 'restaurante') {
        const camposPermitidosRest = ['nome_restaurante', 'descricao', 'categoria', 'endereco', 'cidade', 'estado', 'telefone', 'imagem_url'];
        const dadosRestaurante = {};

        for (const campo of camposPermitidosRest) {
            if (dados[campo] !== undefined) {
                if (campo === 'nome_restaurante') {
                    dadosRestaurante.nome = dados[campo] || "Não informado";
                } else {
                    dadosRestaurante[campo] = dados[campo];
                }
            }
        }

        if (Object.keys(dadosRestaurante).length > 0) {
            await database("restaurantes").where({ usuario_id: userId }).update(dadosRestaurante);
        }
    }

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
    cadastrarUsuario
};
