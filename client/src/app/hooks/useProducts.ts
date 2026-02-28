import { useState, useEffect } from 'react';
import api from '../lib/axios';
import { mockProducts, type Product } from '../data/mockData';

export function useProducts(category?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params: Record<string, string> = {};
        if (category && category !== 'all') params.category = category;
        const { data } = await api.get('/products', { params });
        setProducts(data);
      } catch (err: any) {
        console.warn('API not available, using mock data');
        const filtered = category && category !== 'all'
          ? mockProducts.filter(p => p.category === category)
          : mockProducts;
        setProducts(filtered);
        setError(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  return { products, loading, error };
}
