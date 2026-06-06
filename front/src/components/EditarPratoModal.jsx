import { useState, useEffect } from "react";
import Input from "./input";
import Button from "./button";
import { pratoService } from "../services/api";
import { useToast } from "../context/ToastContext";

const EditarPratoModal = ({ prato, onPratoAtualizado }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nome, setNome] = useState(prato?.name || prato?.nome || "");
  const [descricao, setDescricao] = useState(prato?.description || prato?.descricao || "");
  const [preco, setPreco] = useState("");
  const [foto, setFoto] = useState(prato?.image || prato?.foto_prato || "");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (prato && isModalOpen) {
      setNome(prato.name || prato.nome || "");
      setDescricao(prato.description || prato.descricao || "");


      let rawPrice = prato.price || prato.preco || "";
      if (typeof rawPrice === "string") {
        rawPrice = rawPrice.replace("R$ ", "").replace(/\./g, "").replace(",", ".");
      }
      setPreco(rawPrice);
      setFoto(prato.image || prato.foto_prato || "");
    }
  }, [prato, isModalOpen]);

  const handleSalvar = async (e) => {
    e.preventDefault();
    if (!nome || !descricao || !preco || !foto) {
      toast.error("Preencha todos os campos.");
      return;
    }

    try {
      setLoading(true);
      await pratoService.atualizarPrato(prato.id, {
        nome,
        descricao,
        preco: parseFloat(preco),
        foto
      });
      toast.success("Prato atualizado com sucesso!");
      setIsModalOpen(false);
      if (onPratoAtualizado) {
        onPratoAtualizado();
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Erro ao atualizar prato.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFechar = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="w-full h-[48px] bg-white text-[#C13D33] border-2 border-[#C13D33] text-[13px] font-bold rounded-[8px] outline-none cursor-pointer flex items-center justify-center hover:bg-[#C13D33]/10 transition-colors shadow-xs active:scale-98 uppercase tracking-widest"
      >
        Editar Prato
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={handleFechar}></div>

          <div className="relative bg-white w-full max-w-[500px] rounded-[28px] shadow-2xl p-8 flex flex-col gap-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <h2 className="font-serif text-[24px] font-bold text-black">Editar Prato</h2>
              <button onClick={handleFechar} className="text-black/30 hover:text-black cursor-pointer bg-transparent border-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <form onSubmit={handleSalvar} className="flex flex-col gap-4">
              <Input
                label="Nome do Prato"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Feijoada Completa"
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-black/40 uppercase tracking-wider">
                  Descrição
                </label>
                <textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Detalhes sobre o prato..."
                  className="w-full h-24 bg-neutral-100 rounded-[15px] p-4 text-[15px] border-none focus:ring-2 focus:ring-[#C13D33] outline-none resize-none text-black font-medium"
                ></textarea>
              </div>

              <Input
                label="Preço"
                type="number"
                step="0.01"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                placeholder="Ex: 45.90"
              />

              <Input
                label="URL da Foto"
                type="url"
                value={foto}
                onChange={(e) => setFoto(e.target.value)}
                placeholder="https://exemplo.com/foto.jpg"
              />

              <div className="flex flex-col gap-3 mt-2">
                <Button text={loading ? "Salvando..." : "Salvar Alterações"} />
                <button
                  type="button"
                  onClick={handleFechar}
                  className="text-[14px] font-bold text-black/40 hover:text-black transition-colors cursor-pointer bg-transparent border-none outline-none"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditarPratoModal;
