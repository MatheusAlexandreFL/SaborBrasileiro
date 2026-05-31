import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const INTEGRANTES = [
  {
    nome: "Ana Beatriz Peixoto do Nascimento",
    iniciais: "AN",
    corGradiente: "from-pink-500 to-rose-500",
    github: "https://github.com/biapxt",
    linkedin: "https://www.linkedin.com/in/beatrizz-peixoto/",
  },
  {
    nome: "Daniel Brito de Souza",
    iniciais: "DB",
    corGradiente: "from-blue-500 to-indigo-500",
    github: "https://github.com/Paladino606",
    linkedin: "https://www.linkedin.com/in/daniel-brito-de-souza-190b953b4/",
  },
  {
    nome: "Ismael Gama Geraldo",
    iniciais: "IG",
    corGradiente: "from-teal-500 to-emerald-500",
    github: "https://github.com/ismaelgama",
    linkedin: "https://linkedin.com",
  },
  {
    nome: "Matheus Alexandre Ferreira Leite",
    iniciais: "ML",
    corGradiente: "from-amber-500 to-orange-500",
    github: "https://github.com/MatheusAlexandreFL",
    linkedin: "https://www.linkedin.com/in/matheus-alexandre-ferreira/",
  },
  {
    nome: "Tony Terra Nova Portela",
    iniciais: "TP",
    corGradiente: "from-violet-500 to-purple-500",
    github: "https://github.com/ItsTonyy",
    linkedin: "https://www.linkedin.com/in/tony-terra-nova/",
  },
];

const SobreNos = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8EDDB]/30 flex flex-col font-sans text-black">


      <Navbar
        hideSearch={true}
        hideFilter={true}
        onMenuClick={() => setIsSidebarOpen(true)}
      />

      <main className="flex-1 max-w-[1200px] w-full mx-auto px-6 py-12 flex flex-col gap-12">


        <div className="text-center flex flex-col items-center gap-3">
          <span className="text-[#C13D33] text-[13px] font-black uppercase tracking-widest bg-[#C13D33]/10 border border-[#C13D33]/20 px-4 py-1.5 rounded-full">
            Desenvolvedores do Projeto
          </span>
          <h1 className="font-serif text-[42px] md:text-[50px] font-extrabold text-neutral-900 leading-tight">
            Sobre Nós
          </h1>
          <div className="w-[80px] h-[3.5px] bg-[#C13D33] rounded-full"></div>
          <p className="text-[17px] text-neutral-600 leading-relaxed max-w-[650px] mt-2 font-medium">
            Conheça a equipe por trás do <strong className="text-neutral-900 font-serif">Sabor Brasileiro</strong>. Unimos dedicação, criatividade e tecnologia para construir um ecossistema completo de avaliações gastronômicas.
          </p>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-stretch mt-6">
          {INTEGRANTES.map((m, index) => (
            <div
              key={index}
              className="group bg-white/70 backdrop-blur-md border border-white/50 rounded-[28px] shadow-lg p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-[#C13D33]/30"
            >

              <div className={`w-20 h-20 rounded-full bg-gradient-to-tr ${m.corGradiente} text-white font-bold text-[26px] flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110 select-none`}>
                {m.iniciais}
              </div>


              <h3 className="font-serif text-[20px] font-extrabold text-neutral-900 mt-5 mb-1 leading-snug">
                {m.nome}
              </h3>


              <span className="text-[#C13D33] text-[12px] font-black tracking-wider uppercase mb-4">
                {m.funcao}
              </span>


              <div className="w-12 h-[2px] bg-neutral-200 mb-4 transition-all duration-300 group-hover:w-20 group-hover:bg-[#C13D33]/40"></div>


              <p className="text-[14.5px] text-neutral-600 leading-relaxed font-medium mb-8 flex-1">
                {m.bio}
              </p>

              <div className="flex gap-4">
                <a
                  href={m.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-[#C13D33] hover:text-white hover:shadow-md transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
                  title="GitHub"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                </a>
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-[#C13D33] hover:text-white hover:shadow-md transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
                  title="LinkedIn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

      </main>


      <footer className="bg-white border-t border-black/10 py-6 text-center mt-12">
        <p className="text-[14px] text-black/40 font-bold">
          &copy; 2026 Sabor Brasileiro. Todos os direitos reservados.
        </p>
      </footer>


      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        navItems={["Início", "Sobre nós"]}
        activeItem="Sobre nós"
        onSelect={(item) => {
          if (item === "Início") {
            window.location.href = "/home";
          }
        }}
      />
    </div>
  );
};

export default SobreNos;
