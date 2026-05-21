const DishCard = ({
  imageUrl,
  restaurantName,
  rating,
  title,
}) => {
  return (
    <article className="w-[260px] overflow-hidden rounded-xl border border-zinc-400 bg-white shadow-[0_3px_8px_rgba(0,0,0,0.35)] transition duration-300 ease-out hover:-translate-y-1 hover:cursor-pointer hover:shadow-[0_10px_22px_rgba(0,0,0,0.28)]">
      <div className="relative h-[230px] overflow-hidden rounded-b-xl">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition duration-500 ease-out hover:scale-105"
        />

        <div className="absolute left-5 top-7 flex h-10 items-center gap-2 rounded-md bg-white px-3 font-notoserif text-sm font-bold text-black shadow-sm">
          <span className="text-2xl leading-none text-amber-400" aria-hidden="true">
            ★
          </span>
          <span>{rating}</span>
        </div>
      </div>

      <div className="space-y-5 px-4 pb-8 pt-4">
        <h2 className="font-notoserif text-lg font-bold leading-snug text-black">{title}</h2>

        <p className="font-notoserif text-base leading-tight text-black">{restaurantName}</p>

        <a
          href="#restaurante"
          className="flex items-center justify-between pt-4 font-notoserif text-base font-bold text-[#e4a044] transition hover:cursor-pointer hover:text-[#bf7b21]"
        >
          <span>Ver restaurante</span>
          <span className="text-2xl leading-none" aria-hidden="true">
            →
          </span>
        </a>
      </div>
    </article>
  );
};

export default DishCard;
