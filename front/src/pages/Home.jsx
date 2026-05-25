import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import RestaurantCard from "../components/RestaurantCard";
import DishCard from "../components/DishCard";
import { CATEGORIES, RESTAURANTS, DISHES, HERO_COLLAGE } from "../mockData";


const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Início");


  const filteredRestaurants = RESTAURANTS.filter((r) => {
    const matchesCategory = selectedCategory === "all" || r.categoryKey === selectedCategory;
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredDishes = DISHES.filter((d) => {
    const matchesCategory = selectedCategory === "all" || d.categoryKey === selectedCategory;
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.restaurant.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).slice(0, 5);

  return (
    <div className="min-h-screen bg-[#F8EDDB]/30 flex flex-col font-sans text-black">

      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onMenuClick={() => setIsSidebarOpen(true)}
      />


      <main className="flex-1 max-w-[1200px] w-full mx-auto px-6 py-8 flex flex-col gap-12">


        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-4">

          <div className="lg:col-span-6 flex flex-col justify-center gap-4 text-left">
            <h1 className="font-serif text-[42px] md:text-[48px] font-extrabold text-black leading-[1.15] tracking-tight">
              Os sabores mais amados, <br />
              os lugares mais <br />
              <span className="text-[#C13D33]">bem avaliados</span>
            </h1>
            <div className="w-[100px] h-[3px] bg-[#C13D33] my-2"></div>
            <p className="text-[18px] text-black/60 font-medium leading-relaxed max-w-[480px]">
              Descubra lugares incríveis, pratos inesquecíveis e experiências únicas.
            </p>
          </div>


          <div className="lg:col-span-6 flex justify-end">
            <div className="grid grid-cols-5 gap-2 max-w-[500px] w-full">
              {HERO_COLLAGE.map((imgUrl, index) => (
                <div
                  key={index}
                  className={`relative overflow-hidden rounded-[8px] bg-black/5 aspect-square transition-all duration-300 hover:scale-105 hover:z-10 shadow-xs hover:shadow-md ${index % 3 === 0 ? "scale-95" : ""
                    }`}
                >
                  <img
                    src={imgUrl}
                    alt={`Sabor Collage ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>


        <section className="flex flex-col gap-4 mt-4 border-t border-black/5 pt-8">
          <h2 className="text-[15px] font-bold text-black/40 uppercase tracking-wider">
            Filtrar por Categoria
          </h2>
          <div className="flex overflow-x-auto gap-2.5 pb-2 no-scrollbar -mx-6 px-6 md:mx-0 md:px-0 md:flex-wrap">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-[14px] font-bold transition-all duration-200 cursor-pointer ${selectedCategory === category.id
                  ? "bg-[#C13D33] text-white shadow-sm border border-transparent"
                  : "bg-white text-black/60 border border-black/10 hover:bg-black/5 hover:text-black"
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </section>

        {/* RESTAURANTS SECTION */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 border-b border-black/5 pb-3">
            <h2 className="font-serif text-[24px] md:text-[28px] font-extrabold text-black">
              Os restaurantes <span className="text-[#C13D33]">mais bem avaliados</span> da semana
            </h2>
            <a
              href="#"
              className="text-[#C13D33] font-bold text-[14px] no-underline hover:underline flex items-center gap-1 group"
            >
              <span>Ver todos</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>

          {filteredRestaurants.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {filteredRestaurants.map((restaurant, idx) => (
                <RestaurantCard
                  key={restaurant.id}
                  rank={idx + 1}
                  image={restaurant.image}
                  name={restaurant.name}
                  rating={restaurant.rating}
                  category={restaurant.category}
                  location={restaurant.location}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-[19px] border border-black/5 shadow-xs">
              <p className="text-black/50 font-medium">Nenhum restaurante encontrado para a sua busca.</p>
            </div>
          )}
        </section>

        {/* FEATURED DISHES SECTION */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 border-b border-black/5 pb-3">
            <h2 className="font-serif text-[24px] md:text-[28px] font-extrabold text-black">
              Pratos em destaque
            </h2>
            <a
              href="#"
              className="text-[#C13D33] font-bold text-[14px] no-underline hover:underline flex items-center gap-1 group"
            >
              <span>Ver todos</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>

          {filteredDishes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {filteredDishes.map((dish) => (
                <DishCard
                  key={dish.id}
                  image={dish.image}
                  name={dish.name}
                  rating={dish.rating}
                  restaurant={dish.restaurant}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-[19px] border border-black/5 shadow-xs">
              <p className="text-black/50 font-medium">Nenhum prato encontrado para a sua busca.</p>
            </div>
          )}
        </section>

        {/* CALL TO ACTION (CTA) SECTION */}
        <section className="bg-white rounded-[24px] border border-black/5 overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-300 p-8 md:p-12 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

            {/* Left Copywriting */}
            <div className="md:col-span-7 flex flex-col gap-4 text-left">
              <h2 className="font-serif text-[32px] md:text-[36px] font-extrabold text-black leading-tight">
                Tem um restaurante?
              </h2>
              <p className="text-[16px] text-black/60 font-medium leading-relaxed max-w-[480px]">
                Cadastre seu restaurante, adicione fotos do ambiente e dos pratos e faça parte da nossa comunidade!
              </p>
              <Link
                to="/cadastro"
                className="w-fit mt-4 bg-[#C13D33] text-white font-bold text-[15px] px-8 py-3.5 rounded-[8px] no-underline hover:bg-[#a53229] transition-colors shadow-xs active:scale-98 flex items-center gap-2 group"
              >
                <span>Cadastrar restaurante</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            {/* Right Graphic/Illustration */}
            <div className="md:col-span-5 flex justify-center md:justify-end">
              <svg
                width="340"
                height="220"
                viewBox="0 0 340 220"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full max-w-[340px]"
              >
                {/* Storefront background */}
                <rect x="180" y="80" width="140" height="120" rx="12" fill="#F8EDDB" stroke="#E7CC9F" strokeWidth="3" />

                {/* Store door */}
                <rect x="205" y="130" width="35" height="70" rx="4" fill="#D38C5F" />
                <circle cx="212" cy="165" r="3" fill="#FFE5A3" />

                {/* Store window */}
                <rect x="255" y="130" width="45" height="40" rx="4" fill="#FFFFFF" stroke="#E7CC9F" strokeWidth="2" />
                <line x1="255" y1="150" x2="300" y2="150" stroke="#E7CC9F" strokeWidth="1.5" />
                <line x1="277.5" y1="130" x2="277.5" y2="170" stroke="#E7CC9F" strokeWidth="1.5" />

                {/* Awning (Toldinho listrado) */}
                <path d="M170 80h160v15H170z" fill="#C13D33" />
                <path d="M170 95c0 6 5 10 10 10s10-4 10-10M190 95c0 6 5 10 10 10s10-4 10-10M210 95c0 6 5 10 10 10s10-4 10-10M230 95c0 6 5 10 10 10s10-4 10-10M250 95c0 6 5 10 10 10s10-4 10-10M270 95c0 6 5 10 10 10s10-4 10-10M290 95c0 6 5 10 10 10s10-4 10-10M310 95c0 6 5 10 10 10s10-4 10-10" fill="#E7CC9F" />
                <path d="M170 95c0 6 5 10 10 10s10-4 10-10" fill="#C13D33" />
                <path d="M190 95c0 6 5 10 10 10s10-4 10-10" fill="#FFFFFF" />
                <path d="M210 95c0 6 5 10 10 10s10-4 10-10" fill="#C13D33" />
                <path d="M230 95c0 6 5 10 10 10s10-4 10-10" fill="#FFFFFF" />
                <path d="M250 95c0 6 5 10 10 10s10-4 10-10" fill="#C13D33" />
                <path d="M270 95c0 6 5 10 10 10s10-4 10-10" fill="#FFFFFF" />
                <path d="M290 95c0 6 5 10 10 10s10-4 10-10" fill="#C13D33" />
                <path d="M310 95c0 6 5 10 10 10s10-4 10-10" fill="#FFFFFF" />

                {/* Decorative Plant */}
                <rect x="305" y="185" width="12" height="15" fill="#D38C5F" />
                <circle cx="311" cy="180" r="10" fill="#5F9F7F" />
                <circle cx="305" cy="175" r="8" fill="#4B8C6C" />
                <circle cx="317" cy="176" r="8" fill="#4B8C6C" />

                {/* Characters (Chef & Waitress) */}
                {/* Male Chef */}
                <circle cx="65" cy="90" r="16" fill="#F8EDDB" stroke="#4A3C24" strokeWidth="2" />
                <path d="M57 90s2 4 8 4 8-4 8-4" stroke="#4A3C24" strokeWidth="2" strokeLinecap="round" />
                {/* Chef Hat */}
                <path d="M52 74c0-8 6-12 13-12s13 4 13 12H52z" fill="#FFFFFF" stroke="#4A3C24" strokeWidth="2" />
                <rect x="55" y="72" width="20" height="6" fill="#FFFFFF" stroke="#4A3C24" strokeWidth="2" />
                {/* Chef Body */}
                <path d="M45 200c0-30 8-40 20-40s20 10 20 40H45z" fill="#3D4A5C" />
                <path d="M65 160v40" stroke="#FFFFFF" strokeWidth="2" />
                {/* Bow tie */}
                <path d="M61 164l8 4v-8l-8 4z" fill="#C13D33" />
                <path d="M69 164l-8 4v-8l8 4z" fill="#C13D33" />

                {/* Female Waitress */}
                <circle cx="115" cy="95" r="15" fill="#F8EDDB" stroke="#4A3C24" strokeWidth="2" />
                <path d="M109 97s2 3 6 3 6-3 6-3" stroke="#4A3C24" strokeWidth="2" strokeLinecap="round" />
                {/* Hair */}
                <path d="M100 95c0-10 6-15 15-15s15 5 15 15c0 4-2 6-4 6s-4-6-11-6-11 6-11 6-4-2-4-6z" fill="#E88C7D" />
                {/* Body */}
                <path d="M98 200c0-25 7-35 17-35s17 10 17 35H98z" fill="#2C3539" />
                {/* Apron */}
                <path d="M108 175h14v25h-14z" fill="#FFFFFF" />

                {/* Tray with Glass (Bandeja) */}
                <line x1="125" y1="145" x2="165" y2="145" stroke="#7F8C8D" strokeWidth="3" strokeLinecap="round" />
                <rect x="135" y="130" width="8" height="15" fill="#FFFFFF" stroke="#3498DB" strokeWidth="1.5" />
                <rect x="150" y="133" width="6" height="12" fill="#E88C7D" opacity="0.8" />
              </svg>
            </div>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-black/5 py-8 mt-12 bg-white text-center">
        <p className="text-[14px] text-black/40 font-semibold">
          &copy; 2026 Sabor Brasileiro. Todos os direitos reservados.
        </p>
      </footer>

      {/* Sidebar para mobile/tablets */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        navItems={["Início", "Sobre nós"]}
        activeItem={activeItem}
        onSelect={(item) => {
          setActiveItem(item);
          if (item === "Início") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else if (item === "Sobre nós") {
            // Se houver uma seção sobre nós, rola para ela. Como não há, podemos rolar para o rodapé.
            const footer = document.querySelector("footer");
            if (footer) {
              footer.scrollIntoView({ behavior: "smooth" });
            }
          }
        }}
      />
    </div>
  );
};

export default Home;
