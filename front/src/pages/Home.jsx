import SaborHeader from "../components/SaborHeader";
import RestaurantCard from "../components/RestaurantCard";
import DishCard from "../components/DishCard";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <SaborHeader />
      <main className="flex flex-wrap gap-6 px-4 py-8 sm:px-6 xl:px-8">
        <RestaurantCard
          imageUrl="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80"
          location="Rio de Janeiro, RJ"
          rank={1}
          rating="4,9"
          title="Origem Cozinha Natural"
          type="Saudável - Contemporânea"
        />
        <DishCard
          imageUrl="https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=700&q=80"
          rating="4,9"
          restaurantName="Verde & Mar"
          title="Salmão com risoto de limão siciliano"
        />
      </main>
    </div>
  );
};

export default Home;

