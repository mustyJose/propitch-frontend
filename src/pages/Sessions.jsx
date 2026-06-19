import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StadiumBackground from '../components/StadiumBackground';
import LogSessionModal from '../components/LogSessionModal';
import useSessions from '../hooks/useSessions';

function Sessions() {
  const navigate = useNavigate();
  const { sessions, loading, error, refetch, deleteSession } = useSessions();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this session?')) return;
    try {
      await deleteSession(id);
    } catch (err) {
      alert('Failed to delete session.');
    }
  };

  const intensityColor = {
    low: 'text-green-400',
    medium: 'text-yellow-400',
    high: 'text-red-400',
  };

  return (
    <div className="relative min-h-screen text-white">
      <StadiumBackground />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-zinc-400 hover:text-white text-sm mb-2 block"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold">Training Sessions</h1>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded-lg text-sm font-semibold"
          >
            Log Session
          </button>
        </div>

        {loading && <p className="text-zinc-300">Loading sessions...</p>}
        {error && <p className="text-red-400">{error}</p>}

        {!loading && !error && sessions.length === 0 && (
          <div className="bg-zinc-900/70 backdrop-blur-sm border border-zinc-800 rounded-2xl p-10 text-center">
            <p className="text-zinc-400">No sessions logged yet.</p>
          </div>
        )}

        {!loading && !error && sessions.length > 0 && (
          <div className="space-y-3">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="bg-zinc-900/70 backdrop-blur-sm border border-zinc-800 rounded-2xl p-5 flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold">{session.title}</p>
                  <p className="text-zinc-400 text-sm capitalize">
                    {session.session_type} - {session.duration_minutes} min -{' '}
                    <span className={intensityColor[session.intensity]}>{session.intensity}</span>
                  </p>
                  {session.notes && (
                    <p className="text-zinc-500 text-sm mt-1">{session.notes}</p>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs text-zinc-400">
                    {new Date(session.session_date).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => handleDelete(session.id)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <LogSessionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={refetch}
      />
    </div>
  );
}

export default Sessions;