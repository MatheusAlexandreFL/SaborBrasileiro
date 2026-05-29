export const CATEGORIES = [
  { id: "all", name: "Todos" },
  { id: "saudavel", name: "Saudável" },
  { id: "massas", name: "Massas" },
  { id: "hamburguer", name: "Hambúrguer" },
  { id: "saladas", name: "Saladas" },
  { id: "sobremesas", name: "Sobremesas" }
];

export const RESTAURANTS = [
  {
    id: 1,
    name: "Origem Cozinha Natural",
    rating: 4.9,
    category: "Saudável - Contemporânea",
    categoryKey: "saudavel",
    location: "Rio de Janeiro, RJ",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    name: "Verde & Mar",
    rating: 4.8,
    category: "Saudável - Peixes e Frutos do Mar",
    categoryKey: "saudavel",
    location: "Rio de Janeiro, RJ",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    name: "Cantina Bella Italia",
    rating: 4.9,
    category: "Massas - Italiana",
    categoryKey: "massas",
    location: "Rio de Janeiro, RJ",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 4,
    name: "Bife & Brasa",
    rating: 4.7,
    category: "Hambúrguer - Carnes",
    categoryKey: "hamburguer",
    location: "Rio de Janeiro, RJ",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 5,
    name: "Doce Suspiro",
    rating: 4.9,
    category: "Sobremesas - Doceria",
    categoryKey: "sobremesas",
    location: "Rio de Janeiro, RJ",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&auto=format&fit=crop&q=60"
  }
];

export const DISHES = [
{
    id: 1,
    name: "Risoto de Cogumelos Trufado",
    rating: 4.9,
    restaurant: "Cantina Bella Italia",
    categoryKey: "massas",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 2,
    name: "Carbonara Clássica",
    rating: 4.9,
    restaurant: "Cantina Bella Italia",
    categoryKey: "massas",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    name: "Burger Duplo Cheddar",
    rating: 4.8,
    restaurant: "Bife & Brasa",
    categoryKey: "hamburguer",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 4,
    name: "Salada Caesar Suprema",
    rating: 4.7,
    restaurant: "Origem Cozinha Natural",
    categoryKey: "saladas",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 5,
    name: "Torta de Chocolate Belga com Frutas Vermelhas",
    rating: 4.9,
    restaurant: "Doce Suspiro",
    categoryKey: "sobremesas",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60"
  },
  
  // cadastrei pratos novos na cantina bela talia pra simular remondação de prato do mesmo restaurante na pagina de prato
  {
    id: 6,
    name: "Lasagna della Nonna de Bolonha",
    rating: 4.8,
    restaurant: "Cantina Bella Italia",
    categoryKey: "massas",
    description: "Camadas de massa fresca intercaladas com um rico ragu de carne bovina e suína, molho bechamel cremoso e uma generosa cobertura de queijo gratinado.",
    image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 7,
    name: "Fettuccine ao Molho de Trufas Pretas",
    rating: 5.0,
    restaurant: "Cantina Bella Italia",
    categoryKey: "massas",
    description: "Fettuccine artesanal servido com um luxuoso molho de trufas pretas, creme de leite fresco e finalizado com lascas de parmesão envelhecido.",
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 8,
    name: "Bruschetta Tradicional de Pomodoro",
    rating: 4.7,
    restaurant: "Cantina Bella Italia",
    categoryKey: "massas",
    description: "Pão italiano crocante coberto com uma mistura fresca de tomates maduros, manjericão, alho e azeite de oliva extra virgem.",
    image: "https://images.unsplash.com/photo-1572656631137-7935297eff55?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 9,
    name: "Panna Cotta com Calda de Framboesa",
    rating: 4.9,
    restaurant: "Cantina Bella Italia",
    categoryKey: "sobremesas",
    description: "Panna Cotta cremosa servida com uma calda saborosa de framboesas frescas.",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&auto=format&fit=crop&q=60"
  }
];

export const HERO_COLLAGE = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=300&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=300&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=300&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=300&auto=format&fit=crop&q=80"
];

// lista simulando comentarios   
export const REVIEWS = [
  {
    id: 1,
    nome: "Tony Portela",
    iniciais: "TP",
    nota: 5.0,
    texto: "O Risoto estava perfeito, veio no ponto certo e o sabor estava divino!"
  },
  {
    id: 2,
    nome: "Ana Beatriz",
    iniciais: "AB",
    nota: 4.5,
    texto: "top"
  },
  {
    id: 3,
    nome: "Matheus Alex",
    iniciais: "MA",
    nota: 5.0,
    texto: "bom"
  },
  {
    id: 4,
    nome: "Daniel Brito",
    iniciais: "DB",
    nota: 4.0,
    texto: "topp"
  }
];