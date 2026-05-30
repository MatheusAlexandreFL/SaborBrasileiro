import { useState } from "react";
import Button from "../components/button";
import Input from "../components/input"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";
import imgPrato1 from "../assets/prato1Login.avif";
import imgPrato2 from "../assets/prato2Login.avif";
import imgFundoLogin from "../assets/fundoLogin.avif";

const Login = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (evento) => {
      evento.preventDefault(); 
      setErro(""); 
      setCarregando(true); 
      
      try {
        const resposta = await axios.post("http://localhost:5000/login", {
          email: email,
          senha: senha
        });

        const token = resposta.data.token;
        const fotoPerfil = resposta.data.foto_perfil;
        localStorage.setItem("token", token);
        localStorage.setItem("foto_perfil", fotoPerfil || "");
        navigate("/home");
        
      } catch (error) {
        console.error("Erro ao fazer login:", error);
        
        if (error.response) {
            setErro(error.response.data.error || "Email ou senha incorretos.");        
        } else {
          setErro("Servidor indisponível no momento.");
        }
      } finally {
        setCarregando(false);
      }
    }

    return(
        <div className="min-h-screen bg-[#F8EDDB]/30 flex items-center justify-center p-4 md:p-8 overflow-hidden">
      
            <div className="bg-white w-full max-w-[950px] min-h-[550px] rounded-[32px] shadow-2xl flex p-3 md:p-4">

                {/* METADE ESQUERDA: Formulário */}
                <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-12 py-8 relative z-20">
                    
                    <div className="max-w-[340px] w-full mx-auto">
                        <h1 className="text-[#C13D33] text-[32px] font-extrabold font-serif leading-tight">
                            Sabor Brasileiro
                        </h1>
                        <p className="text-[14px] font-bold text-black/40 mt-1 mb-8">
                            Bem-vindo de volta! Acesse sua conta.
                        </p>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                            <Input value={email} label="Email" type="email" onChange={(evento) => setEmail(evento.target.value)} />
                            
                            <div className="flex flex-col gap-1">
                                <Input value={senha} label="Senha" type="password" onChange={(evento) => setSenha(evento.target.value)} />
                            </div>
                            
                            {erro && (
                              <span className="text-[#C13D33] text-[13px] font-bold text-center mt-2">
                                {erro}
                              </span>
                            )}

                            <div className="-mt-2">
                                <Button text={carregando ? "Entrando..." : "Login"} />
                            </div>

                            <div className="text-center mt-3">
                                <span className="text-black/50 text-[13px] font-medium">Ainda não possui uma conta? </span>
                                <button 
                                    type="button"
                                    onClick={() => navigate("/cadastro")}
                                    className="text-[#C13D33] text-[13px] font-bold hover:underline transition-colors bg-transparent border-none cursor-pointer p-0"
                                >
                                    Cadastrar
                                </button>
                            </div>

                        </form>
                    </div>

                </div>

                {/* 🎯 METADE DIREITA: Efeito "Overlapping" com a cor oficial da marca */}
                <div className="hidden md:block md:w-1/2 relative rounded-[24px] overflow-hidden bg-[#FFF9F0]">
                    
                    {/* Faixa Vertical na extrema direita com a cor do BOTÃO (#C13D33) */}
                    <div className="absolute right-0 top-0 bottom-0 w-[55%] bg-[#C13D33] shadow-[-10px_0_30px_rgba(193,61,51,0.2)]"></div>

                    {/* Grafismos sutis de fundo */}
                    <svg className="absolute left-[5%] top-[10%] w-32 h-32 text-[#C13D33]/10" viewBox="0 0 100 100" fill="currentColor">
                        <path d="M50 0c27.6 0 50 22.4 50 50s-22.4 50-50 50S0 77.6 0 50 22.4 0 50 0zm0 10C27.9 10 10 27.9 10 50s17.9 40 40 40 40-17.9 40-40S72.1 10 50 10z"/>
                    </svg>
                    
                    <svg className="absolute right-[60%] bottom-[20%] w-12 h-12 text-[#C13D33]/20" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>

                    {/* PRATOS FLUTUANTES SOBREPOSTOS NA DIVISÓRIA */}
                    
                    {/* Prato 1: O maior, centralizado no topo invadindo a faixa vermelha */}
                    <img 
                        src={imgPrato1}
                        alt="Prato Principal" 
                        className="absolute top-[12%] right-[32%] w-[240px] h-[240px] object-cover rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.3)] border-[6px] border-[#FFF9F0] hover:scale-105 transition-transform duration-500 z-20"
                    />

                    {/* Prato 2: Menor, mais embaixo, invadindo a parte clara */}
                    <img 
                        src={imgPrato2}
                        alt="Salada" 
                        className="absolute bottom-[10%] right-[45%] w-[190px] h-[190px] object-cover rounded-full shadow-[0_15px_30px_rgba(0,0,0,0.25)] border-[5px] border-[#FFF9F0] hover:scale-105 transition-transform duration-500 z-10"
                    />

                    {/* Prato 3: Detalhe extra lá no fundo da parte vermelha */}
                    <img 
                        src={imgFundoLogin}
                        alt="Detalhe" 
                        className="absolute top-[45%] -right-[15%] w-[180px] h-[180px] object-cover rounded-full shadow-2xl opacity-40 mix-blend-multiply"
                    />

                </div>

            </div>
        </div>
    )
}
export default Login;