import { useEffect, useState } from "react";

import ProfileDropdown from "./ProfileDropdown";
import Sidebar from "./Sidebar";

const navItems = ["Início", "Sobre nós"];

const filterSections = [
  {
    title: "Salgados",
    text: "Coxinhas, esfihas, pastéis e pratos salgados.",
    checked: true,
  },
  {
    title: "Doces",
    text: "Bolos, brigadeiros, pudins e sobremesas.",
    checked: false,
  },
  {
    title: "Bebidas",
    text: "Sucos, cafés, refrigerantes e vitaminas.",
    checked: false,
  },
  {
    title: "Promoções",
    text: "Opções com desconto ou combos especiais.",
    checked: true,
  },
];

const SaborHeader = () => {
  const [activeItem, setActiveItem] = useState("Início");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isFilterOpen && !isProfileOpen) {
      return undefined;
    }

    const handleOutsideClick = (event) => {
      if (event.target.closest("[data-dropdown-root]")) {
        return;
      }

      setIsFilterOpen(false);
      setIsProfileOpen(false);
    };

    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, [isFilterOpen, isProfileOpen]);

  return (
    <>
      <header className="w-full border-b border-zinc-300 bg-white">
        <div className="mx-auto flex min-h-16 w-full max-w-[1440px] flex-col gap-3 px-4 py-3 sm:px-6 md:min-h-[68px] md:flex-row md:items-center md:gap-4 md:py-0 xl:h-[62px] xl:gap-6 xl:px-8">
          <div className="flex items-center justify-between gap-4 md:w-auto md:shrink-0 xl:w-[350px]">
            <a
              href="/home"
              className="font-playwrite whitespace-nowrap text-[18px] leading-none text-black hover:cursor-pointer min-[380px]:text-2xl sm:text-3xl md:text-2xl lg:text-3xl"
            >
              Sabor Brasileiro
            </a>

            <div className="flex items-center gap-2 md:hidden">
              <ProfileMenu
                isOpen={isProfileOpen}
                onToggle={() => {
                  setIsProfileOpen((current) => !current);
                  setIsFilterOpen(false);
                }}
              />
              <button
                type="button"
                className="grid size-10 place-items-center rounded-full text-black transition hover:cursor-pointer hover:bg-zinc-100"
                aria-label="Abrir menu de navegação"
                onClick={() => {
                  setIsFilterOpen(false);
                  setIsProfileOpen(false);
                  setIsSidebarOpen(true);
                }}
              >
                <HamburgerIcon />
              </button>
            </div>
          </div>

          <div className="flex min-w-0 flex-1 items-center gap-3 xl:justify-end">
            <nav className="hidden items-center gap-7 text-sm font-notoserif text-black xl:flex">
              {navItems.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`pb-1 leading-none transition hover:cursor-pointer ${
                    activeItem === item ? "border-b-2 border-red-700" : "border-b-2 border-transparent"
                  }`}
                  onClick={() => setActiveItem(item)}
                >
                  {item}
                </button>
              ))}
            </nav>

            <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3 xl:ml-8 xl:flex-none">
              <SearchInput />
              <FilterMenu
                isOpen={isFilterOpen}
                onToggle={() => {
                  setIsFilterOpen((current) => !current);
                  setIsProfileOpen(false);
                }}
              />

              <div className="hidden items-center gap-2 md:flex xl:hidden">
                <ProfileMenu
                  isOpen={isProfileOpen}
                  onToggle={() => {
                    setIsProfileOpen((current) => !current);
                    setIsFilterOpen(false);
                  }}
                />
                <button
                  type="button"
                  className="grid size-10 place-items-center rounded-full text-black transition hover:cursor-pointer hover:bg-zinc-100"
                  aria-label="Abrir menu de navegação"
                  onClick={() => {
                    setIsFilterOpen(false);
                    setIsProfileOpen(false);
                    setIsSidebarOpen(true);
                  }}
                >
                  <HamburgerIcon />
                </button>
              </div>

              <div className="hidden xl:block">
                <ProfileMenu
                  isOpen={isProfileOpen}
                  onToggle={() => {
                    setIsProfileOpen((current) => !current);
                    setIsFilterOpen(false);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <Sidebar
        activeItem={activeItem}
        isOpen={isSidebarOpen}
        navItems={navItems}
        onClose={() => setIsSidebarOpen(false)}
        onSelect={setActiveItem}
      />
    </>
  );
};

const ProfileMenu = ({ isOpen, onToggle }) => (
  <div className="relative" data-dropdown-root>
    <button
      type="button"
      className="flex items-center text-black hover:cursor-pointer"
      aria-expanded={isOpen}
      aria-haspopup="menu"
      aria-label="Abrir menu do perfil"
      onClick={onToggle}
    >
      <ProfileAvatar />
    </button>
    <ProfileDropdown isOpen={isOpen} />
  </div>
);

const SearchInput = () => (
  <label className="relative h-11 min-w-0 flex-1 xl:w-[390px] xl:flex-none">
    <span className="sr-only">Buscar restaurante ou prato</span>
    <input
      type="search"
      placeholder="Buscar restaurante ou prato..."
      className="h-full w-full rounded-full border border-zinc-400 bg-white px-4 pr-11 text-sm text-zinc-700 outline-none placeholder:text-zinc-400 focus:border-zinc-700 sm:px-6 sm:pr-12"
    />
    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-black">
      <SearchIcon />
    </span>
  </label>
);

const FilterMenu = ({ isOpen, onToggle }) => (
  <div className="relative shrink-0" data-dropdown-root>
    <button
      type="button"
      className="flex size-11 items-center justify-center rounded-full border border-zinc-400 bg-white text-sm text-black transition hover:cursor-pointer hover:border-zinc-700 xl:w-auto xl:gap-2 xl:px-5"
      aria-expanded={isOpen}
      aria-haspopup="menu"
      aria-label="Abrir filtros"
      onClick={onToggle}
    >
      <FilterIcon />
      <span className="hidden xl:inline">Filtros</span>
    </button>
    <ProfileDropdown
      align="right"
      headerText="Escolha as categorias que deseja visualizar."
      headerTitle="Filtrar por"
      isOpen={isOpen}
      sections={filterSections}
      type="check"
    />
  </div>
);

const ProfileAvatar = () => (
  <span
    className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-[#d84b36] bg-[#f5b37e] p-0.5"
    aria-hidden="true"
  >
    <span className="relative block size-full overflow-hidden rounded-full bg-[#2f4552]">
      <span className="absolute left-1/2 top-[10px] size-[17px] -translate-x-1/2 rounded-full bg-[#d99067]" />
      <span className="absolute left-1/2 top-[7px] h-5 w-8 -translate-x-1/2 rounded-t-full bg-[#2b1b17]" />
      <span className="absolute bottom-[5px] left-1/2 h-5 w-8 -translate-x-1/2 rounded-t-full bg-[#f2a15c]" />
      <span className="absolute bottom-[9px] left-1/2 h-4 w-10 -translate-x-1/2 rounded-t-full bg-[#a81f25]" />
      <span className="absolute left-[12px] top-[19px] size-1 rounded-full bg-black" />
      <span className="absolute right-[12px] top-[19px] size-1 rounded-full bg-black" />
    </span>
  </span>
);

const SearchIcon = () => (
  <svg className="size-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="m21 21-4.3-4.3M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const FilterIcon = () => (
  <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M4 6h16M7 12h10M10 18h4" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
  </svg>
);

const HamburgerIcon = () => (
  <svg className="size-7" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M4 7h16M4 12h16M4 17h16"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="2"
    />
  </svg>
);

export default SaborHeader;
