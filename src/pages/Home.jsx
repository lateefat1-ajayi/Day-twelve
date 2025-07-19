import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
      <h1 className="text-5xl font-bold mb-6">TuneWave🎶</h1>
      <p className="text-lg mb-4">Search, play, and vibe to your favorite music.</p>
      <button
        onClick={() => navigate("/music")}
        className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-lg hover:bg-gray-200"
      >
        Launch Music Player
      </button>
    </div>
  );
}
