import { useState } from 'react';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import StadiumBackground from '../components/StadiumBackground';
import useDashboard from '../hooks/useDashboard';
import LogSessionModal from '../components/LogSessionModal';
import ActivityHeatmap from '../components/ActivityHeatmap';
import { getRandomQuote } from '../lib/quotes';

function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useDashboard();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quote] = useState(getRandomQuote());

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="relative min-h-screen text-white">
        <StadiumBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <p className="text-zinc-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative min-h-screen text-white">
        <StadiumBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  const stats = data?.stats || {};
  const recentSessions = data?.recent_sessions || [];
  const recentAchievements = data?.recent_achievements || [];

  return (
    <div className="relative min-h-screen text-white">
      <StadiumBackground />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user?.full_name?.split(' ')[0]}</h1>
            <p className="text-zinc-400">{user?.position || 'Player'}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded-lg text-sm font-semibold"
            >
              Log Session
            </button>
            <button
              onClick={handleLogout}
              className="bg-zinc-800/80 hover:bg-zinc-700 px-4 py-2 rounded-lg text-sm font-medium border border-zinc-700"
            >
              Log Out
            </button>
          </div>
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl px-5 py-4 mb-6">
          <p className="text-zinc-300 italic text-sm">"{quote}"</p>
        </div>

        <div className="flex items-center gap-4 mb-8 text-sm">
          <button
            onClick={() => navigate('/sessions')}
            className="text-zinc-300 hover:text-white"
          >
            Sessions
          </button>
          <span className="text-zinc-600">|</span>
          <button
            onClick={() => navigate('/achievements')}
            className="text-zinc-300 hover:text-white"
          >
            Achievements
          </button>
          <span className="text-zinc-600">|</span>
          <button
            onClick={() => navigate('/profile')}
            className="text-zinc-300 hover:text-white"
          >
            Profile
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-zinc-900/70 backdrop-blur-sm border border-zinc-800 rounded-2xl p-5">
            <p className="text-zinc-400 text-sm mb-1">Total Sessions</p>
            <p className="text-3xl font-bold">{stats.total_sessions || 0}</p>
          </div>
          <div className="bg-zinc-900/70 backdrop-blur-sm border border-zinc-800 rounded-2xl p-5">
            <p className="text-zinc-400 text-sm mb-1">Total Hours</p>
            <p className="text-3xl font-bold">{stats.total_hours || 0}</p>
          </div>
          <div className="bg-zinc-900/70 backdrop-blur-sm border border-zinc-800 rounded-2xl p-5">
            <p className="text-zinc-400 text-sm mb-1">Current Streak</p>
            <p className="text-3xl font-bold text-green-400">{stats.current_streak || 0} days</p>
          </div>
          <div className="bg-zinc-900/70 backdrop-blur-sm border border-zinc-800 rounded-2xl p-5">
            <p className="text-zinc-400 text-sm mb-1">Longest Streak</p>
            <p className="text-3xl font-bold">{stats.longest_streak || 0} days</p>
          </div>
        </div>

        <div className="bg-zinc-900/70 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 mb-10">
          <h2 className="text-lg font-semibold mb-4">Training Activity</h2>
          <ActivityHeatmap />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-zinc-900/70 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Recent Sessions</h2>
              <button
                onClick={() => navigate('/sessions')}
                className="text-green-400 text-sm hover:underline"
              >
                View all
              </button>
            </div>
            {recentSessions.length === 0 ? (
              <p className="text-zinc-500 text-sm">No sessions logged yet.</p>
            ) : (
              <div className="space-y-3">
                {recentSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between border-b border-zinc-800 pb-3 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium">{session.title}</p>
                      <p className="text-zinc-500 text-xs">{session.session_type} - {session.duration_minutes} min</p>
                    </div>
                    <span className="text-xs text-zinc-400">
                      {new Date(session.session_date).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-zinc-900/70 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Recent Achievements</h2>
              <button
                onClick={() => navigate('/achievements')}
                className="text-green-400 text-sm hover:underline"
              >
                View all
              </button>
            </div>
            {recentAchievements.length === 0 ? (
              <p className="text-zinc-500 text-sm">No achievements yet. Log a session to start earning badges.</p>
            ) : (
              <div className="space-y-3">
                {recentAchievements.map((achievement) => (
                  <div key={achievement.id} className="border-b border-zinc-800 pb-3 last:border-0 last:pb-0">
                    <p className="font-medium text-yellow-400">{achievement.title}</p>
                    <p className="text-zinc-500 text-xs">{achievement.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <LogSessionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={refetch}
      />
    </div>
  );
}

export default Dashboard;