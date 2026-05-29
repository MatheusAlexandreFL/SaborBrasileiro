import { useState } from "react";
import Button from "../components/button";
import Input from "../components/input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (evento) => {
      // impede a página de recarregar 
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
        <div className="min-h-screen bg-linear-to-b from-[#E7CC9F] via-[#F8EDDB] 50% to-[#F8EDDB] flex items-center justify-center">
      
            <form onSubmit={handleSubmit} className="bg-[#ffffff] w-full max-w-[400px] flex flex-col rounded-[19px] px-[48px] pt-[70px] pb-[48px] justify-center">
                
                <h1 className="text-[#C13D33] text-[25px] text-center font-extrabold">
                Sabor Brasileiro
                </h1>

                <div className="mt-[40px] flex flex-col gap-[40px]">

                <Input value={email} label="Email" type="email" onChange={(evento) => setEmail(evento.target.value)} />
                <Input value={senha} label="Senha" type="password" onChange={(evento) => setSenha(evento.target.value)} />
                
                {/* mostra o erro na tela caso a senha  errada */}
                {erro && (
                  <span className="text-[#C13D33] text-[14px] font-bold text-center -mt-[20px]">
                    {erro}
                  </span>
                )}

                {/* O botão muda o texto enquanto ta conectando no banco */}
                <Button text={carregando ? "Entrando..." : "Login"}/>

                <a
                    href="#"
                    className="text-[#C13D33] text-[16px] text-center no-underline hover:underline"
                >
                    Esqueceu sua senha?
                </a>

                </div>

            </form>
    </div>
    )
}
export default Login;