const db = require('./src/database/exports');
const bcrypt = require('bcrypt');

async function setup() {
    try {
        console.log('Iniciando configuração do banco de dados de teste...');

        // 1. Criar usuário "dono" se não existir
        const email = 'dono@sabor.com';
        const senhaPlana = '123456';
        
        let usuario = await db('usuarios').where({ email }).first();
        
        if (!usuario) {
            const senhaHash = await bcrypt.hash(senhaPlana, 10);
            const [userId] = await db('usuarios').insert({
                nome: 'Dono do Restaurante',
                email,
                senha: senhaHash,
                tipoUsuario: 'restaurante'
            });
            console.log(`Usuário de teste criado com ID: ${userId}`);
            usuario = { id: userId };
        } else {
            console.log(`Usuário de teste já existe com ID: ${usuario.id}`);
        }

        // 2. Criar restaurante para este usuário se não existir
        let restaurante = await db('restaurantes').where({ usuario_id: usuario.id }).first();
        
        if (!restaurante) {
            const [restauranteId] = await db('restaurantes').insert({
                nome: 'Restaurante Sabor Brasileiro',
                usuario_id: usuario.id,
                especialidade: 'Comida Típica Brasileira'
            });
            console.log(`Restaurante de teste criado com ID: ${restauranteId}`);
        } else {
            console.log(`Restaurante de teste já existe com ID: ${restaurante.id}`);
        }

        console.log('\nConfiguração concluída com sucesso!');
        console.log('Credenciais para teste:');
        console.log(`Email: ${email}`);
        console.log(`Senha: ${senhaPlana}`);
    } catch (error) {
        console.error('Erro ao configurar banco de dados:', error);
    } finally {
        await db.destroy();
    }
}

setup();
