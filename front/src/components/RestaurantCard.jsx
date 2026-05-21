const RestaurantCard = ({
  imageUrl,
  location,
  rank,
  rating,
  title,
  type,
}) => {
  return (
    <article className="w-[220px] overflow-hidden rounded-xl border border-zinc-400 bg-white shadow-[0_3px_8px_rgba(0,0,0,0.35)] transition duration-300 ease-out hover:-translate-y-1 hover:cursor-pointer hover:shadow-[0_10px_22px_rgba(0,0,0,0.28)]">
      <div className="relative h-[180px] overflow-hidden rounded-b-lg">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition duration-500 ease-out hover:scale-105"
        />
        <span className="absolute left-4 top-6 grid size-10 place-items-center rounded-full bg-[#e4aa43] font-notoserif text-sm font-bold text-black shadow-md">
          {rank}
        </span>
      </div>

      <div className="space-y-4 px-4 pb-5 pt-3">
        <h2 className="font-notoserif text-base font-bold leading-tight text-black">{title}</h2>

        <div className="flex items-center gap-1.5 text-sm font-bold text-black">
          <span className="text-xl leading-none text-amber-400" aria-hidden="true">
            ★
          </span>
          <span>{rating}</span>
        </div>

        <p className="font-notoserif text-sm leading-tight text-black">{type}</p>

        <div className="relative font-notoserif text-sm leading-tight text-black">
          <span className="absolute left-[-4px] top-1/2 -translate-y-1/2 text-xl leading-none" aria-hidden="true">
            📍
          </span>
          <span className="block pl-6">{location}</span>
        </div>
      </div>
    </article>
  );
};

export default RestaurantCard;
