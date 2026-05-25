import { useState } from "react";
import Button from "../components/button";
import Input from "../components/input";
import TipoUsuarioSeletor from "../components/tipoUsuarioSeletor";

const Cadastro = () => {
    const [nome, setNome] = useState(null);
    const [email, setEmail] = useState(null);
    const [senha, setSenha] = useState(null);
    const [tipoUsuario, setTipoUsuario] = useState("cliente");
    const [cnpj, setCnpj] = useState("")
    const handleSubmit = (evento) => {
        evento.preventDefault();

    };
    return(
     // Container principal: Garante altura total da tela, centraliza o card e aplica o degradê de fundo
        <div className="min-h-screen bg-linear-to-b from-[#E7CC9F] via-[#F8EDDB] 50% to-[#F8EDDB] flex items-center justify-center">

            {/* Card de cadastro: Define a estrutura do formulário, com espaçamento interno e bordas arredondadas */}
            <form onSubmit={handleSubmit} className="bg-[#ffffff] w-full max-w-[400px] flex flex-col rounded-[19px] px-[48px] pt-[70px] pb-[48px] justify-center">
                <h1 className="text-[#C13D33] text-[25px] text-center font-extrabold">
                    Sabor Brasileiro
                </h1>

                {/* reaproveitando o componente de tipoUsuarioSeletor.jsx */}
                <TipoUsuarioSeletor tipoUsuario={tipoUsuario} setTipoUsuario={setTipoUsuario} />

                <div className="mt-[30px] flex flex-col gap-[30px]">
                    {/* reaproveitando componentes de input.jsx */}
                    <Input value={nome} label="Nome completo" type="text" onChange={(evento) => setNome(evento.target.value)} />
                    <Input value={email} label="Email" type="email" onChange={(evento) => setEmail(evento.target.value)} />
                    <Input value={senha} label="Senha" type="password" onChange={(evento) => setSenha(evento.target.value)} />

                    <Button text="Criar Conta" />
                    
                    <a href="#" className="hover:underline text-[#000000]/70 text-[16px] text-center no-underline mt-2">
                        Já tem uma conta? <span className="text-[#C13D33] font-bold">Entrar</span>
                    </a>
                </div>
            </form>
        </div>
    )
}
export default Cadastro;

