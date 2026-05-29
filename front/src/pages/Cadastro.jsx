import { useState } from "react";
import Button from "../components/button";
import Input from "../components/input";
import TipoUsuarioSeletor from "../components/tipoUsuarioSeletor";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cadastro = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState(""); // cpf obrigatório no banco
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
                cpf, // add o cpf para o backend
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
        <div className="min-h-screen bg-linear-to-b from-[#E7CC9F] via-[#F8EDDB] 50% to-[#F8EDDB] flex items-center justify-center py-10">

            <form onSubmit={handleSubmit} className="bg-[#ffffff] w-full max-w-[400px] flex flex-col rounded-[19px] px-[48px] pt-[70px] pb-[48px] justify-center">
                <h1 className="text-[#C13D33] text-[25px] text-center font-extrabold mb-6">
                    Sabor Brasileiro
                </h1>

                <TipoUsuarioSeletor tipoUsuario={tipoUsuario} setTipoUsuario={setTipoUsuario} />

                <div className="mt-[30px] flex flex-col gap-[30px]">
                    <Input value={nome} label="Nome completo" type="text" onChange={(evento) => setNome(evento.target.value)} />
                    <Input value={email} label="Email" type="email" onChange={(evento) => setEmail(evento.target.value)} />
                    
                    {/* correção: add Input de cpf na tela */}
                    <Input value={cpf} label="CPF" type="text" onChange={(evento) => setCpf(evento.target.value)} />
                    
                    <Input value={senha} label="Senha" type="password" onChange={(evento) => setSenha(evento.target.value)} />
                    
                    {tipoUsuario === "restaurante" && (
                        <Input value={cnpj} label="CNPJ" type="text" onChange={(evento) => setCnpj(evento.target.value)} />
                    )}

                    {/*renderiza as falhas e sucessos na tela com estilização diferente  */}
                    {erro && (
                        <span className="text-[#C13D33] text-[14px] font-bold text-center -mt-[15px]">
                            {erro}
                        </span>
                    )}
                    {sucesso && (
                        <span className="text-[green] text-[14px] font-bold text-center -mt-[15px]">
                            {sucesso}
                        </span>
                    )}

                    <Button text={carregando ? "Cadastrando..." : "Criar Conta"} />
                    
                    <a href="/login" className="hover:underline text-[#000000]/70 text-[16px] text-center no-underline mt-2">
                        Já tem uma conta? <span className="text-[#C13D33] font-bold">Entrar</span>
                    </a>
                </div>
            </form>
        </div>
    );
};

export default Cadastro;