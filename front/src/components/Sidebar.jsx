const Sidebar = ({ activeItem, isOpen, navItems, onClose, onSelect }) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity xl:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
        onClick={onClose}
      />

      <aside
        className={`fixed left-0 top-0 z-50 h-full w-72 max-w-[82vw] bg-white shadow-2xl transition-transform duration-300 xl:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Menu de navegação"
      >
        <div className="flex h-16 items-center justify-between border-b border-zinc-200 px-5">
          <span className="font-playwrite text-2xl leading-none text-black">Sabor</span>
          <button type="button" className="grid size-9 place-items-center text-black" onClick={onClose}>
            <span className="sr-only">Fechar menu</span>
            <CloseIcon />
          </button>
        </div>

        <nav className="flex flex-col gap-1 p-4">
          {navItems.map((item) => {
            const isActive = activeItem === item;

            return (
              <button
                type="button"
                key={item}
                className={`rounded-md border-l-4 px-4 py-3 text-left font-notoserif text-sm transition ${
                  isActive
                    ? "border-red-700 bg-red-50 text-red-800"
                    : "border-transparent text-black hover:bg-zinc-100"
                }`}
                onClick={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                {item}
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

const CloseIcon = () => (
  <svg className="size-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="m6 6 12 12M18 6 6 18"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

export default Sidebar;
