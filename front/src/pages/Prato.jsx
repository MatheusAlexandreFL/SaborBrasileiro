import { useState ,useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import { DISHES, REVIEWS } from "../mockData"; 
import DishCard from "../components/DishCard";
import AvaliarButton from "../components/AvaliarButton";
import { useToast } from "../context/ToastContext";

const Prato = () => {
  const location = useLocation();
  const navigate = useNavigate(); // add para o botão de voltar funcionar
  const toast = useToast();
  const [mostrarTodosComentarios, setMostrarTodosComentarios] = useState(false);
  const [listaComentarios, setListaComentarios] = useState(REVIEWS);

  // add: a pagina começa do topo 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // calculo da media geral
  const mediaGeralDinamica = listaComentarios.length > 0 
    ? listaComentarios.reduce((soma, comentario) => soma + comentario.nota, 0) / listaComentarios.length 
    : 0;

  const pratoPadrao = {
    name: "Risoto de Cogumelos Trufado",
    price: "R$ 89,90",
    description: "Arroz arbóreo italiano cozido lentamente em caldo artesanal de legumes, finalizado com um mix de cogumelos frescos (Paris, Shimeji e Portobello), manteiga de trufas brancas e parmesão 24 meses.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80",
    restaurant: "Cantina Bella Italia"
  };

  // Busca dados completos do prato no mockData para obter o preço correto
  const pratoDoMock = DISHES.find(
    (d) => d.name === (location.state?.name || pratoPadrao.name)
  );

  const pratoPrincipal = {
    name: location.state?.name || pratoPadrao.name,
    restaurant: location.state?.restaurant || pratoPadrao.restaurant,
    image: location.state?.image || pratoPadrao.image,
    price: location.state?.price || pratoDoMock?.price || pratoPadrao.price,
    description: location.state?.description || pratoDoMock?.description || pratoPadrao.description
  };

  const recomendacoes = DISHES.filter(
    (dish) => dish.restaurant === pratoPrincipal.restaurant && dish.name !== pratoPrincipal.name
  ).slice(0, 5);

  const comentariosExibidos = mostrarTodosComentarios ? listaComentarios : listaComentarios.slice(0, 2);

  const handleSalvarAvaliacao = (dadosDaAvaliacao) => {
    const payload = {
      prato: pratoPrincipal.name,
      nota: dadosDaAvaliacao.nota,
      comentario: dadosDaAvaliacao.comentario
    };
    console.log("Axios vai enviar isto pro Banco:", payload);

    const novaAvaliacaoVisual = {
      id: Date.now(),
      nome: "Você",
      iniciais: "VC",
      nota: dadosDaAvaliacao.nota,
      texto: dadosDaAvaliacao.comentario
    };

    setListaComentarios([novaAvaliacaoVisual, ...listaComentarios]);
    setMostrarTodosComentarios(true);

    toast.success(`Sucesso! Sua nota ${dadosDaAvaliacao.nota} foi adicionada e a média foi atualizada!`);
  };

  return (
    <div className="min-h-screen bg-[#F8EDDB]/30 flex flex-col font-sans text-black p-6 md:p-10">
      
      {/* correção: botão de Voltar agora fora da imagem*/}
      <div className="max-w-[1000px] w-full mx-auto mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-black/5 cursor-pointer border-none outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </button>
      </div>

      <main className="flex-1 max-w-[1000px] w-full mx-auto flex flex-col gap-8 mb-12">
        
        {/* add: posicionamento lado a lado( foto na esquerda e infos na direita) */}
        <div className="bg-white rounded-[24px] shadow-xl p-8 flex flex-col md:flex-row gap-8 lg:gap-12">
          
          {/* add: imagem na esquerda */}
          <div className="w-full md:w-1/2 shrink-0 self-center">
            <img 
              src={pratoPrincipal.image} 
              alt={pratoPrincipal.name} 
              className="w-full h-auto object-cover rounded-[16px] max-h-[450px]" 
            />
          </div>
          {/* direita: informações */}
          <div className="w-full md:w-1/2 flex flex-col justify-center gap-6">
            <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
              <span className="bg-[#4A3C24]/10 text-[#4A3C24] font-bold text-[12px] px-3 py-1 rounded-full w-fit">Receita Assinatura</span>
              <h1 className="font-serif text-[32px] md:text-[38px] font-extrabold text-black leading-tight">{pratoPrincipal.name}</h1>
              <span className="text-[#C13D33] text-[24px] font-extrabold">{pratoPrincipal.price}</span>
            </div>

            <div className="flex flex-col gap-2 border-t border-black/5 pt-4">
              <h2 className="text-[16px] font-extrabold uppercase tracking-wider">Descrição</h2>
              <p className="text-[15px] text-black/70 leading-relaxed">{pratoPrincipal.description}</p>
            </div>

            {/* nova posição para o botão de avaliação */}
            <div className="mt-4 flex justify-start">
              <div className="w-full sm:w-[320px]">
                <AvaliarButton 
                  tipo="prato" 
                  nomeItem={pratoPrincipal.name} 
                  onSubmit={handleSalvarAvaliacao} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* add: avaliações e recomendações (elementos originais) */}
        <div className="bg-white rounded-[24px] shadow-xl p-8 flex flex-col gap-10">
          
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-black/5 pb-4">
              <div>
                <h2 className="text-[18px] font-extrabold">Avaliações</h2>
                <p className="text-[13px] text-black/40 font-bold uppercase">
                  Baseado em {listaComentarios.length} avaliações
                </p>
              </div>
              <div className="bg-white px-3 py-1.5 rounded-full flex items-center gap-1 shadow-xs border border-black/5">
                <span className="text-[15px] font-bold text-amber-500">⭐ <span className="text-black">{mediaGeralDinamica.toFixed(1)}</span></span>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-2">
              {comentariosExibidos.map((coment) => (
                <div key={coment.id} className="flex gap-4 items-start bg-neutral-50 p-4 rounded-[12px] border border-black/5 transition-all">
                  <div className="w-10 h-10 rounded-full bg-[#E7CC9F] text-[#4A3C24] font-bold flex items-center justify-center shrink-0">
                    {coment.iniciais}
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[15px]">{coment.nome}</span>
                      <div className="flex items-center gap-1 text-[13px] font-bold text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-amber-500"><path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" /></svg>
                        <span>{coment.nota.toFixed(1)}</span>
                      </div>
                    </div>
                    <p className="text-[14px] text-black/70 leading-relaxed mt-1">"{coment.texto}"</p>
                  </div>
                </div>
              ))}
            </div>

            {listaComentarios.length > 2 && (
              <button 
                onClick={() => setMostrarTodosComentarios(!mostrarTodosComentarios)}
                className="text-[#C13D33] font-bold text-[14px] mt-2 self-start hover:underline cursor-pointer bg-transparent border-none outline-none"
              >
                {mostrarTodosComentarios ? "Ocultar avaliações" : `Ver todas as ${listaComentarios.length} avaliações`}
              </button>
            )}
          </div>

          <div className="flex flex-col gap-4 pt-4 border-t border-black/5">
            <h2 className="text-[18px] font-extrabold">Recomendações</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {recomendacoes.map((dish) => (
                <DishCard key={dish.id} image={dish.image} name={dish.name} restaurant={dish.restaurant} rating={dish.rating} hideRating={true} hideLink={true} />
              ))}
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default Prato;