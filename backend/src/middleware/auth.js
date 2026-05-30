import 'dotenv/config.js';
import jwt from 'jsonwebtoken';

function autenticacao(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new Error('Token não fornecido');
        }
        const [tipo, token] = authHeader.split(' ');
        if (tipo !== 'Bearer' || !token) {
            throw new Error('Formato do token inválido');
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.id = decoded.id;
        req.usuarioId = decoded.id;
        req.usuario = decoded;
        next();
    } catch (e) {
        res.status(401).json({ erro: 'Token inválido. ' + e.message });
    }
}

export default autenticacao;
