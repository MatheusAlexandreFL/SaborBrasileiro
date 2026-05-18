require('dotenv').config();
const jwt = require('jsonwebtoken');

function autenticacao(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!auth) {
            throw new Error('Token não fornecido');
        }
        const [, token] = auth.split(' ');
        jwt.verify(token, process.env.SECRET_KEY, (erro, decoded) => {
            if (erro) {
                throw new Error('Token inválido' + erro.message);
            }
            req.id = decoded.id;
        });
        next();
    } catch (e) {
        res.status(401).json({ erro: 'Token inválido. ' + e.message });
    }
}

module.exports = autenticacao;