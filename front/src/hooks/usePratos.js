import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { pratoService } from "../services/api";

/**
 * Hook para buscar pratos da API e mapear para o formato do frontend.
 * Evita duplicação da lógica de fetch em Home, Prato e TelaRestaurante.
 */
export default function usePratos(id_restaurante) {
  const navigate = useNavigate();
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchPratos = async () => {
      try {
        setLoading(true);
        const data = await pratoService.listarPratos(id_restaurante);
        const mappedDishes = data.map(prato => ({
          id: prato.id,
          name: prato.nome,
          description: prato.descricao,
          price: `R$ ${parseFloat(prato.preco).toFixed(2).replace('.', ',')}`,
          image: prato.foto_prato,
          rating: 4.5,
          restaurant: prato.restaurante_nome,
          restauranteId: prato.restaurante_id,
          categoryKey: "todos"
        }));
        setDishes(mappedDishes);
      } catch (error) {
        console.error("Erro ao carregar pratos:", error);
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPratos();
  }, [navigate, id_restaurante]);

  return { dishes, loading };
}
