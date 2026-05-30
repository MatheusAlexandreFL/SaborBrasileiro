const PORT = process.env.PORT || 5000;
const BASE_URL = `http://localhost:${PORT}`;

async function runTests() {
    try {
        console.log('1. Realizando login para obter o JWT token...');
        const loginRes = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'dono@sabor.com',
                senha: '123456'
            })
        });

        if (!loginRes.ok) {
            const errText = await loginRes.text();
            throw new Error(`Falha no login: ${loginRes.status} - ${errText}`);
        }

        const { token } = await loginRes.json();
        console.log(`Login bem-sucedido! Token obtido (início): ${token.substring(0, 30)}...`);

        console.log('\n2. Cadastrando um prato (POST /cadastrar-prato)...');
        const pratoPayload = {
            nome: 'Feijoada Completa',
            descricao: 'Feijoada tradicional brasileira com carnes nobres, arroz, couve, farofa e laranja.',
            preco: 45.90,
            foto: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500'
        };

        const cadastrarRes = await fetch(`${BASE_URL}/cadastrar-prato`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(pratoPayload)
        });

        const cadastrarData = await cadastrarRes.json();
        console.log('Resposta do cadastro:', cadastrarRes.status, cadastrarData);

        console.log('\n3. Listando os pratos (GET /listar-pratos)...');
        const listarRes = await fetch(`${BASE_URL}/listar-pratos`);
        const listarData = await listarRes.json();
        console.log('Lista de pratos cadastrados:', listarRes.status, JSON.stringify(listarData, null, 2));

    } catch (error) {
        console.error('Erro durante a execução do teste:', error.message);
    }
}

// Pequeno delay para garantir que o servidor subiu
setTimeout(runTests, 1500);
