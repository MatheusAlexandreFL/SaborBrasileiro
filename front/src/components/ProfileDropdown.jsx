const profileSections = [
  {
    title: "Minha conta",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "Pedidos recentes",
    text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: "Preferências",
    text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
  },
];

const ProfileDropdown = ({
  align = "profile",
  headerText = "Lorem ipsum dolor sit amet.",
  headerTitle = "Olá, visitante",
  isOpen,
  sections = profileSections,
  type = "button",
}) => {
  if (!isOpen) {
    return null;
  }

  const alignmentClass = align === "profile" ? "right-[-3.25rem] sm:right-0" : "right-0";

  return (
    <div
      className={`absolute top-full z-30 mt-3 w-[min(18rem,calc(100vw-2rem))] rounded-lg border border-zinc-200 bg-white p-3 text-left shadow-xl ${alignmentClass}`}
    >
      <div className="border-b border-zinc-200 px-2 pb-3">
        <p className="font-notoserif text-sm font-semibold text-black">{headerTitle}</p>
        <p className="mt-1 text-xs leading-5 text-zinc-500">{headerText}</p>
      </div>

      <div className="space-y-2 pt-2">
        {sections.map((section) =>
          type === "check" ? (
            <label
              key={section.title}
              className="flex w-full cursor-pointer items-start gap-3 rounded-md px-2 py-2 transition hover:bg-zinc-100"
            >
              <input
                type="checkbox"
                defaultChecked={section.checked}
                className="mt-0.5 size-4 rounded border-zinc-400 accent-red-700"
              />
              <span>
                <span className="block font-notoserif text-sm font-medium text-black">{section.title}</span>
                <span className="mt-1 block text-xs leading-5 text-zinc-500">{section.text}</span>
              </span>
            </label>
          ) : (
            <button
              type="button"
              key={section.title}
              className="block w-full rounded-md px-2 py-2 text-left transition hover:bg-zinc-100"
            >
              <span className="block font-notoserif text-sm font-medium text-black">{section.title}</span>
              <span className="mt-1 block text-xs leading-5 text-zinc-500">{section.text}</span>
            </button>
          ),
        )}
      </div>
    </div>
  );
};

export default ProfileDropdown;
