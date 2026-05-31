function validarAvaliacao(req, res, next) {
    const { id_restaurante, id_prato, nota, comentario } = req.body;

    if (!id_restaurante || typeof id_restaurante !== 'number' || id_restaurante <= 0) {
        return res.status(400).json({ error: 'O ID do restaurante é obrigatório e deve ser um número válido.' });
    }

    if (id_prato !== undefined && id_prato !== null) {
        if (typeof id_prato !== 'number' || id_prato <= 0) {
            return res.status(400).json({ error: 'O ID do prato deve ser um número válido.' });
        }
    }

    if (!nota || typeof nota !== 'number' || nota < 1 || nota > 5) {
        return res.status(400).json({ error: 'A nota é obrigatória e deve ser um número entre 1 e 5.' });
    }

    if (!comentario || typeof comentario !== 'string' || comentario.trim() === '') {
        return res.status(400).json({ error: 'O comentário é obrigatório e deve ser um texto válido.' });
    }

    next();
}

export default validarAvaliacao;