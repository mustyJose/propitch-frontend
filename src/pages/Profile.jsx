import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StadiumBackground from '../components/StadiumBackground';
import useAuthStore from '../store/authStore';
import api from '../lib/axios';

function Profile() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const setAuth = useAuthStore((state) => state.setAuth);
  const accessToken = useAuthStore((state) => state.accessToken);

  const [formData, setFormData] = useState({
    full_name: user?.full_name || '',
    position: user?.position || '',
    age: user?.age || '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const response = await api.put('/auth/profile', formData);
      const updatedUser = response.data.data;
      setAuth(updatedUser, accessToken, localStorage.getItem('refreshToken'));
      setMessage('Profile updated successfully.');
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen text-white">
      <StadiumBackground />

      <div className="relative z-10 max-w-md mx-auto px-6 py-10">
        <button
          onClick={() => navigate('/dashboard')}
          className="text-zinc-400 hover:text-white text-sm mb-2 block"
        >
          ← Back to Dashboard
        </button>

        <div className="bg-zinc-900/70 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 mt-4">
          <h1 className="text-2xl font-bold mb-1">Profile</h1>
          <p className="text-zinc-400 text-sm mb-6">{user?.email}</p>

          {message && (
            <div className="bg-green-500/10 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg mb-4 text-sm">
              {message}
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-zinc-300 mb-1">Full Name</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className="w-full bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-300 mb-1">Position</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="w-full bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-300 mb-1">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-green-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-2.5 rounded-lg transition disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;