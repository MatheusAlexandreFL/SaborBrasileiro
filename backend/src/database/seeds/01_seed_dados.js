import bcrypt from 'bcrypt';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deleta todas as entradas existentes
  await knex('avaliacoes').del();
  await knex('pratos').del();
  await knex('restaurantes').del();
  await knex('usuarios').del();

  // Hash de senha comum para teste
  const senhaHash = await bcrypt.hash('123456', 10);

  // Insere Usuários um por um para capturar os IDs corretos no MySQL
  const [dono1Id] = await knex('usuarios').insert({
    nome: 'Dono da Cantina',
    email: 'dono1@email.com',
    senha: senhaHash,
    tipoUsuario: 'dono',
    cnpj: '12345678000199',
    foto_perfil: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  });

  const [dono2Id] = await knex('usuarios').insert({
    nome: 'Dono do Sertão',
    email: 'dono2@email.com',
    senha: senhaHash,
    tipoUsuario: 'dono',
    cnpj: '98765432000188',
    foto_perfil: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  });

  const [cliente1Id] = await knex('usuarios').insert({
    nome: 'Maria Silva',
    email: 'cliente1@email.com',
    senha: senhaHash,
    tipoUsuario: 'cliente',
    cnpj: null,
    foto_perfil: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
  });

  const [cliente2Id] = await knex('usuarios').insert({
    nome: 'João Santos',
    email: 'cliente2@email.com',
    senha: senhaHash,
    tipoUsuario: 'cliente',
    cnpj: null,
    foto_perfil: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  });

  const [adminId] = await knex('usuarios').insert({
    nome: 'Administrador',
    email: 'admin@email.com',
    senha: senhaHash,
    tipoUsuario: 'admin',
    cnpj: null,
    foto_perfil: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
  });

  // Insere Restaurantes um por um
  const [rest1Id] = await knex('restaurantes').insert({
    usuario_id: dono1Id,
    nome: 'Cantina da Nonna',
    descricao: 'A melhor e mais tradicional culinária italiana da cidade. Massas artesanais feitas com amor.',
    categoria: 'Italiana',
    rua: 'Avenida Paulista',
    numero: '1000',
    bairro: 'Bela Vista',
    cep: '01310-100',
    cidade: 'São Paulo',
    estado: 'SP',
    telefone: '(11) 98765-4321',
    imagem_url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80',
    galeria: JSON.stringify([
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600',
      'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=600'
    ]),
    nota: 4.8
  });

  const [rest2Id] = await knex('restaurantes').insert({
    usuario_id: dono2Id,
    nome: 'Sabor do Sertão',
    descricao: 'Pratos típicos nordestinos com tempero caseiro e ingredientes selecionados diretamente da fazenda.',
    categoria: 'Nordestina',
    rua: 'Rua dos Três Irmãos',
    numero: '250',
    bairro: 'Vila Progresso',
    cep: '05615-190',
    cidade: 'São Paulo',
    estado: 'SP',
    telefone: '(11) 97654-3210',
    imagem_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
    galeria: JSON.stringify([
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600'
    ]),
    nota: 4.6
  });

  const [rest3Id] = await knex('restaurantes').insert({
    usuario_id: dono1Id,
    nome: 'Japa Express',
    descricao: 'Sushis, temakis, yakisobas e combinados preparados na hora por sushimen experientes.',
    categoria: 'Japonesa',
    rua: 'Rua Augusta',
    numero: '450',
    bairro: 'Consolação',
    cep: '01305-100',
    cidade: 'São Paulo',
    estado: 'SP',
    telefone: '(11) 96543-2109',
    imagem_url: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=80',
    galeria: null,
    nota: 4.5
  });

  // Insere Pratos um por um
  const [prato1Id] = await knex('pratos').insert({
    restaurante_id: rest1Id,
    nome: 'Lasanha à Bolonhesa',
    descricao: 'Lasanha com massa artesanal, molho bolonhesa encorpado, presunto, muçarela e molho bechamel.',
    preco: 45.90,
    foto_prato: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=600&auto=format&fit=crop&q=80'
  });

  const [prato2Id] = await knex('pratos').insert({
    restaurante_id: rest1Id,
    nome: 'Fettuccine Alfredo',
    descricao: 'Massa fettuccine fresca envolvida em um cremoso molho de manteiga e queijo parmesão ralado na hora.',
    preco: 39.90,
    foto_prato: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=600&auto=format&fit=crop&q=80'
  });

  const [prato3Id] = await knex('pratos').insert({
    restaurante_id: rest2Id,
    nome: 'Baião de Dois',
    descricao: 'Tradicional baião com arroz, feijão de corda, bacon, calabresa, queijo coalho e carne de sol.',
    preco: 35.00,
    foto_prato: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80'
  });

  const [prato4Id] = await knex('pratos').insert({
    restaurante_id: rest2Id,
    nome: 'Carne de Sol com Macaxeira',
    descricao: 'Porção generosa de carne de sol acebolada servida com macaxeira cozida e frita com manteiga de garrafa.',
    preco: 49.90,
    foto_prato: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=600&auto=format&fit=crop&q=80'
  });

  const [prato5Id] = await knex('pratos').insert({
    restaurante_id: rest3Id,
    nome: 'Combinado Premium 20 Peças',
    descricao: 'Variedade de sushis e sashimis finos, incluindo salmão, atum e peixe branco.',
    preco: 69.90,
    foto_prato: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=600&auto=format&fit=crop&q=80'
  });

  // Insere Avaliações
  await knex('avaliacoes').insert([
    {
      id_restaurante: rest1Id,
      id_usuario: cliente1Id,
      id_prato: prato1Id,
      nota: 5.0,
      comentario: 'Lasanha espetacular! Massa leve e molho muito saboroso.'
    },
    {
      id_restaurante: rest1Id,
      id_usuario: cliente2Id,
      id_prato: prato2Id,
      nota: 4.5,
      comentario: 'Molho alfredo muito bom, mas achei a porção um pouco pequena.'
    },
    {
      id_restaurante: rest2Id,
      id_usuario: cliente1Id,
      id_prato: prato3Id,
      nota: 4.0,
      comentario: 'Muito bom o baião, tempero excelente.'
    },
    {
      id_restaurante: rest2Id,
      id_usuario: cliente2Id,
      id_prato: prato4Id,
      nota: 5.0,
      comentario: 'Carne de sol macia e deliciosa, a mandioca frita na manteiga de garrafa é dos deuses.'
    },
    {
      id_restaurante: rest3Id,
      id_usuario: cliente1Id,
      id_prato: prato5Id,
      nota: 4.5,
      comentario: 'Sushi fresco e muito bem montado. Recomendo!'
    }
  ]);
}
