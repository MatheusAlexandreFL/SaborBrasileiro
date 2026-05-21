const navItems = ["Inicio", "Sobre nós"];

const SaborHeader = () => {
  return (
    <header className="w-full border-b border-zinc-300 bg-white">
      <div className="mx-auto flex min-h-16 w-full max-w-[1440px] flex-col gap-3 px-4 py-3 sm:px-6 lg:h-[62px] lg:flex-row lg:items-center lg:gap-6 lg:px-8 lg:py-0">
        <div className="flex items-center justify-between gap-4 lg:w-[360px] lg:shrink-0">
          <a
            href="/home"
            className="whitespace-nowrap text-[34px] leading-none text-black sm:text-[39px]"
            style={{ fontFamily: "'Brush Script MT', 'Segoe Script', cursive" }}
          >
            Sabor Brasileiro
          </a>

          <div className="flex items-center gap-2 lg:hidden">
            <ProfileButton />
            <button
              type="button"
              className="grid size-9 place-items-center text-black"
              aria-label="Abrir menu do perfil"
            >
              <ChevronDownIcon />
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 lg:flex-row lg:items-center lg:justify-end">
          <nav className="flex items-center gap-6 text-sm text-black lg:gap-7">
            {navItems.map((item) => (
              <a
                key={item}
                href={item === "Inicio" ? "/home" : "#sobre"}
                className={`pb-1 leading-none ${
                  item === "Inicio" ? "border-b-2 border-red-700" : "border-b-2 border-transparent"
                }`}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 lg:ml-8">
            <label className="relative h-11 min-w-0 flex-1 lg:w-[390px] lg:flex-none">
              <span className="sr-only">Buscar restaurante ou prato</span>
              <input
                type="search"
                placeholder="Buscar restaurante ou prato..."
                className="h-full w-full rounded-full border border-zinc-400 bg-white px-6 pr-12 text-sm text-zinc-700 outline-none placeholder:text-zinc-400 focus:border-zinc-700"
              />
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-black">
                <SearchIcon />
              </span>
            </label>

            <button
              type="button"
              className="flex h-11 shrink-0 items-center gap-2 rounded-full border border-zinc-400 bg-white px-4 text-sm text-black transition hover:border-zinc-700 sm:px-5"
            >
              <FilterIcon />
              <span className="hidden sm:inline">Filtros</span>
            </button>

            <div className="hidden items-center gap-2 lg:flex">
              <ProfileButton />
              <button
                type="button"
                className="grid size-9 place-items-center text-black"
                aria-label="Abrir menu do perfil"
              >
                <ChevronDownIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const ProfileButton = () => (
  <button
    type="button"
    className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-[#d84b36] bg-[#f5b37e] p-0.5"
    aria-label="Perfil do usuário"
  >
    <span className="relative block size-full overflow-hidden rounded-full bg-[#2f4552]">
      <span className="absolute left-1/2 top-[10px] size-[17px] -translate-x-1/2 rounded-full bg-[#d99067]" />
      <span className="absolute left-1/2 top-[7px] h-5 w-8 -translate-x-1/2 rounded-t-full bg-[#2b1b17]" />
      <span className="absolute bottom-[5px] left-1/2 h-5 w-8 -translate-x-1/2 rounded-t-full bg-[#f2a15c]" />
      <span className="absolute bottom-[9px] left-1/2 h-4 w-10 -translate-x-1/2 rounded-t-full bg-[#a81f25]" />
      <span className="absolute left-[12px] top-[19px] size-1 rounded-full bg-black" />
      <span className="absolute right-[12px] top-[19px] size-1 rounded-full bg-black" />
    </span>
  </button>
);

const SearchIcon = () => (
  <svg className="size-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="m21 21-4.3-4.3M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FilterIcon = () => (
  <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M4 6h16M7 12h10M10 18h4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="size-7" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="m6 9 6 6 6-6"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SaborHeader;
