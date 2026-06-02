import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { restaurantService } from "../services/api";

const HeaderSearch = ({ hideBackButton = false }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
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
    fetchSearchData();
  }, []);

  const filteredRestaurantsFromSearch = allRestaurants.filter((r) => {
    const term = searchQuery.toLowerCase().trim();
    if (!term) return [];

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
    const term = searchQuery.toLowerCase().trim();
    if (!term) return false;
    return d.name.toLowerCase().includes(term) || d.description?.toLowerCase().includes(term);
  });

  const handleSelectDishFromSearch = (dish) => {
    setSearchQuery("");
    navigate(`/prato/${dish.id}`, {
      state: dish
    });
  };

  const handleSelectRestaurantFromSearch = (res) => {
    setSearchQuery("");
    navigate(`/restaurante/${res.id}`, {
      state: {
        id: res.id,
        name: res.name,
        rating: res.rating,
        category: res.category,
        location: res.location,
        image: res.image,
        address: res.address,
        description: res.description
      }
    });
  };

  return (
      <header className="max-w-[1000px] w-full mx-auto px-4 sm:px-6 pt-6 flex justify-between items-center z-35 relative gap-4 mb-6">
        {!hideBackButton && (
          <button
            onClick={() => navigate(-1)}
            className="bg-white text-black px-4 py-2 rounded-full shadow-md border border-black/10 hover:bg-black/5 cursor-pointer font-bold text-[14px] flex items-center gap-1.5 transition-all outline-none shrink-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            <span>Voltar</span>
          </button>
        )}

        {/* Barra de Busca de Restaurantes */}
        <div className="relative w-full max-w-[320px] ml-auto">
          <div className="flex items-center gap-2 bg-white border border-black/10 rounded-full px-4 py-2 shadow-xs hover:shadow-md transition-all duration-300">
            <svg
              aria-hidden="true"
              className="h-4.5 w-4.5 text-black/40 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-10 h-10 rounded-lg object-cover border border-black/5 shrink-0"
                        />
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
      </header>
  );
};

export default HeaderSearch;
