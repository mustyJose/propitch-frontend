import { useEffect, useState, useCallback } from 'react';
import api from '../lib/axios';

function useSessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchSessions = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/sessions');
      setSessions(response.data.data.sessions);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Failed to load sessions.');
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteSession = async (id) => {
    await api.delete(`/sessions/${id}`);
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  return { sessions, loading, error, refetch: fetchSessions, deleteSession };
}

export default useSessions;