<div align="center">

# 🍽️ Sabor Brasileiro

**Plataforma de avaliações gastronômicas da culinária brasileira**

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Express](https://img.shields.io/badge/Express-5.2-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

---

Uma aplicação web completa para descobrir, avaliar e gerenciar restaurantes brasileiros.  
Donos de restaurantes podem cadastrar seus estabelecimentos e cardápios, enquanto clientes exploram, buscam e avaliam suas experiências gastronômicas.

</div>

---

## 📋 Índice

- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Arquitetura](#-arquitetura)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação e Configuração](#-instalação-e-configuração)
- [Executando o Projeto](#-executando-o-projeto)
- [Endpoints da API](#-endpoints-da-api)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Equipe](#-equipe)

---

## ✨ Funcionalidades

### 👤 Para Clientes
- Cadastro e login com autenticação segura (JWT)
- Explorar restaurantes com busca e filtros por categoria
- Visualizar cardápios completos com fotos e preços
- Avaliar restaurantes e pratos com notas de meia estrela (0.5 a 5.0)
- Editar perfil pessoal com foto de perfil via URL
- Alterar senha com verificação da senha atual

### 🏪 Para Donos de Restaurantes
- Gerenciar múltiplos restaurantes em uma única conta
- Cadastrar, editar e excluir pratos do cardápio
- Adicionar galeria de fotos ao restaurante
- Visualizar avaliações dos clientes
- Gerenciar informações do estabelecimento (endereço, categoria, telefone, etc.)

### 🔍 Geral
- Busca integrada por restaurantes e pratos em tempo real
- Filtro por categorias (Brasileira, Italiana, Japonesa, Churrasco, Pizzaria, etc.)
- Visualização de endereço com integração ao Google Maps
- Interface responsiva para desktop e dispositivos móveis
- Proteção de rotas para páginas autenticadas

---

## 🛠️ Tecnologias

### Frontend
| Tecnologia | Versão | Descrição |
|---|---|---|
| **React** | 19.2 | Biblioteca para construção de interfaces |
| **Vite** | 8.0 | Build tool e dev server |
| **Tailwind CSS** | 4.3 | Framework CSS utilitário |
| **React Router** | 7.15 | Roteamento SPA |
| **Axios** | 1.16 | Cliente HTTP |

### Backend
| Tecnologia | Versão | Descrição |
|---|---|---|
| **Node.js** | 22+ | Runtime JavaScript |
| **Express** | 5.2 | Framework HTTP |
| **Knex.js** | 3.2 | Query builder SQL |
| **MySQL2** | 3.22 | Driver do banco de dados |
| **JWT** | 9.0 | Autenticação via tokens |
| **bcrypt** | 6.0 | Hash de senhas |
| **express-rate-limit** | 8.5 | Proteção contra brute-force |

---

## 🏗️ Arquitetura

```
┌─────────────────┐       ┌──────────────────┐       ┌────────────┐
│                 │       │                  │       │            │
│   React + Vite  │◄─────►│  Express API     │◄─────►│   MySQL    │
│   (porta 5173)  │ HTTP  │  (porta 5000)    │ Knex  │            │
│                 │       │                  │       │            │
└─────────────────┘       └──────────────────┘       └────────────┘
     Frontend                   Backend                Database
```

O projeto segue a arquitetura **MVC** no backend:
- **Controller** → Recebe as requisições e retorna as respostas
- **Service** → Contém a lógica de negócio
- **Middleware** → Validação de dados e autenticação (JWT)
- **Migrations** → Versionamento do schema do banco de dados

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (v22 ou superior)
- [MySQL](https://www.mysql.com/downloads/) (v8.0 ou superior)
- [Git](https://git-scm.com/)
- Um gerenciador de pacotes: **npm** (incluso com Node.js)

---

## 🚀 Instalação e Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/MatheusAlexandreFL/SaborBrasileiro.git
cd SaborBrasileiro
```

### 2. Configure as variáveis de ambiente

Crie o arquivo `.env` na pasta `backend/` com base no `.envexample`:

```bash
cp backend/.envexample backend/.env
```

Edite o arquivo `backend/.env` com as suas credenciais:

```env
PORT=5000
HOST=localhost
SECRET_KEY=sua_chave_secreta_aqui
SERVER_USER=root
SERVER_PASSWORD=sua_senha_mysql
SERVER_HOST=127.0.0.1
SERVER_DB_PORT=3306
SERVER_DATABASE=sabor_brasileiro
```

### 3. Instale as dependências

```bash
# Dependências do backend
cd backend
npm install

# Dependências do frontend
cd ../front
npm install
```

### 4. Configure o banco de dados

```bash
cd backend

# Criar o banco de dados automaticamente
node src/database/createDb.js

# Executar as migrations (criar tabelas)
npx knex migrate:latest

# (Opcional) Popular o banco com dados de exemplo
npx knex seed:run
```

---

## ▶️ Executando o Projeto

Abra **dois terminais** separados:

**Terminal 1 — Backend:**
```bash
cd backend
node src/server.js
```
> O servidor será iniciado em `http://localhost:5000`

**Terminal 2 — Frontend:**
```bash
cd front
npm run dev
```
> A aplicação será aberta em `http://localhost:5173`

---

## 📡 Endpoints da API

### Usuários (`/usuarios`)
| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|:------------:|
| `POST` | `/usuarios/cadastrar` | Cadastrar novo usuário | ❌ |
| `POST` | `/usuarios/login` | Fazer login | ❌ |
| `GET` | `/usuarios/perfil` | Obter perfil do usuário | ✅ |
| `PUT` | `/usuarios/perfil` | Atualizar perfil | ✅ |
| `PUT` | `/usuarios/perfil/senha` | Alterar senha | ✅ |
| `DELETE` | `/usuarios/perfil` | Excluir conta | ✅ |

### Restaurantes (`/restaurantes`)
| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|:------------:|
| `GET` | `/restaurantes` | Listar todos os restaurantes | ❌ |
| `GET` | `/restaurantes/:id` | Buscar restaurante por ID | ❌ |
| `POST` | `/restaurantes` | Cadastrar restaurante | ✅ |
| `PUT` | `/restaurantes/:id` | Atualizar restaurante | ✅ |
| `DELETE` | `/restaurantes/:id` | Remover restaurante | ✅ |

### Pratos (`/pratos`)
| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|:------------:|
| `GET` | `/pratos` | Listar todos os pratos | ❌ |
| `GET` | `/pratos/:id` | Buscar prato por ID | ❌ |
| `POST` | `/pratos` | Cadastrar prato | ✅ |
| `PUT` | `/pratos/:id` | Atualizar prato | ✅ |
| `DELETE` | `/pratos/:id` | Remover prato | ✅ |

### Avaliações (`/avaliacoes`)
| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|:------------:|
| `GET` | `/avaliacoes` | Listar avaliações | ✅ |
| `POST` | `/avaliacoes` | Criar avaliação | ✅ |
| `PUT` | `/avaliacoes/:id` | Editar avaliação | ✅ |
| `DELETE` | `/avaliacoes/:id` | Remover avaliação | ✅ |

---

## 📁 Estrutura do Projeto

```
SaborBrasileiro/
├── backend/
│   ├── src/
│   │   ├── controller/          # Controladores das rotas
│   │   ├── database/
│   │   │   ├── migrations/      # Versionamento do banco de dados
│   │   │   ├── seeds/           # Dados iniciais de exemplo
│   │   │   ├── createDb.js      # Script de criação do banco
│   │   │   └── exports.js       # Exportação da instância Knex
│   │   ├── middleware/          # Autenticação e validações
│   │   ├── routes/              # Definição das rotas da API
│   │   ├── services/            # Lógica de negócio
│   │   ├── utils/               # Utilitários (erros HTTP)
│   │   └── server.js            # Ponto de entrada do servidor
│   ├── knexfile.js              # Configuração do Knex
│   ├── .envexample              # Exemplo de variáveis de ambiente
│   └── package.json
│
├── front/
│   ├── public/                  # Favicon e assets estáticos
│   ├── src/
│   │   ├── assets/              # Imagens do projeto
│   │   ├── components/          # Componentes reutilizáveis
│   │   ├── context/             # Context API (Toast)
│   │   ├── hooks/               # Custom hooks
│   │   ├── pages/               # Páginas da aplicação
│   │   ├── services/            # Serviço de API (Axios)
│   │   ├── App.jsx              # Componente raiz e rotas
│   │   ├── main.jsx             # Ponto de entrada React
│   │   └── tailwind.css         # Estilos globais
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## 👥 Equipe

<div align="center">

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/biapxt">
        <img src="https://github.com/biapxt.png" width="100px;" alt="Ana Beatriz" style="border-radius:50%"/><br />
        <sub><b>Ana Beatriz Peixoto</b></sub>
      </a><br />
      <a href="https://www.linkedin.com/in/beatrizz-peixoto/">LinkedIn</a>
    </td>
    <td align="center">
      <a href="https://github.com/Paladino606">
        <img src="https://github.com/Paladino606.png" width="100px;" alt="Daniel Brito" style="border-radius:50%"/><br />
        <sub><b>Daniel Brito de Souza</b></sub>
      </a><br />
      <a href="https://www.linkedin.com/in/daniel-brito-de-souza-190b953b4/">LinkedIn</a>
    </td>
    <td align="center">
      <a href="https://github.com/MatheusAlexandreFL">
        <img src="https://github.com/MatheusAlexandreFL.png" width="100px;" alt="Matheus Alexandre" style="border-radius:50%"/><br />
        <sub><b>Matheus Alexandre F. Leite</b></sub>
      </a><br />
      <a href="https://www.linkedin.com/in/matheus-alexandre-ferreira/">LinkedIn</a>
    </td>
    <td align="center">
      <a href="https://github.com/ItsTonyy">
        <img src="https://github.com/ItsTonyy.png" width="100px;" alt="Tony Terra Nova" style="border-radius:50%"/><br />
        <sub><b>Tony Terra Nova Portela</b></sub>
      </a><br />
      <a href="https://www.linkedin.com/in/tony-terra-nova/">LinkedIn</a>
    </td>
  </tr>
</table>

</div>

---

<div align="center">

Feito com ❤️ pela equipe **Sabor Brasileiro** — 2026

</div>
