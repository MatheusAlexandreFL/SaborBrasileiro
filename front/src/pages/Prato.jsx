import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DishCard from "../components/DishCard";
import AvaliarButton from "../components/AvaliarButton";
import AdicionarPratoModal from "../components/AdicionarPratoModal";
import EditarPratoModal from "../components/EditarPratoModal";
import ConfirmModal from "../components/ConfirmModal";
import HeaderSearch from "../components/HeaderSearch";
import { useToast } from "../context/ToastContext";
import { pratoService, avaliacaoService, userService } from "../services/api";
import usePratos from "../hooks/usePratos";

const Prato = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const [mostrarTodosComentarios, setMostrarTodosComentarios] = useState(false);
  const [listaComentarios, setListaComentarios] = useState([]);
  const [pratoInfo, setPratoInfo] = useState(location.state || null);
  const [tipoUsuario, setTipoUsuario] = useState("cliente");
  const [meusRestaurantesIds, setMeusRestaurantesIds] = useState([]);
  const [meusRestaurantes, setMeusRestaurantes] = useState([]);
  const [meuUserId, setMeuUserId] = useState(null);
  const [meuNome, setMeuNome] = useState("");
  const [isConfirmExcluirOpen, setIsConfirmExcluirOpen] = useState(false);

  useEffect(() => {
    if (location.state) {
      setPratoInfo(location.state);
    }
  }, [location.state]);

  const { dishes, refetch } = usePratos(pratoInfo?.restauranteId); // Para as recomendações

  const handlePratoAdicionado = async (newPratoId) => {
    refetch();
    if (newPratoId) {
      if (!id) {
        try {
          const data = await pratoService.buscarPrato(newPratoId);
          setPratoInfo({
            id: data.id,
            name: data.nome,
            description: data.descricao,
            price: `R$ ${parseFloat(data.preco).toFixed(2).replace('.', ',')}`,
            image: data.foto_prato,
            rating: 4.5,
            restaurant: data.restaurante_nome,
            restauranteId: data.restaurante_id
          });
        } catch (err) {
          console.error(err);
        }
      }
    }
  };


  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const data = await userService.getPerfil();
          setTipoUsuario(data.tipoUsuario || "cliente");
          setMeuUserId(data.id);
          setMeuNome(data.nome);
          if (data.restaurante_ids) {
            setMeusRestaurantesIds(data.restaurante_ids);
          }
          if (data.restaurantes) {
            setMeusRestaurantes(data.restaurantes);
          }
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchDados = async () => {
      if (!id && (!pratoInfo || !pratoInfo.id) && meusRestaurantesIds.length > 0 && dishes.length > 0) {
        const targetRestId = pratoInfo?.restauranteId ? Number(pratoInfo.restauranteId) : Number(meusRestaurantesIds[0]);
        const myDishes = dishes.filter(d => Number(d.restauranteId) === targetRestId);
        if (myDishes.length > 0) {
          const firstDish = myDishes[0];
          try {
            const data = await pratoService.buscarPrato(firstDish.id);
            setPratoInfo({
              id: data.id,
              name: data.nome,
              description: data.descricao,
              price: `R$ ${parseFloat(data.preco).toFixed(2).replace('.', ',')}`,
              image: data.foto_prato,
              rating: 4.5,
              restaurant: data.restaurante_nome,
              restauranteId: data.restaurante_id
            });
          } catch (e) { console.error(e); }
          return;
        }
      }

      const currentId = id || pratoInfo?.id;
      if (!currentId) return;

      try {
        if (id && (!pratoInfo || pratoInfo.id != id || !pratoInfo.price)) {
          const data = await pratoService.buscarPrato(id);
          setPratoInfo({
            id: data.id,
            name: data.nome,
            description: data.descricao,
            price: `R$ ${parseFloat(data.preco).toFixed(2).replace('.', ',')}`,
            image: data.foto_prato,
            rating: 4.5, // placeholder caso não tenha nota média
            restaurant: data.restaurante_nome,
            restauranteId: data.restaurante_id
          });
        }

        const avaliacoes = await avaliacaoService.listar({ id_prato: currentId });
        setListaComentarios(avaliacoes.map(av => ({
          id: av.id,
          id_usuario: av.id_usuario,
          nome: av.usuario_nome || "Usuário",
          iniciais: av.usuario_nome ? av.usuario_nome.substring(0, 2).toUpperCase() : "US",
          foto: av.usuario_foto,
          nota: parseFloat(av.nota),
          texto: av.comentario
        })));
      } catch (e) {
        console.error(e);
      }
    };
    fetchDados();
  }, [id, pratoInfo, meusRestaurantesIds, dishes]);

  // calculo da media geral
  const mediaGeralDinamica = listaComentarios.length > 0
    ? listaComentarios.reduce((soma, comentario) => soma + comentario.nota, 0) / listaComentarios.length
    : 0;

  const pratoPrincipal = (pratoInfo && pratoInfo.id) ? pratoInfo : {
    name: "Aguardando pratos...",
    price: "---",
    description: "Nenhum prato cadastrado para este restaurante ainda.",
    image: "https://via.placeholder.com/800x600?text=Sem+Pratos",
    restaurant: "...",
    restauranteId: pratoInfo?.restauranteId || null
  };

  const recomendacoes = dishes.filter(
    (dish) => dish.restauranteId === pratoPrincipal.restauranteId && dish.id !== pratoPrincipal.id
  ).slice(0, 5);

  const comentariosExibidos = mostrarTodosComentarios ? listaComentarios : listaComentarios.slice(0, 2);

  const handleSalvarAvaliacao = async (dadosDaAvaliacao) => {
    try {
      const novaAvaliacao = await avaliacaoService.criar({
        id_prato: parseInt(pratoPrincipal.id, 10),
        id_restaurante: parseInt(pratoPrincipal.restauranteId, 10),
        nota: parseFloat(dadosDaAvaliacao.nota),
        comentario: dadosDaAvaliacao.comentario
      });

      const novaAvaliacaoVisual = {
        id: novaAvaliacao.id || Date.now(),
        id_usuario: meuUserId,
        nome: meuNome || "Você",
        iniciais: meuNome ? meuNome.substring(0, 2).toUpperCase() : "VC",
        foto: null, // Pode ficar sem foto até recarregar
        nota: parseFloat(novaAvaliacao.nota) || dadosDaAvaliacao.nota,
        texto: dadosDaAvaliacao.comentario || ""
      };

      setListaComentarios([novaAvaliacaoVisual, ...listaComentarios]);
      setMostrarTodosComentarios(true);
      toast.success(`Sucesso! Sua nota ${dadosDaAvaliacao.nota} foi adicionada e a média foi atualizada!`);
    } catch (e) {
      console.error(e);
      toast.error(e.response?.data?.error || "Erro ao avaliar o prato.");
    }
  };

  const handlePratoAtualizado = async () => {
    const currentId = id || pratoInfo?.id;
    if (currentId) {
      try {
        const data = await pratoService.buscarPrato(currentId);
        setPratoInfo({
          id: data.id,
          name: data.nome,
          description: data.descricao,
          price: `R$ ${parseFloat(data.preco).toFixed(2).replace('.', ',')}`,
          image: data.foto_prato,
          rating: 4.5,
          restaurant: data.restaurante_nome,
          restauranteId: data.restaurante_id
        });
        refetch();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleExcluirPratoConfirmado = async () => {
    const currentId = id || pratoInfo?.id;
    if (!currentId) return;

    try {
      await pratoService.deletarPrato(currentId);
      toast.success("Prato excluído com sucesso!");
      setIsConfirmExcluirOpen(false);
      if (pratoPrincipal.restauranteId) {
        navigate(`/restaurante/${pratoPrincipal.restauranteId}`);
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Erro ao excluir prato.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8EDDB]/30 flex flex-col font-sans text-black p-6 md:p-10">
      <HeaderSearch hideBackButton={true} />


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


        <div className="bg-white rounded-[24px] shadow-xl p-8 flex flex-col md:flex-row gap-8 lg:gap-12">


          <div className="w-full md:w-1/2 shrink-0 self-center">
            <img
              src={pratoPrincipal.image}
              alt={pratoPrincipal.name}
              className="w-full h-auto object-cover rounded-[16px] max-h-[450px]"
            />
          </div>

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


            <div className="mt-4 flex flex-col sm:flex-row justify-start gap-4">
              {(!meusRestaurantesIds.includes(Number(pratoPrincipal.restauranteId))) && (
                <div className="w-full sm:w-[320px]">
                  <AvaliarButton
                    tipo="prato"
                    nomeItem={pratoPrincipal.name}
                    onSubmit={handleSalvarAvaliacao}
                  />
                </div>
              )}
              {tipoUsuario === "dono" && meusRestaurantes.length > 0 && (
                <>
                  {meusRestaurantesIds.includes(Number(pratoPrincipal.restauranteId)) ? (
                    <div className="flex flex-col sm:flex-row gap-4 w-full">
                      <div className="w-full sm:w-[220px]">
                        <EditarPratoModal
                          prato={pratoPrincipal}
                          onPratoAtualizado={handlePratoAtualizado}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsConfirmExcluirOpen(true)}
                        className="w-full sm:w-[220px] h-[48px] bg-[#C13D33] hover:bg-[#a53229] text-white text-[13px] font-bold rounded-[8px] border-none outline-none cursor-pointer flex items-center justify-center transition-colors shadow-xs active:scale-98 uppercase tracking-widest font-sans"
                      >
                        Excluir Prato
                      </button>
                    </div>
                  ) : (
                    <div className="w-full sm:w-[320px]">
                      <AdicionarPratoModal
                        onPratoAdicionado={handlePratoAdicionado}
                        restaurantes={meusRestaurantes}
                        restauranteIdInicial={meusRestaurantesIds.includes(Number(pratoPrincipal.restauranteId)) ? pratoPrincipal.restauranteId : meusRestaurantes[0].id}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>


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
                  {coment.foto ? (
                    <img src={coment.foto} alt={coment.nome} className="w-10 h-10 rounded-full object-cover shrink-0" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#E7CC9F] text-[#4A3C24] font-bold flex items-center justify-center shrink-0">
                      {coment.iniciais}
                    </div>
                  )}
                  <div className="flex flex-col gap-1 w-full">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[15px]">
                        {coment.id_usuario === meuUserId ? "Você" : coment.nome}
                      </span>
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
                <DishCard key={dish.id} id={dish.id} image={dish.image} name={dish.name} restaurant={dish.restaurant} restauranteId={dish.restauranteId} rating={dish.rating} hideRating={true} hideLink={true} />
              ))}
            </div>
          </div>

        </div>
      </main>

      <ConfirmModal
        isOpen={isConfirmExcluirOpen}
        title="Excluir Prato"
        message={`Tem certeza de que deseja excluir o prato "${pratoPrincipal.name}" permanentemente do cardápio?`}
        confirmText="Excluir"
        cancelText="Cancelar"
        onConfirm={handleExcluirPratoConfirmado}
        onCancel={() => setIsConfirmExcluirOpen(false)}
      />
    </div>
  );
};

export default Prato;