const TipoUsuarioSeletor = ({ tipoUsuario, setTipoUsuario }) => {
    return (
        <div className="mt-[55px] mb-[30px] bg-[#F5E6CA]/50 p-1 h-[50px] rounded-full flex items-center relative w-full select-none">
            {/* botão Cliente */}
            <button
                type="button"
                onClick={() => setTipoUsuario("cliente")}
                className={`flex-1 h-full m-[15px] text-center border-none text-[14px] font-bold rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center ${
                    tipoUsuario === "cliente"
                        ? "bg-[#C13D33] text-[#ffffff] shadow-sm"
                        : "bg-transparent text-[#000000]/60"
                }`}
            >
                Cliente
            </button>

            {/* botão Dono de Restaurante */}
            <button
                type="button"
                onClick={() => setTipoUsuario("restaurante")}
                className={`flex-1 h-full m-[15px] text-center border-none text-[14px] font-bold rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center ${
                    tipoUsuario === "restaurante"
                        ? "bg-[#C13D33] text-[#ffffff] shadow-sm"
                        : "bg-transparent text-[#000000]/60"
                }`}
            >
                Dono de Restaurante
            </button>
        </div>
    );
};

export default TipoUsuarioSeletor;


