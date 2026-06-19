import { useEffect, useState, useCallback } from 'react';
import api from '../lib/axios';

function useDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/dashboard');
      setData(response.data.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Failed to load dashboard.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return { data, loading, error, refetch: fetchDashboard };
}

export default useDashboard;