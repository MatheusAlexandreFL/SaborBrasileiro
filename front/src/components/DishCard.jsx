import {useNavigate} from 'react-router-dom';
const DishCard = ({ image, name, rating, restaurant, hideRating = false, hideLink = false }) => {
  const navigate = useNavigate();
  const handleClique = () => {
    navigate("/prato", { 
      state: { image, name, rating, restaurant } 
    });
  };
  return (
    <div onClick={handleClique} className="flex flex-col bg-white rounded-[19px] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg group cursor-pointer w-full">
      
      {/* compartimento da imagem no topo */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[15px] bg-black/5">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* trava da estrela e nota (pra apecer só na pagina homem) */}
        {!hideRating && rating && (
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md border border-black/5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3.5 h-3.5 text-amber-500"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-[12px] font-bold text-black">{rating.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* textos e infos   do Card (Sempre visíveis) */}
      <div className="pt-4 pb-2 px-1 flex flex-col gap-1.5 flex-1 justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="font-serif text-[18px] font-extrabold text-black tracking-tight leading-tight group-hover:text-[#C13D33] transition-colors line-clamp-2">
            {name}
          </h3>
          <p className="text-[14px] text-black/50 font-medium">
            {restaurant}
          </p>
        </div>

        {/* trava condicional apenas para o botao "ver restaurante" */}
        {!hideLink && (
          <div className="flex items-center gap-1.5 text-[14px] font-bold text-[#C13D33] mt-3 group-hover:opacity-90">
            <span>Ver restaurante</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </div>
        )}
      </div>

    </div>
  );
};

export default DishCard;