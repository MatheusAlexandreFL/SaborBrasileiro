import { useState } from "react";

const AvaliarButton = ({ tipo = "prato", nomeItem, onSubmit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // a nota começa com 0, e o comentario vazio, pra quando abrir o modal já estar zerado
  const [nota, setNota] = useState(0); 
  const [comentario, setComentario] = useState("");

  const isPrato = tipo === "prato";
  const textoBotao = isPrato ? "Avaliar Prato" : "Avaliar Restaurante";
  const tituloModal = isPrato ? "Avaliar Prato" : "Avaliar Restaurante";

  const handleEnviar = () => {
    if (onSubmit) {
      onSubmit({ nota, comentario });
    }
    //quando envia reseta pra 0 e fecha o modal
    setNota(0);
    setComentario("");
    setIsModalOpen(false);
  };

  const handleFechar = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="w-full h-[48px] bg-[#C13D33] text-[#ffffff] text-[13px] font-bold rounded-[8px] border-none outline-none cursor-pointer flex items-center justify-center hover:bg-[#a53229] transition-colors shadow-xs active:scale-98 uppercase tracking-widest"
      >
        {textoBotao}
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={handleFechar}></div>

          <div className="relative bg-white w-full max-w-[500px] rounded-[28px] shadow-2xl p-8 flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h2 className="font-serif text-[24px] font-bold text-black">{tituloModal}</h2>
              <button onClick={handleFechar} className="text-black/30 hover:text-black cursor-pointer bg-transparent border-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-[15px] text-black/60 font-medium text-center">
                Como foi sua experiência com <br />
                <span className="text-black font-bold">{nomeItem}</span>?
              </p>
              
              <div className="flex justify-center gap-2 mt-2">
                {[1, 2, 3, 4, 5].map((index) => {
                  const isHalf = nota === index - 0.5;
                  const isFull = nota >= index;

                  return (
                    <div key={index} className="relative w-10 h-10 transition-transform hover:scale-110">
                      
                      {/* estrela com fundo cinza (quando n tem nota)*/}
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute top-0 left-0 w-10 h-10 text-neutral-200">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                      </svg>

                      {/* estrela amarela */}
                      {(isFull || isHalf) && (
                        <div className={`absolute top-0 left-0 h-full overflow-hidden ${isHalf ? 'w-1/2' : 'w-full'}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-amber-500">
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}

                      {/* pra zerar a nota da estrela só clicar nela de novo*/}
                      <button 
                        type="button" 
                        onClick={() => setNota(nota === index - 0.5 ? 0 : index - 0.5)} 
                        className="absolute top-0 left-0 w-1/2 h-full z-10 bg-transparent border-none outline-none cursor-pointer" 
                      />
                      <button 
                        type="button" 
                        onClick={() => setNota(nota === index ? 0 : index)} 
                        className="absolute top-0 right-0 w-1/2 h-full z-10 bg-transparent border-none outline-none cursor-pointer" 
                      />
                    </div>
                  );
                })}
              </div>
              
              <div className="text-center">
                <span className="bg-neutral-100 text-neutral-600 font-bold text-[14px] px-4 py-1.5 rounded-full border border-black/5">
                  Nota: <span className="text-amber-600 text-[16px]">{nota.toFixed(1)}</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-bold text-black/40 uppercase tracking-wider">Seu comentário</label>
              <textarea 
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                placeholder="Conte detalhes sobre sua experiência..."
                className="w-full h-32 bg-neutral-100 rounded-[15px] p-4 text-[15px] border-none focus:ring-2 focus:ring-[#C13D33] outline-none resize-none"
              ></textarea>
            </div>

            <div className="flex flex-col gap-3 mt-2">
              <button 
                type="button"
                onClick={handleEnviar}
                className="w-full h-[44px] bg-[#C13D33] text-[#ffffff] text-[15px] font-bold rounded-[8px] border-none outline-none cursor-pointer flex items-center justify-center hover:bg-[#a53229] transition-colors"
              >
                Enviar Avaliação
              </button>
              <button 
                type="button"
                onClick={handleFechar}
                className="text-[14px] font-bold text-black/40 hover:text-black transition-colors cursor-pointer bg-transparent border-none"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AvaliarButton;