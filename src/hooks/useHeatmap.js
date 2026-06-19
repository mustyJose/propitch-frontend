import { useEffect, useState } from 'react';
import api from '../lib/axios';

function useHeatmap() {
  const [heatmap, setHeatmap] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHeatmap = async () => {
      try {
        const response = await api.get('/stats/heatmap');
        setHeatmap(response.data.data);
      } catch (err) {
        setError(err.response?.data?.error?.message || 'Failed to load activity data.');
      } finally {
        setLoading(false);
      }
    };

    fetchHeatmap();
  }, []);

  return { heatmap, loading, error };
}

export default useHeatmap;