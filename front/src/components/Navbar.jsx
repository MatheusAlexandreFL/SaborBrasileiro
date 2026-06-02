import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { restaurantService, userService } from "../services/api";

const Navbar = ({ searchQuery, setSearchQuery, onFilterClick, onMenuClick, userPhoto, hideSearch = false, hideFilter = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [allDishes, setAllDishes] = useState([]);

  useEffect(() => {
    const fetchSearchData = async () => {
      try {
        const { pratoService } = await import("../services/api");
        const [rests, prats] = await Promise.all([
          restaurantService.listar(),
          pratoService.listarPratos()
        ]);
        const mappedRests = rests.map(r => ({
          id: r.id,
          name: r.nome,
          rating: parseFloat(r.nota) || 0,
          category: r.categoria,
          location: `${r.cidade}, ${r.estado}`,
          image: r.imagem_url || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
          address: r.endereco,
          description: r.descricao
        }));
        setAllRestaurants(mappedRests);
        
        const mappedDishes = prats.map(prato => ({
          id: prato.id,
          restauranteId: prato.restaurante_id,
          restaurant: prato.restaurante_nome,
          name: prato.nome,
          description: prato.descricao,
          price: `R$ ${parseFloat(prato.preco).toFixed(2).replace('.', ',')}`,
          image: prato.foto_prato,
          rating: parseFloat(prato.media_avaliacoes) || 0
        }));
        setAllDishes(mappedDishes);
      } catch(e) {
        console.error("Erro ao carregar dados da busca", e);
      }
    };
    if (!hideSearch) {
        fetchSearchData();
    }
  }, [hideSearch]);

  const filteredRestaurantsFromSearch = allRestaurants.filter((r) => {
    const term = (searchQuery || "").toLowerCase().trim();
    if (!term) return false;
    const nameMatch = r.name.toLowerCase().includes(term);
    const categoryMatch = r.category.toLowerCase().includes(term);
    const locationMatch = r.location.toLowerCase().includes(term);
    const descriptionMatch = r.description?.toLowerCase().includes(term) || false;
    const addressMatch = r.address?.toLowerCase().includes(term) || false;
    const hasMatchingDish = allDishes.some(
      (d) => d.restauranteId === r.id && d.name.toLowerCase().includes(term)
    );
    return nameMatch || categoryMatch || locationMatch || descriptionMatch || addressMatch || hasMatchingDish;
  });

  const filteredDishesFromSearch = allDishes.filter((d) => {
    const term = (searchQuery || "").toLowerCase().trim();
    if (!term) return false;
    return d.name.toLowerCase().includes(term) || d.description?.toLowerCase().includes(term);
  });

  const handleSelectDishFromSearch = (dish) => {
    if (setSearchQuery) setSearchQuery("");
    navigate(`/prato/${dish.id}`, { state: dish });
  };

  const handleSelectRestaurantFromSearch = (res) => {
    if (setSearchQuery) setSearchQuery("");
    navigate(`/restaurante/${res.id}`, { state: res });
  };
  const isHome = location.pathname === "/" || location.pathname === "/home";
  const isSobreNos = location.pathname === "/sobre-nos";
  const defaultPhoto = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80";
  const [photo, setPhoto] = useState(userPhoto || localStorage.getItem("foto_perfil") || defaultPhoto);
  const [tipoUsuario, setTipoUsuario] = useState("cliente");

  useEffect(() => {
    const fetchUserType = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const perfil = await userService.getPerfil();
          setTipoUsuario(perfil.tipoUsuario || "cliente");
        }
      } catch (e) {
        console.error("Erro ao obter tipoUsuario na Navbar", e);
      }
    };
    fetchUserType();
  }, []);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const mobileRef = useRef(null);
  const desktopRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (mobileRef.current && !mobileRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
      if (desktopRef.current && !desktopRef.current.contains(event.target)) {
        setIsDesktopMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (userPhoto !== undefined) {
      setPhoto(userPhoto || defaultPhoto);
    } else {
      const stored = localStorage.getItem("foto_perfil");
      if (stored) {
        setPhoto(stored);
      }
    }
  }, [userPhoto]);
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-black/10 px-4 py-3 md:px-6 md:py-4 flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4 transition-all duration-300">


      <div className="flex items-center justify-between w-full md:w-auto">
        <div className="flex items-center gap-3 md:gap-6">
          <button
            type="button"
            onClick={onMenuClick}
            className="md:hidden p-1.5 rounded-lg text-black hover:bg-black/5 cursor-pointer transition-all active:scale-95 flex items-center justify-center"
            aria-label="Abrir menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <Link to="/home" className="text-[#C13D33] text-[22px] md:text-[25px] font-extrabold no-underline hover:opacity-90 transition-opacity font-serif italic">
            Sabor Brasileiro
          </Link>


          <div className="hidden md:flex items-center gap-6 text-[15px] font-medium">
            <Link to="/home" className={`py-1 no-underline transition-colors ${isHome ? "text-black font-semibold relative" : "text-black/60 hover:text-black"}`}>
              Início
              {isHome && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C13D33] rounded-full"></span>}
            </Link>
            <Link to="/sobre-nos" className={`py-1 no-underline transition-colors ${isSobreNos ? "text-black font-semibold relative" : "text-black/60 hover:text-black"}`}>
              Sobre nós
              {isSobreNos && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C13D33] rounded-full"></span>}
            </Link>
          </div>
        </div>


        <div className="flex md:hidden items-center gap-2" ref={mobileRef}>
          <div 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="relative cursor-pointer flex items-center gap-1 p-1 rounded-full hover:bg-black/5 transition-all"
          >
            <img
              src={photo}
              alt="Foto do usuário"
              className="w-[32px] h-[32px] rounded-full object-cover border border-[#C13D33]/20"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-black/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>

            {isMobileMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-black/5 py-2 z-50" onClick={(e) => e.stopPropagation()}>
                <Link to="/perfil" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 text-sm text-black/70 hover:bg-black/5 no-underline hover:text-black">
                  Meu Perfil
                </Link>
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 text-sm text-black/70 hover:bg-black/5 no-underline hover:text-black border-t border-black/5">
                  Sair
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>


      {(!hideSearch || !hideFilter) && (
        <div className="flex items-center gap-3 w-full md:flex-1 md:max-w-[480px] md:mx-4">
          {!hideSearch && (
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Buscar restaurante ou prato..."
                value={searchQuery || ""}
                onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
                className="w-full h-[40px] pl-10 pr-4 rounded-full border border-black/10 bg-[#F5E6CA]/20 focus:bg-white focus:border-[#C13D33] focus:ring-1 focus:ring-[#C13D33] outline-none text-[14px] transition-all"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              {(searchQuery || "").trim().length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-black/5 z-50 overflow-hidden py-2 animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="max-h-[360px] overflow-y-auto no-scrollbar pb-2">
                    {filteredRestaurantsFromSearch.length > 0 && (
                      <>
                        <div className="px-4 py-1.5 border-b border-black/5 mb-1.5 sticky top-0 bg-white/95 backdrop-blur-sm z-10">
                          <span className="text-[11px] font-bold text-black/40 uppercase tracking-wider">
                            Restaurantes ({filteredRestaurantsFromSearch.length})
                          </span>
                        </div>
                        {filteredRestaurantsFromSearch.map((res) => (
                          <div
                            key={res.id}
                            onClick={() => handleSelectRestaurantFromSearch(res)}
                            className="px-4 py-2 hover:bg-[#F8EDDB]/35 flex items-center gap-3 cursor-pointer transition-colors"
                          >
                            <img src={res.image} alt={res.name} className="w-10 h-10 rounded-lg object-cover border border-black/5 shrink-0" />
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
                      </>
                    )}
                    {filteredDishesFromSearch.length > 0 && (
                      <>
                        <div className="px-4 py-1.5 border-b border-t border-black/5 mb-1.5 mt-1 sticky top-0 bg-white/95 backdrop-blur-sm z-10">
                          <span className="text-[11px] font-bold text-black/40 uppercase tracking-wider">
                            Pratos ({filteredDishesFromSearch.length})
                          </span>
                        </div>
                        {filteredDishesFromSearch.map((dish) => (
                          <div
                            key={dish.id}
                            onClick={() => handleSelectDishFromSearch(dish)}
                            className="px-4 py-2 hover:bg-[#F8EDDB]/35 flex items-center gap-3 cursor-pointer transition-colors"
                          >
                            <img src={dish.image} alt={dish.name} className="w-10 h-10 rounded-lg object-cover border border-black/5 shrink-0" />
                            <div className="flex flex-col gap-0.5 min-w-0">
                              <span className="font-bold text-[13px] text-black truncate">{dish.name}</span>
                              <div className="flex items-center gap-1.5 text-[10px] font-semibold text-black/50">
                                <span className="text-[#4A3C24] font-bold">{dish.price}</span>
                                <span>&bull;</span>
                                <span className="truncate text-black/40 font-medium">{dish.restaurant}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                    {filteredRestaurantsFromSearch.length === 0 && filteredDishesFromSearch.length === 0 && (
                      <div className="px-4 py-4 text-center text-[12px] font-semibold text-black/45">
                        Nenhum resultado encontrado.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {!hideFilter && (
            <button
              onClick={onFilterClick}
              className="h-[40px] px-4 rounded-full border border-black/10 flex items-center gap-2 hover:bg-black/5 active:scale-95 transition-all cursor-pointer text-[14px] font-semibold text-black shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-black/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              Filtros
            </button>
          )}
        </div>
      )}


      <div className="hidden md:flex items-center gap-2" ref={desktopRef}>
        <div 
          onClick={() => setIsDesktopMenuOpen(!isDesktopMenuOpen)}
          className="relative cursor-pointer flex items-center gap-1.5 p-1 rounded-full hover:bg-black/5 transition-all"
        >
          <img
            src={photo}
            alt="Foto do usuário"
            className="w-[36px] h-[36px] rounded-full object-cover border border-[#C13D33]/20"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-black/60 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>

          {isDesktopMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-black/5 py-2 z-50" onClick={(e) => e.stopPropagation()}>
              <Link to="/perfil" onClick={() => setIsDesktopMenuOpen(false)} className="block px-4 py-2 text-sm text-black/70 hover:bg-black/5 no-underline hover:text-black">
                Meu Perfil
              </Link>
              <Link to="/login" onClick={() => setIsDesktopMenuOpen(false)} className="block px-4 py-2 text-sm text-black/70 hover:bg-black/5 no-underline hover:text-black border-t border-black/5">
                Sair
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
