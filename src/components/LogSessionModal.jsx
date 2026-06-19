import { useState } from 'react';
import api from '../lib/axios';

function LogSessionModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    session_type: 'fitness',
    duration_minutes: '',
    intensity: 'medium',
    notes: '',
    session_date: new Date().toISOString().split('T')[0],
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/sessions', {
        ...formData,
        duration_minutes: parseInt(formData.duration_minutes),
      });

      onSuccess();
      onClose();
      setFormData({
        title: '',
        session_type: 'fitness',
        duration_minutes: '',
        intensity: 'medium',
        notes: '',
        session_date: new Date().toISOString().split('T')[0],
      });
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Failed to log session.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Log Training Session</h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white text-xl leading-none"
          >
            x
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-300 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Morning Fitness Run"
              className="w-full bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-green-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-300 mb-1">Type</label>
              <select
                name="session_type"
                value={formData.session_type}
                onChange={handleChange}
                className="w-full bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-green-500"
              >
                <option value="fitness">Fitness</option>
                <option value="technical">Technical</option>
                <option value="tactical">Tactical</option>
                <option value="match">Match</option>
                <option value="recovery">Recovery</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-zinc-300 mb-1">Intensity</label>
              <select
                name="intensity"
                value={formData.intensity}
                onChange={handleChange}
                className="w-full bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-green-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-300 mb-1">Duration (min)</label>
              <input
                type="number"
                name="duration_minutes"
                value={formData.duration_minutes}
                onChange={handleChange}
                required
                min={1}
                className="w-full bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-300 mb-1">Date</label>
              <input
                type="date"
                name="session_date"
                value={formData.session_date}
                onChange={handleChange}
                required
                className="w-full bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-green-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-zinc-300 mb-1">Notes (optional)</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              placeholder="5km run with sprint intervals"
              className="w-full bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-green-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-2.5 rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Session'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LogSessionModal;