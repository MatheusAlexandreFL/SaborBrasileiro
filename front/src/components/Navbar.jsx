import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = ({ searchQuery, setSearchQuery, onFilterClick, onMenuClick, userPhoto }) => {
  const defaultPhoto = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80";
  const [photo, setPhoto] = useState(userPhoto || localStorage.getItem("foto_perfil") || defaultPhoto);

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
            <Link to="/home" className="text-black font-semibold relative py-1 no-underline">
              Início
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C13D33] rounded-full"></span>
            </Link>
            <a href="#" className="text-black/60 hover:text-black transition-colors no-underline">
              Sobre nós
            </a>
          </div>
        </div>


        <div className="flex md:hidden items-center gap-2">
          <div className="relative group cursor-pointer flex items-center gap-1 p-1 rounded-full hover:bg-black/5 transition-all">
            <img
              src={photo}
              alt="Foto do usuário"
              className="w-[32px] h-[32px] rounded-full object-cover border border-[#C13D33]/20"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-black/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>


            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-black/5 py-2 hidden group-hover:block z-50 before:content-[''] before:absolute before:-top-2 before:left-0 before:w-full before:h-2">
              <Link to="/perfil" className="block px-4 py-2 text-sm text-black/70 hover:bg-black/5 no-underline hover:text-black">
                Meu Perfil
              </Link>
              <Link to="/cadastro" className="block px-4 py-2 text-sm text-black/70 hover:bg-black/5 no-underline hover:text-black border-t border-black/5">
                Cadastrar restaurante
              </Link>
              <Link to="/login" className="block px-4 py-2 text-sm text-black/70 hover:bg-black/5 no-underline hover:text-black border-t border-black/5">
                Sair
              </Link>
            </div>
          </div>
        </div>
      </div>


      <div className="flex items-center gap-3 w-full md:flex-1 md:max-w-[480px] md:mx-4">

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
        </div>


        <button
          onClick={onFilterClick}
          className="h-[40px] px-4 rounded-full border border-black/10 flex items-center gap-2 hover:bg-black/5 active:scale-95 transition-all cursor-pointer text-[14px] font-semibold text-black"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-black/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          Filtros
        </button>
      </div>


      <div className="hidden md:flex items-center gap-2">
        <div className="relative group cursor-pointer flex items-center gap-1.5 p-1 rounded-full hover:bg-black/5 transition-all">
          <img
            src={photo}
            alt="Foto do usuário"
            className="w-[36px] h-[36px] rounded-full object-cover border border-[#C13D33]/20"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-black/60 group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>


          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-black/5 py-2 hidden group-hover:block z-50 before:content-[''] before:absolute before:-top-2 before:left-0 before:w-full before:h-2">
            <Link to="/perfil" className="block px-4 py-2 text-sm text-black/70 hover:bg-black/5 no-underline hover:text-black">
              Meu Perfil
            </Link>
            <Link to="/cadastro" className="block px-4 py-2 text-sm text-black/70 hover:bg-black/5 no-underline hover:text-black border-t border-black/5">
              Cadastrar restaurante
            </Link>
            <Link to="/login" className="block px-4 py-2 text-sm text-black/70 hover:bg-black/5 no-underline hover:text-black border-t border-black/5">
              Sair
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
