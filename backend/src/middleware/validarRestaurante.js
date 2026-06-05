function validarRestaurante(req, res, next) {
    const isUpdate = req.method === 'PUT' || req.method === 'PATCH';
    const { nome, descricao, categoria, rua, numero, bairro, cep, cidade, estado, telefone, imagem_url, galeria } = req.body;

    if (!isUpdate) {
        if (!nome || typeof nome !== 'string' || nome.trim() === '') {
            return res.status(400).json({ error: 'O nome do restaurante é obrigatório e deve ser um texto válido.' });
        }
        if (!categoria || typeof categoria !== 'string' || categoria.trim() === '') {
            return res.status(400).json({ error: 'A categoria é obrigatória e deve ser um texto válido.' });
        }
        if (!rua || typeof rua !== 'string' || rua.trim() === '') {
            return res.status(400).json({ error: 'A rua é obrigatória e deve ser um texto válido.' });
        }
        if (!numero || typeof numero !== 'string' || numero.trim() === '') {
            return res.status(400).json({ error: 'O número é obrigatório e deve ser um texto válido.' });
        }
        if (!bairro || typeof bairro !== 'string' || bairro.trim() === '') {
            return res.status(400).json({ error: 'O bairro é obrigatório e deve ser um texto válido.' });
        }
        if (!cidade || typeof cidade !== 'string' || cidade.trim() === '') {
            return res.status(400).json({ error: 'A cidade é obrigatória e deve ser um texto válido.' });
        }
        if (!estado || typeof estado !== 'string' || estado.trim().length !== 2) {
            return res.status(400).json({ error: 'O estado é obrigatório e deve conter exatamente 2 caracteres.' });
        }
    } else {
        if (nome !== undefined && (typeof nome !== 'string' || nome.trim() === '')) {
            return res.status(400).json({ error: 'O nome do restaurante deve ser um texto válido.' });
        }
        if (categoria !== undefined && (typeof categoria !== 'string' || categoria.trim() === '')) {
            return res.status(400).json({ error: 'A categoria deve ser um texto válido.' });
        }
        if (rua !== undefined && (typeof rua !== 'string' || rua.trim() === '')) {
            return res.status(400).json({ error: 'A rua deve ser um texto válido.' });
        }
        if (numero !== undefined && (typeof numero !== 'string' || numero.trim() === '')) {
            return res.status(400).json({ error: 'O número deve ser um texto válido.' });
        }
        if (bairro !== undefined && (typeof bairro !== 'string' || bairro.trim() === '')) {
            return res.status(400).json({ error: 'O bairro deve ser um texto válido.' });
        }
        if (cidade !== undefined && (typeof cidade !== 'string' || cidade.trim() === '')) {
            return res.status(400).json({ error: 'A cidade deve ser um texto válido.' });
        }
        if (estado !== undefined && (typeof estado !== 'string' || estado.trim().length !== 2)) {
            return res.status(400).json({ error: 'O estado deve conter exatamente 2 caracteres.' });
        }
    }

    if (descricao !== undefined && descricao !== null && typeof descricao !== 'string') {
        return res.status(400).json({ error: 'A descrição deve ser um texto válido.' });
    }
    if (cep !== undefined && cep !== null && (typeof cep !== 'string' || cep.trim().length < 8 || cep.trim().length > 9)) {
        return res.status(400).json({ error: 'O CEP deve conter entre 8 e 9 caracteres.' });
    }
    if (telefone !== undefined && telefone !== null && typeof telefone !== 'string') {
        return res.status(400).json({ error: 'O telefone deve ser um texto válido.' });
    }
    if (imagem_url !== undefined && imagem_url !== null && typeof imagem_url !== 'string') {
        return res.status(400).json({ error: 'A URL da imagem deve ser um texto válido.' });
    }
    if (galeria !== undefined && galeria !== null && typeof galeria !== 'string') {
        return res.status(400).json({ error: 'A galeria de fotos deve ser um texto contendo o formato JSON válido.' });
    }

    next();
}

export default validarRestaurante;
