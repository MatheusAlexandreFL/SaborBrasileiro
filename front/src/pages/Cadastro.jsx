import { useState } from "react";
import Button from "../components/button";
import Input from "../components/input";
import TipoUsuarioSeletor from "../components/tipoUsuarioSeletor";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import imgPrato1 from "../assets/prato1Login.avif";
import imgPrato2 from "../assets/prato2Login.avif";
import imgFundoLogin from "../assets/fundoLogin.avif";

const Cadastro = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [tipoUsuario, setTipoUsuario] = useState("cliente");
    const [cnpj, setCnpj] = useState("");

    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const [carregando, setCarregando] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (evento) => {
        evento.preventDefault();
        setErro("");
        setSucesso("");
        setCarregando(true);

        try {
            const dadosCadastro = {
                nome,
                email,
                senha,
                tipoUsuario,
                cnpj: tipoUsuario === "restaurante" ? cnpj : null 
            };

            await axios.post("http://localhost:5000/cadastrar-teste", dadosCadastro);
            setSucesso("Cadastro realizado com sucesso! Redirecionando...");

            setTimeout(() => {
                navigate("/login");
            }, 2000);
        }
        catch (error) { 
            console.error("Erro ao cadastrar:", error);
            if (error.response) {
                setErro(error.response.data.error || "Ocorreu um erro ao realizar o cadastro.");
            } else {
                setErro("Servidor indisponível.");
            }
        }
        finally {
            setCarregando(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8EDDB]/30 flex items-center justify-center p-4 md:p-8 overflow-hidden">

            <div className="bg-white w-full max-w-[950px] min-h-[600px] rounded-[32px] shadow-2xl flex p-3 md:p-4">
                
                {/* METADE ESQUERDA: Formulário */}
                <div className="w-full md:w-1/2 flex flex-col justify-center px-4 md:px-12 py-6 relative z-20">
                    
                    <div className="max-w-[340px] w-full mx-auto">
                        <h1 className="text-[#C13D33] text-[32px] font-extrabold font-serif leading-tight">
                            Sabor Brasileiro
                        </h1>
                        <p className="text-[14px] font-bold text-black/40 mt-1 mb-6">
                            Junte-se a nós! Crie sua conta.
                        </p>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

                            <TipoUsuarioSeletor tipoUsuario={tipoUsuario} setTipoUsuario={setTipoUsuario} />

                            <Input value={nome} label="Nome completo" type="text" onChange={(evento) => setNome(evento.target.value)} />
                            <Input value={email} label="Email" type="email" onChange={(evento) => setEmail(evento.target.value)} />
                            <Input value={senha} label="Senha" type="password" onChange={(evento) => setSenha(evento.target.value)} />
                            
                            {tipoUsuario === "restaurante" && (
                                <Input value={cnpj} label="CNPJ" type="text" onChange={(evento) => setCnpj(evento.target.value)} />
                            )}

                            {erro && (
                                <span className="text-[#C13D33] text-[13px] font-bold text-center mt-1">
                                    {erro}
                                </span>
                            )}
                            {sucesso && (
                                <span className="text-green-600 text-[13px] font-bold text-center mt-1">
                                    {sucesso}
                                </span>
                            )}

                            <div className="mt-1">
                                <Button text={carregando ? "Cadastrando..." : "Criar Conta"} />
                            </div>
                            
                            <div className="text-center mt-2">
                                <span className="text-black/50 text-[13px] font-medium">Já tem uma conta? </span>
                                <button 
                                    type="button"
                                    onClick={() => navigate("/login")}
                                    className="text-[#C13D33] text-[13px] font-bold hover:underline transition-colors bg-transparent border-none cursor-pointer p-0"
                                >
                                    Entrar
                                </button>
                            </div>

                        </form>
                    </div>
                </div>

                {/* 🎯 METADE DIREITA: Card de imagens */}
                <div className="hidden md:block md:w-1/2 relative rounded-[24px] overflow-hidden bg-[#FFF9F0]">
                    
                    {/* div Vermelha que ocupa 50% da direita */}
                    <div className="absolute right-0 top-0 bottom-0 w-[50%] bg-[#C13D33]"></div>

                    {/* circulo vazado de fundo*/}
                    <div className="absolute top-[8%] left-[10%] w-[180px] h-[180px] border-[6px] border-[#C13D33]/15 rounded-full"></div>

                    {/* pratos flutuantes */}
                    
                    {/* prato 1, em cima*/}
                    <img 
                        src={imgPrato1}
                        alt="Prato Principal" 
                        className="absolute top-[12%] right-[15%] w-[240px] h-[240px] object-cover rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.3)] border-[8px] border-[#FFF9F0] hover:scale-105 transition-transform duration-500 z-20"
                    />

                    {/* prato 2 embaixo */}
                    <img 
                        src={imgPrato2}
                        alt="Salada" 
                        className="absolute bottom-[10%] right-[38%] w-[180px] h-[180px] object-cover rounded-full shadow-[0_15px_30px_rgba(0,0,0,0.25)] border-[6px] border-[#FFF9F0] hover:scale-105 transition-transform duration-500 z-10"
                    />

                    {/* prato 3 detalhe de fundo e transparente*/}
                    <img 
                        src={imgFundoLogin}
                        alt="Detalhe" 
                        className="absolute top-[45%] -right-[15%] w-[220px] h-[220px] object-cover rounded-full opacity-30 mix-blend-multiply"
                    />

                </div>

            </div>
        </div>
    );
};

export default Cadastro;