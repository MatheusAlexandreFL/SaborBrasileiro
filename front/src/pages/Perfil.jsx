import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ConfirmModal from "../components/ConfirmModal";
import { userService } from "../services/api";
import { CATEGORIES } from "../mockData";

const Perfil = () => {
  const navigate = useNavigate();


  const [perfil, setPerfil] = useState(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("cliente");

  const [restauranteNome, setRestauranteNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [telefone, setTelefone] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");

  const [restaurantes, setRestaurantes] = useState([]);
  const [restauranteSelecionado, setRestauranteSelecionado] = useState(null);
  const [isNovoRestaurante, setIsNovoRestaurante] = useState(false);

  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");


  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState(null);
  const [mensagemSenha, setMensagemSenha] = useState(null);
  const [isConfirmExcluirOpen, setIsConfirmExcluirOpen] = useState(false);
  const [isConfirmExcluirContaOpen, setIsConfirmExcluirContaOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchPerfil();
  }, [navigate]);

  const fetchPerfil = async () => {
    try {
      const data = await userService.getPerfil();
      setPerfil(data);
      setNome(data.nome || "");
      setEmail(data.email || "");
      setFotoPerfil(data.foto_perfil || "");
      setCnpj(data.cnpj || "");
      setTipoUsuario(data.tipoUsuario || "cliente");
      
      if (data.restaurantes && data.restaurantes.length > 0) {
        setRestaurantes(data.restaurantes);
        selecionarRestaurante(data.restaurantes[0]);
      } else if (data.tipoUsuario === "dono") {
        setRestaurantes([]);
        handleNovoRestaurante();
      }

      localStorage.setItem("foto_perfil", data.foto_perfil || "");
    } catch {
      localStorage.removeItem("token");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };


  const formatarCnpj = (valor) => {
    const numeros = valor.replace(/\D/g, "").slice(0, 14);
    return numeros
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
  };

  const selecionarRestaurante = (rest) => {
    setRestauranteSelecionado(rest);
    setIsNovoRestaurante(false);
    setRestauranteNome(rest.nome || "");
    setDescricao(rest.descricao || "");
    setCategoria(rest.categoria || "");
    setRua(rest.rua || "");
    setNumero(rest.numero || "");
    setBairro(rest.bairro || "");
    setCep(rest.cep || "");
    setCidade(rest.cidade || "");
    setEstado(rest.estado || "");
    setTelefone(rest.telefone || "");
    setImagemUrl(rest.imagem_url || "");
  };

  const handleNovoRestaurante = () => {
    setRestauranteSelecionado(null);
    setIsNovoRestaurante(true);
    setRestauranteNome("");
    setDescricao("");
    setCategoria("");
    setRua("");
    setNumero("");
    setBairro("");
    setCep("");
    setCidade("");
    setEstado("");
    setTelefone("");
    setImagemUrl("");
  };

  const handleSalvarPerfil = async () => {
    setSalvando(true);
    setMensagem(null);
    try {
      const dadosUsuario = {
        nome,
        foto_perfil: fotoPerfil || null,
        ...(tipoUsuario === "dono" && { cnpj: cnpj.replace(/\D/g, "") || null })
      };

      const result = await userService.updatePerfil(dadosUsuario);
      
      if (tipoUsuario === "dono") {
        const dadosRestaurante = {
          nome: restauranteNome || "Não informado",
          descricao,
          categoria: categoria || "Outros",
          rua: rua || "Não informado",
          numero: numero || "S/N",
          bairro: bairro || "Não informado",
          cep: cep || null,
          cidade: cidade || "Não informado",
          estado: estado || "NI",
          telefone,
          imagem_url: imagemUrl
        };
        
        const { restaurantService } = await import("../services/api");
        if (isNovoRestaurante) {
          await restaurantService.criar(dadosRestaurante);
        } else if (restauranteSelecionado) {
          await restaurantService.atualizar(restauranteSelecionado.id, dadosRestaurante);
        }
        await fetchPerfil();
      } else {
        setPerfil(result);
      }

      localStorage.setItem("foto_perfil", result.foto_perfil || "");
      setMensagem({ tipo: "sucesso", texto: "Dados salvos com sucesso!" });
    } catch (error) {
      setMensagem({ tipo: "erro", texto: error.response?.data?.error || error.message || "Erro ao salvar perfil" });
    } finally {
      setSalvando(false);
    }
  };

  const handleAlterarSenha = async () => {
    setMensagemSenha(null);

    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      setMensagemSenha({ tipo: "erro", texto: "Preencha todos os campos de senha" });
      return;
    }
    if (novaSenha !== confirmarSenha) {
      setMensagemSenha({ tipo: "erro", texto: "As senhas não coincidem" });
      return;
    }
    if (novaSenha.length < 6) {
      setMensagemSenha({ tipo: "erro", texto: "A nova senha deve ter pelo menos 6 caracteres" });
      return;
    }

    try {
      await userService.updateSenha({ senhaAtual, novaSenha });

      setSenhaAtual("");
      setNovaSenha("");
      setConfirmarSenha("");
      setMensagemSenha({ tipo: "sucesso", texto: "Senha alterada com sucesso!" });
    } catch (error) {
      setMensagemSenha({ tipo: "erro", texto: error.response?.data?.error || error.message || "Erro ao alterar senha" });
    }
  };

  const handleCancelar = () => {
    if (perfil) {
      setNome(perfil.nome || "");
      setFotoPerfil(perfil.foto_perfil || "");
      setCnpj(perfil.cnpj || "");
      if (perfil.restaurantes && perfil.restaurantes.length > 0) {
        selecionarRestaurante(perfil.restaurantes[0]);
      } else if (tipoUsuario === "dono") {
        handleNovoRestaurante();
      }
    }
    setSenhaAtual("");
    setNovaSenha("");
    setConfirmarSenha("");
    setMensagem(null);
    setMensagemSenha(null);
  };

  const handleExcluirRestauranteConfirmado = async () => {
    if (!restauranteSelecionado) return;

    try {
      setSalvando(true);
      setMensagem(null);
      const { restaurantService } = await import("../services/api");
      await restaurantService.deletar(restauranteSelecionado.id);
      
      setMensagem({ tipo: "sucesso", texto: "Restaurante excluído com sucesso!" });
      setIsConfirmExcluirOpen(false);
      await fetchPerfil();
    } catch (error) {
      setMensagem({ tipo: "erro", texto: error.response?.data?.error || error.message || "Erro ao excluir restaurante" });
    } finally {
      setSalvando(false);
    }
  };

  const handleExcluirContaConfirmado = async () => {
    try {
      setSalvando(true);
      await userService.deletarConta();
      handleEncerrarSessao();
    } catch (error) {
      setMensagem({ tipo: "erro", texto: error.response?.data?.error || error.message || "Erro ao excluir conta" });
      setSalvando(false);
      setIsConfirmExcluirContaOpen(false);
    }
  };

  const handleEncerrarSessao = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("foto_perfil");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8EDDB]/30 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-[#C13D33] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-black/50 font-medium text-[15px]">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8EDDB]/30 flex flex-col font-sans text-black">
      <Navbar onMenuClick={() => setIsSidebarOpen(true)} userPhoto={fotoPerfil} hideSearch={true} hideFilter={true} />

      <main className="flex-1 max-w-[860px] w-full mx-auto px-6 py-10 flex flex-col gap-8">
        {/* Header */}
        <div>
          <h1 className="font-serif text-[32px] md:text-[38px] font-extrabold text-black leading-tight">
            Editar Perfil
          </h1>
          <p className="text-[16px] text-black/50 font-medium mt-1">
            Gerencie suas informações pessoais e segurança.
          </p>
        </div>

        {/* Layout: Foto + Informações */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Foto de Perfil */}
          <div className="md:col-span-4 flex flex-col items-center gap-3">
            <div className="relative group">
              <div className="w-[140px] h-[140px] rounded-full overflow-hidden border-[3px] border-[#C13D33]/20 bg-[#F5E6CA]/40 shadow-sm">
                {fotoPerfil ? (
                  <img
                    src={fotoPerfil}
                    alt="Foto de perfil"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                  />
                ) : null}
                <div
                  className={`w-full h-full items-center justify-center bg-[#F5E6CA]/60 ${fotoPerfil ? 'hidden' : 'flex'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-[#C13D33]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>

              <div className="absolute bottom-1 right-1 w-9 h-9 bg-[#C13D33] rounded-full flex items-center justify-center shadow-md cursor-pointer hover:bg-[#a53229] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <p className="text-[12px] text-black/40 font-medium text-center">JPG ou PNG. Máximo 1MB.</p>

            {/* URL da foto */}
            <div className="w-full mt-1">
              <label className="text-[13px] text-black/50 font-semibold mb-1 block">URL da foto</label>
              <input
                type="url"
                value={fotoPerfil}
                onChange={(e) => setFotoPerfil(e.target.value)}
                placeholder="https://exemplo.com/foto.jpg"
                className="w-full h-[38px] border border-black/10 rounded-[8px] bg-white px-3 text-[13px] outline-none focus:border-[#C13D33] focus:ring-1 focus:ring-[#C13D33] transition-all"
              />
            </div>
          </div>

          <div className="md:col-span-8">
            <div className="bg-white rounded-[16px] border border-black/5 shadow-xs p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#C13D33]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <h2 className="font-serif text-[20px] font-extrabold text-black">Informações Pessoais</h2>
              </div>

              <div className="flex flex-col gap-5">
                {/* Nome */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[14px] text-black/60 font-semibold">Nome</label>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="h-[44px] border border-black/10 rounded-[8px] bg-[#F5E6CA]/20 px-4 text-[14px] outline-none focus:border-[#C13D33] focus:ring-1 focus:ring-[#C13D33] focus:bg-white transition-all"
                  />
                </div>

                {/* Email  */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[14px] text-black/60 font-semibold">E-mail</label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      readOnly
                      className="w-full h-[44px] border border-black/10 rounded-[8px] bg-black/[0.03] px-4 pr-10 text-[14px] text-black/50 outline-none cursor-not-allowed"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-black/30 absolute right-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <p className="text-[12px] text-black/35 mt-0.5">O e-mail não pode ser alterado por motivos de segurança.</p>
                </div>

                {/* CNPJ */}
                {tipoUsuario === "dono" && (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[14px] text-black/60 font-semibold">CNPJ</label>
                    <input
                      type="text"
                      value={formatarCnpj(cnpj)}
                      onChange={(e) => setCnpj(e.target.value.replace(/\D/g, "").slice(0, 14))}
                      placeholder="00.000.000/0000-00"
                      maxLength={18}
                      className="h-[44px] border border-black/10 rounded-[8px] bg-[#F5E6CA]/20 px-4 text-[14px] outline-none focus:border-[#C13D33] focus:ring-1 focus:ring-[#C13D33] focus:bg-white transition-all max-w-[280px]"
                    />
                  </div>
                )}
              </div>

              {tipoUsuario === "dono" && (
                <>
                  <div className="flex items-center gap-2 mb-4 mt-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#C13D33]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <h2 className="font-serif text-[20px] font-extrabold text-black">Meus Restaurantes</h2>
                  </div>
                  
                  <div className="flex overflow-x-auto gap-2 pb-4 mb-4 no-scrollbar">
                    {restaurantes.map((rest, idx) => (
                      <button
                        key={rest.id}
                        type="button"
                        onClick={() => selecionarRestaurante(rest)}
                        className={`whitespace-nowrap px-4 py-2 rounded-full text-[13px] font-bold transition-all cursor-pointer ${
                          !isNovoRestaurante && restauranteSelecionado?.id === rest.id
                            ? "bg-[#C13D33] text-white shadow-sm border border-transparent"
                            : "bg-white text-black/60 border border-black/10 hover:bg-black/5"
                        }`}
                      >
                        {rest.nome}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={handleNovoRestaurante}
                      className={`whitespace-nowrap px-4 py-2 rounded-full text-[13px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                        isNovoRestaurante
                          ? "bg-green-600 text-white shadow-sm border border-transparent"
                          : "bg-white text-green-700 border border-green-600/30 hover:bg-green-50"
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                      Adicionar
                    </button>
                  </div>
                  
                  <div className="flex flex-col gap-5 p-5 bg-[#F5E6CA]/10 rounded-[12px] border border-black/5">
                    {isNovoRestaurante && (
                      <div className="text-[14px] font-semibold text-green-700 mb-2 border-b border-green-100 pb-2">
                        Preencha os dados do novo restaurante. Ele será cadastrado ao clicar em "Salvar Alterações".
                      </div>
                    )}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[14px] text-black/60 font-semibold">Nome do Restaurante</label>
                      <input type="text" value={restauranteNome} onChange={(e) => setRestauranteNome(e.target.value)} className="h-[44px] border border-black/10 rounded-[8px] bg-[#F5E6CA]/20 px-4 text-[14px] outline-none focus:border-[#C13D33] focus:ring-1 focus:ring-[#C13D33] focus:bg-white transition-all" />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[14px] text-black/60 font-semibold">Descrição</label>
                      <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} rows={3} className="border border-black/10 rounded-[8px] bg-[#F5E6CA]/20 px-4 py-2 text-[14px] outline-none focus:border-[#C13D33] focus:ring-1 focus:ring-[#C13D33] focus:bg-white transition-all resize-y"></textarea>
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[14px] text-black/60 font-semibold">Categoria</label>
                        <div className="flex flex-wrap gap-2">
                          {CATEGORIES.filter(c => c.id !== "all").map(c => {
                            const isSelected = (categoria || "").split(",").map(item => item.trim()).includes(c.name);
                            return (
                              <label key={c.id} className={`flex items-center gap-2 px-3 py-1.5 rounded-full border cursor-pointer transition-all ${isSelected ? "border-[#C13D33] bg-[#C13D33]/10 text-[#C13D33]" : "border-black/10 bg-white text-black/60 hover:bg-black/5"}`}>
                                <input
                                  type="checkbox"
                                  className="hidden"
                                  checked={isSelected}
                                  onChange={(e) => {
                                    const selected = (categoria || "").split(",").map(item => item.trim()).filter(Boolean);
                                    if (e.target.checked) {
                                      setCategoria([...selected, c.name].join(", "));
                                    } else {
                                      setCategoria(selected.filter(item => item !== c.name).join(", "));
                                    }
                                  }}
                                />
                                <span className="text-[13px] font-bold">{c.name}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[14px] text-black/60 font-semibold">Telefone</label>
                        <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} className="h-[44px] border border-black/10 rounded-[8px] bg-[#F5E6CA]/20 px-4 text-[14px] outline-none focus:border-[#C13D33] focus:ring-1 focus:ring-[#C13D33] focus:bg-white transition-all max-w-[280px]" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[14px] text-black/60 font-semibold">Rua</label>
                        <input type="text" value={rua} onChange={(e) => setRua(e.target.value)} className="h-[44px] border border-black/10 rounded-[8px] bg-[#F5E6CA]/20 px-4 text-[14px] outline-none focus:border-[#C13D33] focus:ring-1 focus:ring-[#C13D33] focus:bg-white transition-all" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[14px] text-black/60 font-semibold">Número</label>
                        <input type="text" value={numero} onChange={(e) => setNumero(e.target.value)} className="h-[44px] border border-black/10 rounded-[8px] bg-[#F5E6CA]/20 px-4 text-[14px] outline-none focus:border-[#C13D33] focus:ring-1 focus:ring-[#C13D33] focus:bg-white transition-all" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[14px] text-black/60 font-semibold">Bairro</label>
                        <input type="text" value={bairro} onChange={(e) => setBairro(e.target.value)} className="h-[44px] border border-black/10 rounded-[8px] bg-[#F5E6CA]/20 px-4 text-[14px] outline-none focus:border-[#C13D33] focus:ring-1 focus:ring-[#C13D33] focus:bg-white transition-all" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[14px] text-black/60 font-semibold">CEP</label>
                        <input type="text" value={cep} onChange={(e) => setCep(e.target.value)} maxLength={9} placeholder="00000-000" className="h-[44px] border border-black/10 rounded-[8px] bg-[#F5E6CA]/20 px-4 text-[14px] outline-none focus:border-[#C13D33] focus:ring-1 focus:ring-[#C13D33] focus:bg-white transition-all" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[14px] text-black/60 font-semibold">Cidade</label>
                        <input type="text" value={cidade} onChange={(e) => setCidade(e.target.value)} className="h-[44px] border border-black/10 rounded-[8px] bg-[#F5E6CA]/20 px-4 text-[14px] outline-none focus:border-[#C13D33] focus:ring-1 focus:ring-[#C13D33] focus:bg-white transition-all" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[14px] text-black/60 font-semibold">Estado (Sigla)</label>
                        <input type="text" value={estado} onChange={(e) => setEstado(e.target.value)} maxLength={2} className="h-[44px] border border-black/10 rounded-[8px] bg-[#F5E6CA]/20 px-4 text-[14px] outline-none focus:border-[#C13D33] focus:ring-1 focus:ring-[#C13D33] focus:bg-white transition-all uppercase" />
                      </div>
                    </div>

                     <div className="flex flex-col gap-1.5">
                      <label className="text-[14px] text-black/60 font-semibold">URL da Imagem de Capa do Restaurante</label>
                      <input type="url" value={imagemUrl} onChange={(e) => setImagemUrl(e.target.value)} placeholder="https://exemplo.com/foto-restaurante.jpg" className="h-[44px] border border-black/10 rounded-[8px] bg-[#F5E6CA]/20 px-4 text-[14px] outline-none focus:border-[#C13D33] focus:ring-1 focus:ring-[#C13D33] focus:bg-white transition-all" />
                    </div>

                    {!isNovoRestaurante && restauranteSelecionado && (
                      <div className="flex justify-end pt-3 border-t border-black/5 mt-2">
                        <button
                          type="button"
                          onClick={() => setIsConfirmExcluirOpen(true)}
                          className="px-4 py-2 rounded-full text-[13px] font-bold text-red-600 border border-red-600/30 hover:bg-red-50 transition-all cursor-pointer flex items-center gap-1.5 active:scale-[0.98]"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Excluir Restaurante
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}


              {mensagem && (
                <div className={`mt-5 px-4 py-3 rounded-[8px] text-[14px] font-medium flex items-center gap-2 transition-all ${mensagem.tipo === "sucesso"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                  }`}>
                  {mensagem.tipo === "sucesso" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {mensagem.texto}
                </div>
              )}
            </div>
          </div>
        </div>


        <div className="bg-white rounded-[16px] border border-black/5 shadow-xs p-6 md:p-8">
          <div className="flex items-center gap-2 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#C13D33]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <h2 className="font-serif text-[20px] font-extrabold text-black">Alterar Senha</h2>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5 max-w-[320px]">
              <label className="text-[14px] text-black/60 font-semibold">Senha Atual</label>
              <input
                type="password"
                value={senhaAtual}
                onChange={(e) => setSenhaAtual(e.target.value)}
                placeholder="••••••••"
                className="h-[44px] border border-black/10 rounded-[8px] bg-[#F5E6CA]/20 px-4 text-[14px] outline-none focus:border-[#C13D33] focus:ring-1 focus:ring-[#C13D33] focus:bg-white transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] text-black/60 font-semibold">Nova Senha</label>
                <input
                  type="password"
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  placeholder="••••••••"
                  className="h-[44px] border border-black/10 rounded-[8px] bg-[#F5E6CA]/20 px-4 text-[14px] outline-none focus:border-[#C13D33] focus:ring-1 focus:ring-[#C13D33] focus:bg-white transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] text-black/60 font-semibold">Confirmar Nova Senha</label>
                <input
                  type="password"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  placeholder="••••••••"
                  className="h-[44px] border border-black/10 rounded-[8px] bg-[#F5E6CA]/20 px-4 text-[14px] outline-none focus:border-[#C13D33] focus:ring-1 focus:ring-[#C13D33] focus:bg-white transition-all"
                />
              </div>
            </div>
          </div>


          {mensagemSenha && (
            <div className={`mt-5 px-4 py-3 rounded-[8px] text-[14px] font-medium flex items-center gap-2 transition-all ${mensagemSenha.tipo === "sucesso"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
              }`}>
              {mensagemSenha.tipo === "sucesso" ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              {mensagemSenha.texto}
            </div>
          )}
        </div>


        <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
          <button
            onClick={() => { handleSalvarPerfil(); if (senhaAtual) handleAlterarSenha(); }}
            disabled={salvando}
            className={`px-8 py-3 rounded-full text-[15px] font-bold transition-all cursor-pointer border-none flex items-center gap-2 ${salvando
                ? "bg-[#C13D33]/60 text-white/80 cursor-not-allowed"
                : "bg-[#C13D33] text-white hover:bg-[#a53229] active:scale-[0.98] shadow-sm hover:shadow-md"
              }`}
          >
            {salvando ? (
              <>
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                Salvando...
              </>
            ) : (
              "Salvar Alterações"
            )}
          </button>
          <button
            onClick={handleCancelar}
            className="px-8 py-3 rounded-full text-[15px] font-bold bg-white text-black/70 border border-black/10 hover:bg-black/5 hover:text-black transition-all cursor-pointer active:scale-[0.98]"
          >
            Cancelar
          </button>
        </div>


        <div className="bg-white rounded-[16px] border border-red-100 shadow-xs p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2">
          <div>
            <h3 className="font-serif text-[18px] font-extrabold text-[#C13D33]">Encerrar Sessão</h3>
            <p className="text-[14px] text-black/50 font-medium mt-0.5">
              Deseja sair da sua conta em todos os dispositivos?
            </p>
          </div>
          <button
            onClick={handleEncerrarSessao}
            className="flex items-center gap-2 px-6 py-2.5 rounded-[8px] bg-[#C13D33] text-white font-bold text-[14px] hover:bg-[#a53229] transition-colors cursor-pointer border-none active:scale-[0.97] shadow-sm whitespace-nowrap"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sair da Conta
          </button>
        </div>

        {/* Zona de Perigo - Excluir Conta */}
        <div className="bg-white rounded-[16px] border border-red-200 shadow-xs p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2 mb-4">
          <div>
            <h3 className="font-serif text-[18px] font-extrabold text-[#C13D33]">Excluir Minha Conta</h3>
            <p className="text-[14px] text-black/50 font-medium mt-0.5 max-w-lg">
              Atenção: Ao excluir sua conta, todos os seus dados (perfil, restaurantes, pratos e avaliações) serão apagados permanentemente. Esta ação não pode ser desfeita.
            </p>
          </div>
          <button
            onClick={() => setIsConfirmExcluirContaOpen(true)}
            className="px-8 py-3 rounded-full text-[15px] font-bold transition-all cursor-pointer border-none flex items-center gap-2 bg-[#C13D33] text-white hover:bg-[#a53229] active:scale-[0.98] shadow-sm hover:shadow-md whitespace-nowrap"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Excluir Conta
          </button>
        </div>
      </main>


      <footer className="border-t border-black/5 py-8 mt-12 bg-white text-center">
        <p className="text-[14px] text-black/40 font-semibold">
          &copy; 2026 Sabor Brasileiro. Todos os direitos reservados.
        </p>
      </footer>

      <ConfirmModal
        isOpen={isConfirmExcluirOpen}
        title="Excluir Restaurante"
        message={restauranteSelecionado ? `Tem certeza de que deseja excluir o restaurante "${restauranteSelecionado.nome}" permanentemente? Todos os pratos e avaliações associados serão excluídos.` : ""}
        confirmText="Excluir"
        cancelText="Cancelar"
        onConfirm={handleExcluirRestauranteConfirmado}
        onCancel={() => setIsConfirmExcluirOpen(false)}
      />

      <ConfirmModal
        isOpen={isConfirmExcluirContaOpen}
        title="Excluir Conta Definitivamente"
        message="Tem certeza absoluta que deseja excluir sua conta? TODOS os seus dados, restaurantes, pratos e avaliações serão perdidos para sempre."
        confirmText="Sim, excluir minha conta"
        cancelText="Cancelar"
        onConfirm={handleExcluirContaConfirmado}
        onCancel={() => setIsConfirmExcluirContaOpen(false)}
      />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        navItems={["Início", "Sobre nós"]}
        activeItem="Perfil"
        onSelect={(item) => {
          if (item === "Início") {
            navigate("/");
          } else if (item === "Sobre nós") {
            navigate("/sobre-nos");
          }
        }}
      />
    </div>
  );
};

export default Perfil;
