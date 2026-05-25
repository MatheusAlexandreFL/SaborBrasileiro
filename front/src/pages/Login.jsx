import { useState } from "react";
import Button from "../components/button";
import Input from "../components/input";
//import axios from "axios"; 
const Login = () => {
    const [email, setEmail] = useState(null);
    const [senha, setSenha] = useState(null);

    const handleSubmit = (evento) => {
    evento.preventDefault();
  };

    return(
        <div className="min-h-screen bg-linear-to-b from-[#E7CC9F] via-[#F8EDDB] 50% to-[#F8EDDB] flex items-center justify-center">
      
            <form onSubmit={handleSubmit} className="bg-[#ffffff] w-full max-w-[400px] flex flex-col rounded-[19px] px-[48px] pt-[70px] pb-[48px] justify-center">
                
                <h1 className="text-[#C13D33] text-[25px] text-center font-extrabold">
                Sabor Brasileiro
                </h1>

                {/* bloco que controla os espaçamentos do Figma */}
                <div className="mt-[40px] flex flex-col gap-[40px]">

                <Input value={email} label="Email" type="email" onChange={(evento) => setEmail(evento.target.value)} />
                <Input value={senha} label="Senha" type="password" onChange={(evento) => setSenha(evento.target.value)} />
                <Button text="Login"/>

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

