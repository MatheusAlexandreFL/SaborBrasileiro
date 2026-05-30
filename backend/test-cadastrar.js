const PORT = process.env.PORT || 5000;
const BASE_URL = `http://localhost:${PORT}`;

async function runTest() {
    try {
        console.log('1. Cadastrando usuário de teste (POST /cadastrar-teste)...');
        const email = `cliente${Date.now()}@teste.com`;
        const senha = 'minhasenha';

        const cadastrarRes = await fetch(`${BASE_URL}/cadastrar-teste`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nome: 'Cliente Teste',
                email: email,
                senha: senha
            })
        });

        if (!cadastrarRes.ok) {
            const errText = await cadastrarRes.text();
            throw new Error(`Falha no cadastro: ${cadastrarRes.status} - ${errText}`);
        }

        const cadastrarData = await cadastrarRes.json();
        console.log('Resposta do cadastro:', cadastrarData);

        console.log('\n2. Realizando login com o usuário criado (POST /login)...');
        const loginRes = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                senha: senha
            })
        });

        if (!loginRes.ok) {
            const errText = await loginRes.text();
            throw new Error(`Falha no login: ${loginRes.status} - ${errText}`);
        }

        const { token } = await loginRes.json();
        console.log(`Login bem-sucedido! Token obtido: ${token.substring(0, 30)}...`);

    } catch (error) {
        console.error('Erro durante o teste:', error.message);
    }
}

runTest();
