/**
 * @param {Error} error Objeto de erro capturado
 * @returns {number} Código de status HTTP (404, 403 ou 400)
 */
export function obterStatusErro(error) {
    const msg = error.message ? error.message.toLowerCase() : '';
    if (msg.includes('não encontrado') || msg.includes('não encontrada')) {
        return 404;
    }
    if (msg.includes('permissão') || msg.includes('não pertence') || msg.includes('não pode avaliar')) {
        return 403;
    }
    return 400;
}
