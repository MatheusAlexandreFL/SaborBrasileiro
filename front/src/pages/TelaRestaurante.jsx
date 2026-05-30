const MapPinIcon = () => (
  <svg
    aria-hidden="true"
    className="h-5 w-5 shrink-0 text-black"
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

const ExpandIcon = () => (
  <svg
    aria-hidden="true"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 3H3v5M16 3h5v5M21 16v5h-5M3 16v5h5" />
  </svg>
);

const StarIcon = () => (
  <svg
    aria-hidden="true"
    className="h-7 w-7"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m12 3.75 2.48 5.03 5.55.81-4.01 3.91.95 5.52L12 16.41l-4.97 2.61.95-5.52-4.01-3.91 5.55-.81L12 3.75Z"
    />
  </svg>
);

const reviews = [
  {
    id: 1,
    name: "Marina Silva",
    rating: 5,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidente ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    name: "Marina Silva",
    rating: 5,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidente ut labore et dolore magna aliqua. Quisque faucibus ex sapien vitae pellentesque sem placerat. Tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia inteiro nunc posuere. Ut hendrerit sempre vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",
  },
  {
    id: 3,
    name: "Marina Silva",
    rating: 5,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidente ut labore et dolore magna aliqua. Iaculis massa nisl malesuada lacinia inteiro nunc posuere. Ut hendrerit sempre vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",
  },
];

const TelaRestaurante = () => {
  return (
    <main className="min-h-screen bg-white font-notoserif text-black">
      <section className="mx-auto grid w-full max-w-[980px] grid-cols-1 gap-8 px-4 py-8 sm:px-8 md:grid-cols-[minmax(0,1fr)_minmax(330px,0.95fr)] md:gap-6 md:py-12">
        <div className="flex flex-col items-center gap-5">
          <div className="h-[250px] w-full overflow-hidden rounded-[7px] bg-[#F8EDDB] shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&auto=format&fit=crop&q=85"
              alt="Ambiente interno do restaurante Origem Cozinha Natural"
              className="h-full w-full object-cover"
            />
          </div>

          <button
            type="button"
            className="min-h-10 rounded-[7px] bg-[#C13D33] px-6 text-[13px] font-bold text-white shadow-sm transition-colors hover:bg-[#a8322b] focus:outline-none focus:ring-2 focus:ring-[#C13D33] focus:ring-offset-2"
          >
            Ver pratos
          </button>
        </div>

        <div className="flex flex-col justify-start gap-5 md:pt-0.5">
          <div className="flex flex-col gap-4">
            <h1 className="font-serif text-[24px] font-extrabold leading-tight text-black sm:text-[25px]">
              Origem Cozinha Natural
            </h1>

            <div className="flex items-center gap-1.5 text-[12px] font-extrabold">
              <span className="text-[18px] leading-none text-[#D88C36]" aria-hidden="true">
                ★
              </span>
              <span>4,9</span>
            </div>

            <p className="text-[13px] leading-none text-black">Natural . Saudável</p>
          </div>

          <div className="flex items-start gap-2 text-[12px] leading-[1.45] text-black">
            <MapPinIcon />
            <address className="not-italic">
              Rua das flores, 122 - Botafogo
              <br />
              Rio de Janeiro, RJ - CEP xxxxxx-xxx
            </address>
          </div>

          <div className="relative h-[138px] w-full overflow-hidden rounded-[8px] border border-black/50 bg-[#e9eef3] shadow-sm">
            <div className="absolute inset-0 bg-[#e7ecf3]">
              <div className="absolute -left-8 top-7 h-2 w-[112%] rotate-[19deg] bg-white/95" />
              <div className="absolute -left-7 top-[78px] h-2 w-[112%] rotate-[19deg] bg-white/95" />
              <div className="absolute left-10 -top-8 h-[170%] w-2 rotate-[40deg] bg-white/95" />
              <div className="absolute left-[118px] -top-8 h-[170%] w-2 rotate-[40deg] bg-white/95" />
              <div className="absolute left-[202px] -top-8 h-[170%] w-2 rotate-[40deg] bg-white/95" />
              <div className="absolute -right-[24px] -bottom-[45px] h-[165px] w-[210px] rounded-tl-[100%] bg-[#82d0e1]" />
              <div className="absolute bottom-0 left-[78px] h-[3px] w-[172px] -rotate-[25deg] bg-[#f3dcae]" />
              <div className="absolute top-[48px] left-[154px] h-7 w-7 rounded-full bg-white/70" />
            </div>

            <div className="absolute left-[45%] top-[39%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
              <span className="h-3 w-3 rounded-full bg-[#ee5b45] ring-2 ring-white" />
              <span className="mt-1 rounded-sm bg-white/70 px-1 text-[6px] font-semibold text-[#b94b3f]">
                Restaurante
              </span>
            </div>

            <div className="absolute left-[18%] top-[51%] h-2.5 w-2.5 rounded-full bg-[#ff8b3f] ring-2 ring-white" />
            <div className="absolute left-[32%] top-[72%] h-2.5 w-2.5 rounded-full bg-[#3f86c9] ring-2 ring-white" />
            <div className="absolute left-[58%] top-[21%] h-2.5 w-2.5 rounded-full bg-[#ff8b3f] ring-2 ring-white" />

            <button
              type="button"
              className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center border border-black/20 bg-white text-black/65 shadow-sm"
              aria-label="Expandir mapa"
            >
              <ExpandIcon />
            </button>

            <div className="absolute bottom-3 right-2 overflow-hidden border border-black/20 bg-white shadow-sm">
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center border-b border-black/20 text-[24px] leading-none text-black/65"
                aria-label="Aproximar mapa"
              >
                +
              </button>
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center text-[24px] leading-none text-black/65"
                aria-label="Afastar mapa"
              >
                -
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-black/15" aria-hidden="true" />

      <section className="px-4 py-8 sm:px-8 md:py-9">
        <div className="mx-auto flex w-full max-w-[720px] flex-col gap-6">
          <h2 className="text-center font-serif text-[23px] font-medium leading-tight text-black sm:text-[24px]">
            Sobre o Restaurante
          </h2>

          <div className="flex flex-col gap-1.5 text-[16px] font-medium leading-[1.45] text-black">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidente ut labore
              et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
              ut aliquip ex ea comodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisque faucibus ex sapien vitae
              pellentesque sem placerat. In id cursus mi pretium Tellus duis convallis. Tempus leo eu aenean sed
              diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl
              malesuada lacinia inteiro nunc posuere. Ut hendrerit sempre vel class aptent taciti sociosqu. Ad
              litora torquent per conubia nostra inceptos himenaeos.
            </p>
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-black/15" aria-hidden="true" />

      <section className="px-2 pb-10 pt-8 sm:px-4 md:pt-9">
        <form className="mx-auto w-full max-w-[748px] rounded-[6px] border border-black/10 bg-white px-6 pb-14 pt-3 sm:px-[74px]">
          <div className="flex flex-col gap-3">
            <div>
              <h2 className="font-serif text-[18px] font-extrabold leading-tight text-black">
                Avalie este restaurante
              </h2>
              <p className="mt-1 text-[12px] font-semibold leading-tight text-black">
                Sua avaliação ajuda outros clientes a escolherem melhor!
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <span className="text-[12px] font-semibold text-[#C13D33]">Sua nota</span>
              <div className="flex items-center gap-0 text-black/20" aria-label="Nota do restaurante">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    className="flex h-7 w-7 items-center justify-center transition-colors hover:text-[#D88C36] focus:outline-none focus:ring-2 focus:ring-[#C13D33] focus:ring-offset-2"
                    aria-label={`Selecionar ${value} estrela${value > 1 ? "s" : ""}`}
                  >
                    <StarIcon />
                  </button>
                ))}
              </div>
            </div>

            <label className="mt-1 text-[12px] font-extrabold text-black" htmlFor="comentario-restaurante">
              Seu comentário (opcional)
            </label>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <textarea
                id="comentario-restaurante"
                className="min-h-16 flex-1 resize-none rounded-[6px] border border-black/10 px-3 py-3 text-[12px] font-semibold leading-relaxed text-black outline-none transition-colors placeholder:text-black/35 focus:border-[#C13D33] focus:ring-1 focus:ring-[#C13D33]"
                placeholder="Conte sua experiência, o que mais gostou, o atendimento..."
              />

              <button
                type="submit"
                className="h-[30px] rounded-[7px] bg-[#C13D33] px-5 text-[12px] font-extrabold text-white transition-colors hover:bg-[#a8322b] focus:outline-none focus:ring-2 focus:ring-[#C13D33] focus:ring-offset-2 sm:w-[58px] sm:px-0"
              >
                Enviar
              </button>
            </div>
          </div>
        </form>
      </section>

      <section className="px-4 pb-14 pt-2 sm:px-8 md:pt-3">
        <div className="mx-auto flex w-full max-w-[720px] flex-col gap-8">
          {reviews.map((review) => (
            <article key={review.id} className="flex items-start gap-4 sm:gap-5">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80"
                alt={`Foto de ${review.name}`}
                className="h-12 w-12 shrink-0 rounded-full border-2 border-[#C13D33] object-cover p-[2px]"
              />

              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex flex-wrap items-center gap-x-10 gap-y-1">
                  <h3 className="text-regular font-extrabold leading-tight text-black">{review.name}</h3>
                  <div className="flex items-center gap-1 text-regular leading-none text-black">
                    <span>{review.rating}</span>
                    <span className="text-[22px] text-[#D88C36]" aria-hidden="true">
                      ★
                    </span>
                  </div>
                </div>

                <p className="max-w-[530px] text-regular font-medium leading-[1.35] text-black">
                  {review.text}
                </p>
              </div>
            </article>
          ))}

          <a
            href="#"
            className="ml-16 mt-3 inline-flex w-fit items-center gap-4 text-[14px] font-extrabold text-[#D88C36] no-underline transition-colors hover:text-[#C13D33] sm:ml-[68px]"
          >
            Ver todas as avaliações
            <span className="text-[20px] leading-none" aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </section>
    </main>
  );
};

export default TelaRestaurante;
