function validarPrato(req, res, next) {
    const { nome, descricao, preco } = req.body;

    if (!nome || typeof nome !== 'string' || nome.trim() === '') {
        return res.status(400).json({ error: 'O nome do prato é obrigatório e deve ser um texto válido.' });
    }

    if (!descricao || typeof descricao !== 'string' || descricao.trim() === '') {
        return res.status(400).json({ error: 'A descrição é obrigatória e deve ser um texto válido.' });
    }

    if (preco === undefined || preco === null || isNaN(preco) || Number(preco) <= 0) {
        return res.status(400).json({ error: 'O preço é obrigatório e deve ser um valor numérico maior que zero.' });
    }

    next();
}

module.exports = validarPrato;