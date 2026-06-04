import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { RESTAURANTS } from "../mockData";
import DishCard from "../components/DishCard";
import AdicionarPratoModal from "../components/AdicionarPratoModal";
import { useToast } from "../context/ToastContext";
import { restaurantService, avaliacaoService, userService } from "../services/api";
import usePratos from "../hooks/usePratos";
import HeaderSearch from "../components/HeaderSearch";

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
    gallery: []
  },
  "Verde & Mar": {
    address: "Avenida Atlântica, 450 - Copacabana, Rio de Janeiro, RJ - CEP 22010-000",
    description: "Com uma vista deslumbrante e o aroma do mar, o Verde & Mar combina a culinária saudável com pescados frescos e frutos do mar preparados na brasa. Nossos pratos valorizam os sabores naturais com temperos leves, ervas frescas e azeites artesanais premium. O ambiente arejado e a decoração praiana proporcionam uma experiência gastronômica relaxante e inesquecível na orla carioca.",
    gallery: []
  },
  "Cantina Bella Italia": {
    address: "Rua São Clemente, 312 - Botafogo, Rio de Janeiro, RJ - CEP 22260-004",
    description: "A Cantina Bella Italia traz o melhor da tradição gastronômica italiana diretamente para o Rio de Janeiro. Nossas massas são de fabricação artesanal diária, preparadas com sêmola de grano duro importada e servidas com molhos encorpados e aromáticos que cozinham por horas. Dos antepastos clássicos aos risotos trufados, cada detalhe é pensado para recriar o clima caloroso de um almoço em família na Itália.",
    gallery: []
  },
  "Bife & Brasa": {
    address: "Rua Voluntários da Pátria, 89 - Botafogo, Rio de Janeiro, RJ - CEP 22270-000",
    description: "O Bife & Brasa é o destino ideal para os amantes de carne e hambúrgueres artesanais grelhados na brasa perfeita. Nossos blends são moídos diariamente com cortes selecionados de Angus certificado, garantindo suculência máxima. O pão macio brioche, o queijo derretido e os molhos autorais completam a experiência no nosso ambiente rústico e moderno.",
    gallery: []
  },
  "Doce Suspiro": {
    address: "Rua Visconde de Pirajá, 150 - Ipanema, Rio de Janeiro, RJ - CEP 22410-002",
    description: "A Doce Suspiro é um pedacinho de céu para quem ama sobremesas finas e confeitaria de alta qualidade. Combinando técnicas clássicas francesas com ingredientes tradicionais brasileiros, nosso menu traz de tortas de chocolate belga a panna cottas delicadas com de framboesas frescas. Perfeito para uma tarde especial ou para adoçar qualquer momento do dia.",
    gallery: []
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
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const menuRef = useRef(null);

  const [restauranteInfo, setRestauranteInfo] = useState(location.state || null);

  useEffect(() => {
    if (location.state) {
      setRestauranteInfo(location.state);
    }
  }, [location.state]);

  const [meusRestaurantesIds, setMeusRestaurantesIds] = useState([]);


  const restaurantePrincipal = restauranteInfo || {
    id: id || (meusRestaurantesIds.length > 0 ? meusRestaurantesIds[0] : null),
    name: "Carregando...",
    rating: 0,
    category: "...",
    location: "...",
    image: ""
  };

  const details = RESTAURANT_DETAILS[restaurantePrincipal.name] || {
    address: "Rua das flores, 122 - Botafogo, Rio de Janeiro, RJ - CEP 22250-060",
    description: "Um espaço acolhedor e charmoso focado em proporcionar uma experiência gastronômica marcante com atendimento atencioso, ingredientes selecionados e pratos deliciosos preparados com excelência.",
    gallery: []
  };

  const displayAddress = restaurantePrincipal.address || details.address;
  const displayDescription = restaurantePrincipal.description || details.description;

  let galleryImages = details.gallery;
  if (restaurantePrincipal.galeria) {
    try {
      galleryImages = JSON.parse(restaurantePrincipal.galeria);
    } catch (e) {
      galleryImages = details.gallery;
    }
  }

  const [listaComentarios, setListaComentarios] = useState([]);
  const [mostrarTodosComentarios, setMostrarTodosComentarios] = useState(false);
  const [nota, setNota] = useState(0);
  const [hoverNota, setHoverNota] = useState(0);
  const [comentario, setComentario] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [meuUserId, setMeuUserId] = useState(null);
  const [meuNome, setMeuNome] = useState("");
  const [isFetchingUser, setIsFetchingUser] = useState(true);
  const [tipoUsuario, setTipoUsuario] = useState("cliente");
  const [isAddFotoOpen, setIsAddFotoOpen] = useState(false);
  const [novaFotoUrl, setNovaFotoUrl] = useState("");

  const { dishes, refetch } = usePratos(restaurantePrincipal.id);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const data = await userService.getPerfil();
          setTipoUsuario(data.tipoUsuario || "cliente");
          setMeuUserId(data.id);
          setMeuNome(data.nome);
          if (data.restaurante_ids) {
            setMeusRestaurantesIds(data.restaurante_ids);
          }
        }
      } catch (e) {
        console.error("Erro ao buscar perfil:", e);
      } finally {
        setIsFetchingUser(false);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchDados = async () => {
      if (!id && isFetchingUser) return;

      const restId = id || (meusRestaurantesIds.length > 0 ? meusRestaurantesIds[0] : null);
      if (!restId) return;

      try {
        const restData = await restaurantService.buscarPorId(restId);
        setRestauranteInfo({
          id: restData.id,
          name: restData.nome,
          rating: parseFloat(restData.nota) || 0,
          category: restData.categoria,
          location: `${restData.cidade}, ${restData.estado}`,
          image: restData.imagem_url || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
          address: restData.endereco_completo || "Endereço não informado",
          description: restData.descricao || details.description,
          galeria: restData.galeria
        });


        const avaliacoes = await avaliacaoService.listar({ id_restaurante: restId, apenas_restaurante: true });
        const comentariosFormatados = avaliacoes.map(av => ({
          id: av.id,
          id_usuario: av.id_usuario,
          nome: av.usuario_nome || "Usuário",
          iniciais: av.usuario_nome ? av.usuario_nome.substring(0, 2).toUpperCase() : "US",
          foto: av.usuario_foto,
          nota: parseFloat(av.nota),
          texto: av.comentario
        }));
        setListaComentarios(comentariosFormatados);
      } catch (e) {
        console.error("Erro ao carregar dados do restaurante", e);
      }
    };

    fetchDados();
    window.scrollTo(0, 0);
  }, [id, meusRestaurantesIds, isFetchingUser]);



  const handlePrevImage = (e) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null && galleryImages) {
      setSelectedImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
    }
  };

  const handleNextImage = (e) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null && galleryImages) {
      setSelectedImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
    }
  };

  const handleCloseLightbox = () => {
    setSelectedImageIndex(null);
  };


  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImageIndex !== null) {
        if (e.key === "ArrowLeft") handlePrevImage(e);
        if (e.key === "ArrowRight") handleNextImage(e);
        if (e.key === "Escape") handleCloseLightbox();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex]);

  // Calculo de média
  const mediaGeral = listaComentarios.length > 0
    ? listaComentarios.reduce((soma, item) => soma + item.nota, 0) / listaComentarios.length
    : restaurantePrincipal.rating;


  const pratosDoRestaurante = dishes;

  const comentariosExibidos = mostrarTodosComentarios ? listaComentarios : listaComentarios.slice(0, 2);

  if (!id && meusRestaurantesIds.length === 0 && !isFetchingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Aguardando dados...</h2>
          <p className="text-gray-700">Por favor, reinicie o backend e o front para garantir que as atualizações funcionem.</p>
          <p className="text-gray-500 text-sm mt-4">Caso já tenha feito isso, deslogue e logue de novo.</p>
        </div>
      </div>
    );
  }

  const handleScrollToMenu = () => {
    menuRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleEnviarAvaliacao = async (e) => {
    e.preventDefault();
    if (nota === 0) {
      toast.warning("Por favor, selecione uma nota antes de enviar.");
      return;
    }

    try {
      const novaAvaliacao = await avaliacaoService.criar({
        id_restaurante: parseInt(restaurantePrincipal.id, 10),
        nota: parseFloat(nota),
        comentario: comentario.trim() || "Avaliou este restaurante sem deixar comentário."
      });

      const avLocal = {
        id: novaAvaliacao.id || Date.now(),
        id_usuario: meuUserId,
        nome: meuNome || "Você",
        iniciais: meuNome ? meuNome.substring(0, 2).toUpperCase() : "VC",
        foto: null,
        nota: parseFloat(novaAvaliacao.nota) || nota,
        texto: comentario.trim() || "Avaliou este restaurante sem deixar comentário."
      };

      setListaComentarios([avLocal, ...listaComentarios]);
      setNota(0);
      setHoverNota(0);
      setComentario("");
      setMostrarTodosComentarios(true);
      toast.success("Obrigado! Sua avaliação foi adicionada com sucesso.");
    } catch (e) {
      console.error(e);
      toast.error(e.response?.data?.error || "Erro ao adicionar avaliação.");
    }
  };

  const handleConfirmarAdicionarFoto = async () => {
    if (!novaFotoUrl.trim()) {
      toast.warning("Por favor, insira uma URL válida.");
      return;
    }

    try {
      let currentGallery = [];
      if (restaurantePrincipal.galeria) {
        try {
          currentGallery = JSON.parse(restaurantePrincipal.galeria);
        } catch (e) {
          currentGallery = [];
        }
      } else {
        currentGallery = [...details.gallery];
      }

      currentGallery.push(novaFotoUrl.trim());

      const { restaurantService } = await import("../services/api");
      const updatedRest = await restaurantService.atualizar(restaurantePrincipal.id, {
        nome: restaurantePrincipal.name,
        galeria: JSON.stringify(currentGallery)
      });

      setRestauranteInfo({
        ...restaurantePrincipal,
        galeria: updatedRest.galeria
      });

      toast.success("Foto adicionada com sucesso!");
      setIsAddFotoOpen(false);
      setNovaFotoUrl("");
    } catch (error) {
      toast.error(error.response?.data?.error || "Erro ao adicionar foto.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8EDDB]/30 flex flex-col font-sans text-black relative">

      <HeaderSearch />

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
                  {displayAddress}
                </address>
              </div>
            </div>

            <div className="w-full h-[180px] rounded-[16px] overflow-hidden border border-black/10 shadow-xs relative bg-[#e9eef3] group">
              <iframe
                title={`Mapa do Restaurante ${restaurantePrincipal.name}`}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(displayAddress)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
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
            {displayDescription}
          </p>
        </section>

        {((galleryImages && galleryImages.length > 0) || (tipoUsuario === "dono" && meusRestaurantesIds.includes(Number(restaurantePrincipal.id)))) && (
          <section className="bg-white rounded-[24px] shadow-lg p-6 sm:p-10 border border-black/5 flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-black/5 pb-3">
              <div>
                <h2 className="font-serif text-[22px] sm:text-[26px] font-extrabold text-black">
                  Galeria de Fotos
                </h2>
                <p className="text-[12px] sm:text-[13px] font-bold text-black/40 uppercase tracking-wider">
                  Conheça nosso espaço e nossas especialidades
                </p>
              </div>
              {tipoUsuario === "dono" && meusRestaurantesIds.includes(Number(restaurantePrincipal.id)) && (
                <button
                  type="button"
                  onClick={() => setIsAddFotoOpen(true)}
                  className="px-4 h-[38px] bg-white text-[#C13D33] border-2 border-[#C13D33] hover:bg-[#C13D33]/10 text-[13px] font-bold rounded-[8px] cursor-pointer flex items-center justify-center transition-colors active:scale-98 uppercase tracking-wider"
                >
                  Adicionar Foto
                </button>
              )}
            </div>

            {galleryImages.length > 0 ? (
              <>
                <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-4 h-[440px]">
                  {galleryImages.slice(0, 5).map((imgUrl, idx) => {
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
                  {galleryImages.map((imgUrl, idx) => (
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
                        {idx + 1}/{galleryImages.length}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-10 bg-neutral-50/50 rounded-[12px] border border-dashed border-black/10 flex flex-col items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-black/30">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                </svg>
                <p className="text-[14px] text-black/40 font-bold uppercase">Sua galeria está vazia</p>
                <p className="text-[12px] text-black/30 font-semibold max-w-[260px] text-center">Adicione fotos do seu estabelecimento para atrair mais clientes!</p>
              </div>
            )}
          </section>
        )}

        <section ref={menuRef} className="bg-white rounded-[24px] shadow-lg p-6 sm:p-10 border border-black/5 flex flex-col gap-6 scroll-mt-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-black/5 pb-3">
            <h2 className="font-serif text-[22px] sm:text-[26px] font-extrabold text-black">
              Cardápio
            </h2>
            {tipoUsuario === "dono" && meusRestaurantesIds.includes(Number(restaurantePrincipal.id)) && (
              <div className="w-full sm:w-[180px]">
                <AdicionarPratoModal
                  onPratoAdicionado={refetch}
                  restaurantes={[{ id: restaurantePrincipal.id, nome: restaurantePrincipal.name }]}
                  restauranteIdInicial={restaurantePrincipal.id}
                />
              </div>
            )}
          </div>
          {pratosDoRestaurante.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {pratosDoRestaurante.map((dish) => (
                <DishCard
                  key={dish.id}
                  id={dish.id}
                  image={dish.image}
                  name={dish.name}
                  restaurant={dish.restaurant}
                  restauranteId={dish.restauranteId}
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


          {(!meusRestaurantesIds.includes(Number(restaurantePrincipal.id))) && (
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
          )}

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
                  {coment.foto ? (
                    <img src={coment.foto} alt={coment.nome} className="w-11 h-11 rounded-full object-cover shrink-0 border border-black/10" />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-[#E7CC9F] text-[#4A3C24] font-extrabold flex items-center justify-center shrink-0 border border-[#E7CC9F] text-[15px]">
                      {coment.iniciais}
                    </div>
                  )}

                  {/* Conteúdo */}
                  <div className="flex flex-col gap-1 w-full">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[15px] text-black">
                        {coment.id_usuario === meuUserId ? "Você" : coment.nome}
                      </span>
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
      {selectedImageIndex !== null && galleryImages && (
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
              src={galleryImages[selectedImageIndex]}
              alt={`Foto ampliada ${selectedImageIndex + 1} de ${restaurantePrincipal.name}`}
              className="max-w-full max-h-[70vh] md:max-h-[75vh] object-contain rounded-[12px] shadow-2xl border border-white/10 select-none"
            />
            <div className="text-white/80 text-[14px] font-bold bg-white/5 px-4 py-1.5 rounded-full border border-white/5 select-none">
              {selectedImageIndex + 1} / {galleryImages.length}
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

      {/* Modal Adicionar Foto */}
      {isAddFotoOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsAddFotoOpen(false)}></div>
          <div className="relative bg-white w-full max-w-[420px] rounded-[24px] shadow-2xl p-6 sm:p-8 flex flex-col gap-4 border border-black/5 animate-in fade-in zoom-in-95 duration-200">
            <h2 className="font-serif text-[20px] font-extrabold text-black">Adicionar Foto à Galeria</h2>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-black/40 uppercase tracking-wider">URL da Foto</label>
              <input
                type="url"
                value={novaFotoUrl}
                onChange={(e) => setNovaFotoUrl(e.target.value)}
                placeholder="https://exemplo.com/foto.jpg"
                className="w-full h-[48px] bg-neutral-100 rounded-[15px] px-4 text-[15px] border-none focus:ring-2 focus:ring-[#C13D33] outline-none text-black font-semibold"
              />
            </div>
            <div className="flex justify-end gap-3 mt-2">
              <button
                type="button"
                onClick={() => setIsAddFotoOpen(false)}
                className="px-5 h-[40px] rounded-full text-[13px] font-bold bg-neutral-100 text-black/60 hover:bg-neutral-200 transition-colors border-none outline-none cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmarAdicionarFoto}
                className="px-5 h-[40px] rounded-full text-[13px] font-bold bg-[#C13D33] text-white hover:bg-[#a53229] transition-colors border-none outline-none cursor-pointer"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default TelaRestaurante;
