import { useState, useEffect } from 'react';
import api from '../lib/axios';
import { mockFarms, type Farm } from '../data/mockData';

export function useFarms() {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/farms')
      .then(({ data }) => setFarms(data))
      .catch(() => setFarms(mockFarms))
      .finally(() => setLoading(false));
  }, []);

  return { farms, loading };
}
