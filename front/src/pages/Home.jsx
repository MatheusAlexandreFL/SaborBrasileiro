import SaborHeader from "../components/SaborHeader";
import RestaurantCard from "../components/RestaurantCard";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <SaborHeader />
      <main className="px-4 py-8 sm:px-6 xl:px-8">
        <RestaurantCard
          imageUrl="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80"
          location="Rio de Janeiro, RJ"
          rank={1}
          rating="4,9"
          title="Origem Cozinha Natural"
          type="Saudável - Contemporânea"
        />
      </main>
    </div>
  );
};

export default Home;

