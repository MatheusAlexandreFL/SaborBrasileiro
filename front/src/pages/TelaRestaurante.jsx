import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DISHES, RESTAURANTS } from "../mockData";
import DishCard from "../components/DishCard";
import { useToast } from "../context/ToastContext";

const MapPinIcon = () => (
  <svg
    aria-hidden="true"
    className="h-5 w-5 shrink-0 text-[#C13D33]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 21s7-4.6 7-11a7 7 0 1 0-14 0c0 6.4 7 11 7 11Z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5h.01" />
  </svg>
);


const RESTAURANT_DETAILS = {
  "Origem Cozinha Natural": {
    address: "Rua das flores, 122 - Botafogo, Rio de Janeiro, RJ - CEP 22250-060",
    description: "No Origem Cozinha Natural, acreditamos que comer bem é um ato de carinho com o próprio corpo. Nosso menu é composto inteiramente por ingredientes orgânicos selecionados de produtores locais parceiros. Desenvolvemos pratos contemporâneos ricos em nutrientes, com opções vegetarianas, veganas e sem glúten, sem abrir mão do sabor e da apresentação impecável. O ambiente é um refúgio arborizado no coração de Botafogo, perfeito para desacelerar e saborear a vida.",
    gallery: [
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80"
    ]
  },
  "Verde & Mar": {
    address: "Avenida Atlântica, 450 - Copacabana, Rio de Janeiro, RJ - CEP 22010-000",
    description: "Com uma vista deslumbrante e o aroma do mar, o Verde & Mar combina a culinária saudável com pescados frescos e frutos do mar preparados na brasa. Nossos pratos valorizam os sabores naturais com temperos leves, ervas frescas e azeites artesanais premium. O ambiente arejado e a decoração praiana proporcionam uma experiência gastronômica relaxante e inesquecível na orla carioca.",
    gallery: [
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1485962398705-ef6a13c41e8f?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80"
    ]
  },
  "Cantina Bella Italia": {
    address: "Rua São Clemente, 312 - Botafogo, Rio de Janeiro, RJ - CEP 22260-004",
    description: "A Cantina Bella Italia traz o melhor da tradição gastronômica italiana diretamente para o Rio de Janeiro. Nossas massas são de fabricação artesanal diária, preparadas com sêmola de grano duro importada e servidas com molhos encorpados e aromáticos que cozinham por horas. Dos antepastos clássicos aos risotos trufados, cada detalhe é pensado para recriar o clima caloroso de um almoço em família na Itália.",
    gallery: [
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=800&auto=format&fit=crop&q=80"
    ]
  },
  "Bife & Brasa": {
    address: "Rua Voluntários da Pátria, 89 - Botafogo, Rio de Janeiro, RJ - CEP 22270-000",
    description: "O Bife & Brasa é o destino ideal para os amantes de carne e hambúrgueres artesanais grelhados na brasa perfeita. Nossos blends são moídos diariamente com cortes selecionados de Angus certificado, garantindo suculência máxima. O pão macio brioche, o queijo derretido e os molhos autorais completam a experiência no nosso ambiente rústico e moderno.",
    gallery: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1558030006-450675393462?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1504973960431-1c467e159aa4?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=800&auto=format&fit=crop&q=80"
    ]
  },
  "Doce Suspiro": {
    address: "Rua Visconde de Pirajá, 150 - Ipanema, Rio de Janeiro, RJ - CEP 22410-002",
    description: "A Doce Suspiro é um pedacinho de céu para quem ama sobremesas finas e confeitaria de alta qualidade. Combinando técnicas clássicas francesas com ingredientes tradicionais brasileiros, nosso menu traz de tortas de chocolate belga a panna cottas delicadas com de framboesas frescas. Perfeito para uma tarde especial ou para adoçar qualquer momento do dia.",
    gallery: [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1511018556340-d16986a1c194?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&auto=format&fit=crop&q=80"
    ]
  }
};

const INITIAL_REVIEWS = [
  {
    id: 1,
    nome: "Marina Silva",
    iniciais: "MS",
    nota: 5,
    texto: "Ambiente maravilhoso, atendimento nota dez! A comida é incrivelmente fresca e saborosa."
  },
  {
    id: 2,
    nome: "Guilherme Santos",
    iniciais: "GS",
    nota: 4,
    texto: "Lugar muito bonito e pratos bem apresentados. Achei um pouco concorrido nos fins de semana, mas a experiência foi excelente."
  },
  {
    id: 3,
    nome: "Larissa Souza",
    iniciais: "LS",
    nota: 5,
    texto: "Melhor experiência gastronômica da região! Ingredientes de altíssima qualidade e o atendimento foi super atencioso."
  }
];

const TelaRestaurante = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const menuRef = useRef(null);

  const pratoPadrao = {
    id: 1,
    name: "Origem Cozinha Natural",
    rating: 4.9,
    category: "Saudável - Contemporânea",
    location: "Rio de Janeiro, RJ",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&auto=format&fit=crop&q=85"
  };

  const restaurantePrincipal = {
    id: location.state?.id || pratoPadrao.id,
    name: location.state?.name || pratoPadrao.name,
    rating: location.state?.rating || pratoPadrao.rating,
    category: location.state?.category || pratoPadrao.category,
    location: location.state?.location || pratoPadrao.location,
    image: location.state?.image || pratoPadrao.image
  };

  const details = RESTAURANT_DETAILS[restaurantePrincipal.name] || {
    address: "Rua das flores, 122 - Botafogo, Rio de Janeiro, RJ - CEP 22250-060",
    description: "Um espaço acolhedor e charmoso focado em proporcionar uma experiência gastronômica marcante com atendimento atencioso, ingredientes selecionados e pratos deliciosos preparados com excelência.",
    gallery: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&auto=format&fit=crop&q=80"
    ]
  };


  const [listaComentarios, setListaComentarios] = useState(INITIAL_REVIEWS);
  const [mostrarTodosComentarios, setMostrarTodosComentarios] = useState(false);
  const [nota, setNota] = useState(0);
  const [hoverNota, setHoverNota] = useState(0);
  const [comentario, setComentario] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Resete de estado quando o restaurante principal muda
  useEffect(() => {
    setListaComentarios(INITIAL_REVIEWS);
    setNota(0);
    setHoverNota(0);
    setComentario("");
    setMostrarTodosComentarios(false);
    window.scrollTo(0, 0);
  }, [restaurantePrincipal.id]);

  // Filtro de busca inteligente (por nome, categoria, prato, endereço e descrição)
  const filteredRestaurantsFromSearch = RESTAURANTS.filter((r) => {
    const term = searchQuery.toLowerCase().trim();
    if (!term) return [];

    const nameMatch = r.name.toLowerCase().includes(term);
    const categoryMatch = r.category.toLowerCase().includes(term);
    const locationMatch = r.location.toLowerCase().includes(term);

    const detailsObj = RESTAURANT_DETAILS[r.name] || {};
    const descriptionMatch = detailsObj.description?.toLowerCase().includes(term) || false;
    const addressMatch = detailsObj.address?.toLowerCase().includes(term) || false;

    // Pratos do restaurante
    const hasMatchingDish = DISHES.some(
      (d) => d.restaurant.toLowerCase() === r.name.toLowerCase() && d.name.toLowerCase().includes(term)
    );

    return nameMatch || categoryMatch || locationMatch || descriptionMatch || addressMatch || hasMatchingDish;
  });

  const handleSelectRestaurantFromSearch = (res) => {
    setSearchQuery("");
    navigate("/restaurante", {
      state: {
        id: res.id,
        name: res.name,
        rating: res.rating,
        category: res.category,
        location: res.location,
        image: res.image
      }
    });
  };


  const handlePrevImage = (e) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null && details.gallery) {
      setSelectedImageIndex((prev) => (prev === 0 ? details.gallery.length - 1 : prev - 1));
    }
  };

  const handleNextImage = (e) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null && details.gallery) {
      setSelectedImageIndex((prev) => (prev === details.gallery.length - 1 ? 0 : prev + 1));
    }
  };

  const handleCloseLightbox = () => {
    setSelectedImageIndex(null);
  };

  // navegar usando as setas do teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImageIndex === null) return;
      if (e.key === "Escape") handleCloseLightbox();
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "ArrowRight") handleNextImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex]);

  // Calculo de média
  const mediaGeral = listaComentarios.length > 0
    ? listaComentarios.reduce((soma, item) => soma + item.nota, 0) / listaComentarios.length
    : restaurantePrincipal.rating;

  // Filtrar pratos do restaurante
  const pratosDoRestaurante = DISHES.filter(
    (dish) => dish.restaurant.toLowerCase() === restaurantePrincipal.name.toLowerCase()
  );

  const comentariosExibidos = mostrarTodosComentarios ? listaComentarios : listaComentarios.slice(0, 2);

  const handleScrollToMenu = () => {
    menuRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleEnviarAvaliacao = (e) => {
    e.preventDefault();
    if (nota === 0) {
      toast.warning("Por favor, selecione uma nota antes de enviar.");
      return;
    }

    const novaAvaliacao = {
      id: Date.now(),
      nome: "Você",
      iniciais: "VC",
      nota: nota,
      texto: comentario.trim() || "Avaliou este restaurante sem deixar comentário."
    };

    setListaComentarios([novaAvaliacao, ...listaComentarios]);
    setNota(0);
    setHoverNota(0);
    setComentario("");
    setMostrarTodosComentarios(true);

    toast.success("Obrigado! Sua avaliação foi adicionada com sucesso.");
  };

  return (
    <div className="min-h-screen bg-[#F8EDDB]/30 flex flex-col font-sans text-black relative">

      {/* Header com Botão Voltar e Busca */}
      <header className="max-w-[1000px] w-full mx-auto px-4 sm:px-6 pt-6 flex justify-between items-center z-35 relative gap-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-white text-black px-4 py-2 rounded-full shadow-md border border-black/10 hover:bg-black/5 cursor-pointer font-bold text-[14px] flex items-center gap-1.5 transition-all outline-none shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          <span>Voltar</span>
        </button>

        {/* Barra de Busca de Restaurantes */}
        <div className="relative w-full max-w-[320px]">
          <div className="flex items-center gap-2 bg-white border border-black/10 rounded-full px-4 py-2 shadow-xs hover:shadow-md transition-all duration-300">
            <svg
              aria-hidden="true"
              className="h-4.5 w-4.5 text-black/40 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar restaurante ou prato..."
              className="w-full bg-transparent border-none outline-none text-[14px] font-medium text-black placeholder:text-black/35 focus:ring-0 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-black/40 hover:text-black/75 cursor-pointer border-none bg-transparent outline-none p-0.5 shrink-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Dropdown de Sugestões */}
          {searchQuery.trim().length > 0 && (
            <div className="absolute top-full right-0 mt-2 w-[300px] sm:w-[340px] bg-white rounded-2xl shadow-xl border border-black/5 z-50 overflow-hidden py-2 animate-in fade-in slide-in-from-top-1 duration-200">
              <div className="px-4 py-1.5 border-b border-black/5 mb-1.5">
                <span className="text-[11px] font-bold text-black/40 uppercase tracking-wider">
                  Sugestões ({filteredRestaurantsFromSearch.length})
                </span>
              </div>
              {filteredRestaurantsFromSearch.length > 0 ? (
                <div className="max-h-[260px] overflow-y-auto no-scrollbar">
                  {filteredRestaurantsFromSearch.map((res) => (
                    <div
                      key={res.id}
                      onClick={() => handleSelectRestaurantFromSearch(res)}
                      className="px-4 py-2 hover:bg-[#F8EDDB]/35 flex items-center gap-3 cursor-pointer transition-colors"
                    >
                      <img
                        src={res.image}
                        alt={res.name}
                        className="w-10 h-10 rounded-lg object-cover border border-black/5 shrink-0"
                      />
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <span className="font-bold text-[13px] text-black truncate">{res.name}</span>
                        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-black/50">
                          <span className="text-[#C13D33]">{res.category.split(" - ")[0]}</span>
                          <span>&bull;</span>
                          <span className="flex items-center gap-0.5 text-[#4A3C24]">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-2.5 h-2.5 text-amber-500">
                              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                            </svg>
                            {res.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-4 text-center text-[12px] font-semibold text-black/45">
                  Nenhum restaurante encontrado.
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 max-w-[1000px] w-full mx-auto px-4 sm:px-6 py-6 flex flex-col gap-10">

        <section className="bg-white rounded-[24px] shadow-xl p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch border border-black/5">


          <div className="flex flex-col gap-6 items-center justify-between">
            <div className="w-full h-[280px] sm:h-[320px] rounded-[16px] overflow-hidden shadow-md bg-black/5 relative group">
              <img
                src={restaurantePrincipal.image}
                alt={restaurantePrincipal.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <button
              onClick={handleScrollToMenu}
              className="w-full sm:w-[220px] h-[48px] bg-[#C13D33] text-white text-[15px] font-bold rounded-[8px] border-none outline-none cursor-pointer flex items-center justify-center hover:bg-[#a53229] transition-colors shadow-md active:scale-98"
            >
              Ver pratos
            </button>
          </div>

          <div className="flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <h1 className="font-serif text-[28px] sm:text-[34px] font-extrabold text-black tracking-tight leading-tight">
                  {restaurantePrincipal.name}
                </h1>
                <p className="text-[#C13D33] text-[14px] font-bold tracking-wider uppercase">
                  {restaurantePrincipal.category}
                </p>
              </div>


              <div className="flex items-center gap-1.5 text-[15px] font-bold bg-[#E7CC9F]/30 border border-[#E7CC9F] text-[#4A3C24] px-3 py-1 rounded-full w-fit">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-amber-500">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
                <span>{mediaGeral.toFixed(1)}</span>
              </div>

              <div className="flex items-start gap-2.5 text-[14px] text-black/85 leading-relaxed pt-1">
                <MapPinIcon />
                <address className="not-italic font-medium">
                  {details.address}
                </address>
              </div>
            </div>

            <div className="w-full h-[180px] rounded-[16px] overflow-hidden border border-black/10 shadow-xs relative bg-[#e9eef3] group">
              <iframe
                title={`Mapa do Restaurante ${restaurantePrincipal.name}`}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(details.address)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="100%"
                className="border-none w-full h-full relative z-10"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>

          </div>
        </section>


        <section className="bg-white rounded-[24px] shadow-lg p-6 sm:p-10 border border-black/5 flex flex-col gap-4">
          <h2 className="font-serif text-[22px] sm:text-[26px] font-extrabold text-black border-b border-black/5 pb-3">
            Sobre o Restaurante
          </h2>
          <p className="text-[15px] sm:text-[16px] text-black/75 leading-relaxed font-medium">
            {details.description}
          </p>
        </section>

        {details.gallery && details.gallery.length > 0 && (
          <section className="bg-white rounded-[24px] shadow-lg p-6 sm:p-10 border border-black/5 flex flex-col gap-6">
            <div className="flex flex-col gap-1 border-b border-black/5 pb-3">
              <h2 className="font-serif text-[22px] sm:text-[26px] font-extrabold text-black">
                Galeria de Fotos
              </h2>
              <p className="text-[12px] sm:text-[13px] font-bold text-black/40 uppercase tracking-wider">
                Conheça nosso espaço e nossas especialidades
              </p>
            </div>

            <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-4 h-[440px]">
              {details.gallery.slice(0, 5).map((imgUrl, idx) => {
                const isFeatured = idx === 0;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative overflow-hidden rounded-[16px] group cursor-pointer shadow-xs hover:shadow-md transition-all duration-300 ${isFeatured ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
                      }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Foto ${idx + 1} de ${restaurantePrincipal.name}`}
                      className="w-full h-full object-cover transition-transform duration-500 scale-100 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                      <div className="text-white opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 bg-white/20 p-3 rounded-full backdrop-blur-xs">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex md:hidden overflow-x-auto gap-4 scroll-smooth snap-x snap-mandatory pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {details.gallery.map((imgUrl, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className="flex-shrink-0 w-[260px] h-[190px] rounded-[16px] overflow-hidden snap-start relative active:scale-98 transition-transform"
                >
                  <img
                    src={imgUrl}
                    alt={`Foto ${idx + 1} de ${restaurantePrincipal.name}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-full text-white text-[11px] font-bold">
                    {idx + 1}/{details.gallery.length}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section ref={menuRef} className="bg-white rounded-[24px] shadow-lg p-6 sm:p-10 border border-black/5 flex flex-col gap-6 scroll-mt-6">
          <h2 className="font-serif text-[22px] sm:text-[26px] font-extrabold text-black border-b border-black/5 pb-3">
            Cardápio
          </h2>
          {pratosDoRestaurante.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {pratosDoRestaurante.map((dish) => (
                <DishCard
                  key={dish.id}
                  image={dish.image}
                  name={dish.name}
                  restaurant={dish.restaurant}
                  rating={dish.rating}
                  hideRating={true}
                  hideLink={true}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-black/40 font-bold">
              Nenhum prato cadastrado para este restaurante ainda.
            </div>
          )}
        </section>


        <section className="bg-white rounded-[24px] shadow-lg p-6 sm:p-10 border border-black/5 flex flex-col gap-8">


          <form onSubmit={handleEnviarAvaliacao} className="w-full bg-[#F8EDDB]/20 border border-black/10 rounded-[16px] p-6 flex flex-col gap-4">
            <div>
              <h2 className="font-serif text-[18px] sm:text-[20px] font-extrabold text-black">
                Avalie este restaurante
              </h2>
              <p className="text-[12px] sm:text-[13px] font-bold text-black/50 tracking-wide">
                Sua avaliação ajuda outros clientes a escolherem melhor!
              </p>
            </div>


            <div className="flex flex-col gap-2">
              <span className="text-[12px] font-bold text-[#C13D33] uppercase tracking-wider">Sua nota</span>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((index) => {
                  const isHalf = hoverNota ? (hoverNota === index - 0.5) : (nota === index - 0.5);
                  const isFull = hoverNota ? (hoverNota >= index) : (nota >= index);

                  return (
                    <div
                      key={index}
                      className="relative w-8 h-8 transition-transform hover:scale-110 shrink-0"
                    >
                      {/* Estrela de fundo: cinza claro */}
                      <svg
                        aria-hidden="true"
                        className="absolute top-0 left-0 w-8 h-8 text-neutral-200"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                          clipRule="evenodd"
                        />
                      </svg>

                      {/* Estrela de frente: amarela (cheia ou meia) */}
                      {(isFull || isHalf) && (
                        <div
                          className={`absolute top-0 left-0 h-full overflow-hidden ${isHalf ? "w-1/2" : "w-full"
                            }`}
                        >
                          <svg
                            aria-hidden="true"
                            className="w-8 h-8 text-amber-500"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}

                      {/* Botões invisíveis para as metades da estrela */}
                      <button
                        type="button"
                        onClick={() => setNota(nota === index - 0.5 ? 0 : index - 0.5)}
                        onMouseEnter={() => setHoverNota(index - 0.5)}
                        onMouseLeave={() => setHoverNota(0)}
                        className="absolute top-0 left-0 w-1/2 h-full z-10 bg-transparent border-none outline-none cursor-pointer"
                        aria-label={`Avaliar ${index - 0.5} estrelas`}
                      />
                      <button
                        type="button"
                        onClick={() => setNota(nota === index ? 0 : index)}
                        onMouseEnter={() => setHoverNota(index)}
                        onMouseLeave={() => setHoverNota(0)}
                        className="absolute top-0 right-0 w-1/2 h-full z-10 bg-transparent border-none outline-none cursor-pointer"
                        aria-label={`Avaliar ${index} estrelas`}
                      />
                    </div>
                  );
                })}
                {nota > 0 && (
                  <span className="ml-2 font-bold text-[14px] bg-[#E7CC9F]/35 px-2.5 py-0.5 rounded-full text-[#4A3C24]">
                    {nota.toFixed(1)} {nota === 1 ? "estrela" : "estrelas"}
                  </span>
                )}
              </div>
            </div>

            {/* Comentário e Botão */}
            <div className="flex flex-col gap-2">
              <label htmlFor="comentario-restaurante" className="text-[12px] font-bold text-black/40 uppercase tracking-wider">
                Seu comentário (opcional)
              </label>
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-end">
                <textarea
                  id="comentario-restaurante"
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  placeholder="Conte sua experiência, o que mais gostou, o atendimento..."
                  className="flex-1 min-h-[70px] max-h-[140px] resize-y rounded-[8px] border border-black/15 bg-white p-3 text-[14px] font-medium leading-relaxed text-black outline-none transition-all placeholder:text-black/30 focus:border-[#C13D33] focus:ring-1 focus:ring-[#C13D33]"
                />
                <button
                  type="submit"
                  className="h-[44px] sm:h-[40px] sm:w-[100px] rounded-[8px] bg-[#C13D33] text-[14px] font-bold text-white transition-colors hover:bg-[#a53229] outline-none shadow-sm active:scale-98 cursor-pointer shrink-0"
                >
                  Enviar
                </button>
              </div>
            </div>
          </form>

          {/* Listagem de Comentários */}
          <div className="flex flex-col gap-6">
            <h3 className="font-serif text-[18px] sm:text-[20px] font-bold text-black border-b border-black/5 pb-2">
              Opiniões dos clientes ({listaComentarios.length})
            </h3>

            <div className="flex flex-col gap-4">
              {comentariosExibidos.map((coment) => (
                <div
                  key={coment.id}
                  className="flex gap-4 items-start bg-neutral-50/50 p-4 rounded-[12px] border border-black/5 transition-all hover:bg-neutral-50"
                >
                  {/* Avatar */}
                  <div className="w-11 h-11 rounded-full bg-[#E7CC9F] text-[#4A3C24] font-extrabold flex items-center justify-center shrink-0 border border-[#E7CC9F] text-[15px]">
                    {coment.iniciais}
                  </div>

                  {/* Conteúdo */}
                  <div className="flex flex-col gap-1 w-full">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[15px] text-black">{coment.nome}</span>
                      <div className="flex items-center gap-1.5 text-[13px] font-extrabold bg-[#E7CC9F]/20 text-[#4A3C24] px-2 py-0.5 rounded-full border border-[#E7CC9F]/30">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-amber-500">
                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                        </svg>
                        <span>{coment.nota.toFixed(1)}</span>
                      </div>
                    </div>
                    <p className="text-[14px] text-black/75 leading-relaxed mt-1 font-medium italic">
                      "{coment.texto}"
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {listaComentarios.length > 2 && (
              <button
                type="button"
                onClick={() => setMostrarTodosComentarios(!mostrarTodosComentarios)}
                className="text-[#C13D33] font-bold text-[14px] hover:text-[#a53229] flex items-center gap-1 mt-2 self-start cursor-pointer transition-colors bg-transparent border-none outline-none"
              >
                <span>{mostrarTodosComentarios ? "Ocultar avaliações" : `Ver todas as ${listaComentarios.length} avaliações`}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className={`w-4 h-4 transition-transform duration-200 ${mostrarTodosComentarios ? "rotate-90" : ""}`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </button>
            )}

          </div>

        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-black/5 py-8 mt-12 bg-white text-center">
        <p className="text-[14px] text-black/40 font-semibold">
          &copy; 2026 Sabor Brasileiro. Todos os direitos reservados.
        </p>
      </footer>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && details.gallery && (
        <div
          onClick={handleCloseLightbox}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xs transition-opacity duration-300"
        >
          {/* Botão Fechar */}
          <button
            onClick={handleCloseLightbox}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full border border-white/10 cursor-pointer transition-colors z-50 outline-none"
            aria-label="Fechar galeria"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Seta Esquerda */}
          <button
            onClick={handlePrevImage}
            className="absolute left-4 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full border border-white/10 cursor-pointer transition-colors z-50 outline-none"
            aria-label="Foto anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Imagem Central */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-[90%] max-h-[80%] flex flex-col items-center gap-3"
          >
            <img
              src={details.gallery[selectedImageIndex]}
              alt={`Foto ampliada ${selectedImageIndex + 1} de ${restaurantePrincipal.name}`}
              className="max-w-full max-h-[70vh] md:max-h-[75vh] object-contain rounded-[12px] shadow-2xl border border-white/10 select-none"
            />
            <div className="text-white/80 text-[14px] font-bold bg-white/5 px-4 py-1.5 rounded-full border border-white/5 select-none">
              {selectedImageIndex + 1} / {details.gallery.length}
            </div>
          </div>

          {/* Seta Direita */}
          <button
            onClick={handleNextImage}
            className="absolute right-4 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full border border-white/10 cursor-pointer transition-colors z-50 outline-none"
            aria-label="Próxima foto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      )}

    </div>
  );
};

export default TelaRestaurante;
