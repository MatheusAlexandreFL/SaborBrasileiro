require ("dotenv").config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const database = require('../database/exports');

async function login(email, senha){
    const usuario = await database("usuarios").select("*").where({ email: email }).first();
    if (!usuario) {
        throw new Error('Usuario não encontrado');
    }
    const isMatch = await bcrypt.compare(senha, usuario.senha);
    if (!isMatch) {
        throw new Error('Senha inválida');
    }
    const token = jwt.sign({ id: usuario.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    return token;
}

module.exports = {
    login,
};