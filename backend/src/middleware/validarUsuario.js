function validarUsuario(req, res, next) {
    const { nome, email, senha, tipoUsuario, cnpj } = req.body;

    if (!nome || typeof nome !== 'string' || nome.trim() === '') {
        return res.status(400).json({ error: 'O nome é obrigatório e deve ser um texto válido.' });
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
        return res.status(400).json({ error: 'O e-mail é obrigatório e deve ser um e-mail válido.' });
    }

    if (!senha || typeof senha !== 'string' || senha.length < 6) {
        return res.status(400).json({ error: 'A senha é obrigatória e deve ter pelo menos 6 caracteres.' });
    }

    if (cnpj !== undefined && cnpj !== null) {
        if (typeof cnpj !== 'string' || cnpj.trim() === '' || cnpj.length !== 14) {
            return res.status(400).json({ error: 'O CNPJ deve ter exatamente 14 caracteres numéricos.' });
        }
    }

    if (tipoUsuario && typeof tipoUsuario === 'string') {
        if (tipoUsuario !== 'cliente' && tipoUsuario !== 'dono') {
            return res.status(400).json({ error: 'O tipo de usuário deve ser "cliente" ou "dono".' });
        }
        
        if (tipoUsuario === 'dono' && !cnpj) {
            return res.status(400).json({ error: 'O CNPJ é obrigatório para donos.' });
        }
    }

    next();
}

export default validarUsuario;
