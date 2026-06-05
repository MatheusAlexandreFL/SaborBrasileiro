import { useState, useEffect } from "react";
import { pratoService } from "../services/api";

// Função utilitária para mapear dados do prato do backend para o formato do frontend
const mapPrato = (prato) => ({
  id: prato.id,
  name: prato.nome,
  description: prato.descricao,
  price: `R$ ${parseFloat(prato.preco).toFixed(2).replace('.', ',')}`,
  image: prato.foto_prato,
  rating: parseFloat(prato.media_avaliacoes) || 0,
  restaurant: prato.restaurante_nome,
  restauranteId: prato.restaurante_id,
  categoryKey: "todos"
});

/**
 * Hook para buscar pratos da API e mapear para o formato do frontend.
 * Evita duplicação da lógica de fetch em Home, Prato e TelaRestaurante.
 */
export default function usePratos(id_restaurante) {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPratos = async () => {
      try {
        setLoading(true);
        const data = await pratoService.listarPratos(id_restaurante);
        setDishes(data.map(mapPrato));
      } catch (error) {
        console.error("Erro ao carregar pratos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPratos();
  }, [id_restaurante]);

  const refetch = async () => {
    try {
      setLoading(true);
      const data = await pratoService.listarPratos(id_restaurante);
      setDishes(data.map(mapPrato));
    } catch (error) {
      console.error("Erro ao carregar pratos:", error);
    } finally {
      setLoading(false);
    }
  };

  return { dishes, loading, refetch };
}
