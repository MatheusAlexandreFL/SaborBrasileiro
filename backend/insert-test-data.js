import db from './src/database/exports.js';
import bcrypt from 'bcrypt';

async function insertTestData() {
    try {
        console.log('Iniciando inserção de dados de teste...');

        // 1. Criar usuário "dono"
        const emailDono = 'restaurante_teste@sabor.com';
        let dono = await db('usuarios').where({ email: emailDono }).first();
        if (!dono) {
            const senhaHash = await bcrypt.hash('123456', 10);
            const [userId] = await db('usuarios').insert({
                nome: 'Dono do Restaurante Teste',
                email: emailDono,
                senha: senhaHash,
                tipoUsuario: 'restaurante'
            });
            dono = { id: userId };
            console.log(`Dono criado com ID: ${userId}`);
        }

        // 2. Criar restaurante
        let restaurante = await db('restaurantes').where({ usuario_id: dono.id }).first();
        if (!restaurante) {
            const [restId] = await db('restaurantes').insert({
                nome: 'Restaurante Teste do BD',
                usuario_id: dono.id,
                categoria: 'Brasileira',
                endereco: 'Rua Teste, 123',
                cidade: 'São Paulo',
                estado: 'SP',
                descricao: 'Restaurante criado para testes'
            });
            restaurante = { id: restId };
            console.log(`Restaurante criado com ID: ${restId}`);
        }

        // 3. Criar prato
        let prato = await db('pratos').where({ restaurante_id: restaurante.id, nome: 'Prato Teste' }).first();
        if (!prato) {
            const [pratoId] = await db('pratos').insert({
                restaurante_id: restaurante.id,
                nome: 'Prato Teste',
                descricao: 'Um prato delicioso para testar o sistema',
                preco: 25.50
            });
            prato = { id: pratoId };
            console.log(`Prato criado com ID: ${pratoId}`);
        }

        // 4. Criar usuário "cliente" (para avaliar)
        const emailCliente = 'cliente_teste@sabor.com';
        let cliente = await db('usuarios').where({ email: emailCliente }).first();
        if (!cliente) {
            const senhaHash = await bcrypt.hash('123456', 10);
            const [userId] = await db('usuarios').insert({
                nome: 'Cliente Teste',
                email: emailCliente,
                senha: senhaHash,
                tipoUsuario: 'cliente'
            });
            cliente = { id: userId };
            console.log(`Cliente criado com ID: ${userId}`);
        }

        // 5. Criar avaliação
        let avaliacao = await db('avaliacoes').where({ id_usuario: cliente.id, id_restaurante: restaurante.id }).first();
        if (!avaliacao) {
            const [avalId] = await db('avaliacoes').insert({
                id_restaurante: restaurante.id,
                id_usuario: cliente.id,
                id_prato: prato.id,
                nota: 4.5,
                comentario: 'Muito bom o prato teste, recomendo!'
            });
            console.log(`Avaliação criada com ID: ${avalId}`);
        } else {
            console.log(`Avaliação já existe com ID: ${avaliacao.id}`);
        }

        console.log('Dados de teste criados com sucesso!');
    } catch (error) {
        console.error('Erro ao inserir dados:', error);
    } finally {
        await db.destroy();
    }
}

insertTestData();
