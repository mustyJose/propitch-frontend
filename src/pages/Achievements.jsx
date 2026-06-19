import { useNavigate } from 'react-router-dom';
import StadiumBackground from '../components/StadiumBackground';
import useAchievements from '../hooks/useAchievements';

const ALL_BADGES = [
  { code: 'FIRST_SESSION', title: 'First Whistle', description: 'Logged your first training session.' },
  { code: 'TEN_SESSIONS', title: 'Ten Down', description: 'Completed 10 training sessions.' },
  { code: 'SEVEN_DAY_STREAK', title: 'Week Warrior', description: 'Trained 7 days in a row.' },
  { code: 'TEN_HOURS', title: 'Ten Hours In', description: 'Logged 10 hours of training.' },
];

function Achievements() {
  const navigate = useNavigate();
  const { achievements, loading, error } = useAchievements();

  const earnedCodes = achievements.map((a) => a.badge_code);

  return (
    <div className="relative min-h-screen text-white">
      <StadiumBackground />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-10">
        <button
          onClick={() => navigate('/dashboard')}
          className="text-zinc-400 hover:text-white text-sm mb-2 block"
        >
          ← Back to Dashboard
        </button>
        <h1 className="text-3xl font-bold mb-8">Achievements</h1>

        {loading && <p className="text-zinc-300">Loading achievements...</p>}
        {error && <p className="text-red-400">{error}</p>}

        {!loading && !error && (
          <div className="grid md:grid-cols-2 gap-4">
            {ALL_BADGES.map((badge) => {
              const earned = earnedCodes.includes(badge.code);
              const earnedData = achievements.find((a) => a.badge_code === badge.code);

              return (
                <div
                  key={badge.code}
                  className={`rounded-2xl p-5 border backdrop-blur-sm ${
                    earned
                      ? 'bg-zinc-900/70 border-yellow-500/40'
                      : 'bg-zinc-900/40 border-zinc-800 opacity-50'
                  }`}
                >
                  <p className={`font-semibold ${earned ? 'text-yellow-400' : 'text-zinc-400'}`}>
                    {badge.title}
                  </p>
                  <p className="text-zinc-400 text-sm mt-1">{badge.description}</p>
                  {earned && earnedData && (
                    <p className="text-zinc-500 text-xs mt-2">
                      Earned {new Date(earnedData.earned_at).toLocaleDateString()}
                    </p>
                  )}
                  {!earned && (
                    <p className="text-zinc-500 text-xs mt-2">Not earned yet</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Achievements;