import { useEffect, useState, useCallback } from 'react';
import api from '../lib/axios';

function useAchievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAchievements = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/stats/achievements');
      setAchievements(response.data.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Failed to load achievements.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAchievements();
  }, [fetchAchievements]);

  return { achievements, loading, error };
}

export default useAchievements;