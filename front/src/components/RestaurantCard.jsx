const RestaurantCard = ({ rank, image, name, rating, category, location }) => {
  return (
    <div className="flex flex-col bg-white rounded-[19px] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg group cursor-pointer w-full">

      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[15px] bg-black/5">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />


        {rank && (
          <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-[#E7CC9F] text-[#4A3C24] font-bold flex items-center justify-center text-sm shadow-md border border-[#F8EDDB]/50">
            {rank}
          </div>
        )}
      </div>


      <div className="pt-4 pb-2 px-1 flex flex-col gap-1">
        <h3 className="font-serif text-[18px] font-extrabold text-black tracking-tight leading-tight group-hover:text-[#C13D33] transition-colors">
          {name}
        </h3>


        <div className="flex items-center gap-1.5 text-[14px] font-bold text-black/80 mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4 text-amber-500"
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clipRule="evenodd"
            />
          </svg>
          <span>{rating.toFixed(1)}</span>
        </div>


        <p className="text-[14px] text-black/50 font-medium">
          {category}
        </p>


        <div className="flex items-center gap-1 text-[13px] text-black/50 font-medium mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4 text-black/40"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
          <span>{location}</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
