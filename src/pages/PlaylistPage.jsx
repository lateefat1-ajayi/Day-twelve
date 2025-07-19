import { useEffect, useState } from "react";
import AudioPlayer from "../components/AudioPlayer";


export default function PlaylistPage() {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("playlist")) || [];
    setPlaylist(stored);
  }, []);

  const removeFromPlaylist = (id) => {
    const updated = playlist.filter((t) => t.id !== id);
    setPlaylist(updated);
    localStorage.setItem("playlist", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 to-indigo-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">🎵 Your Playlist</h1>
      {playlist.length === 0 ? (
        <p className="text-gray-300">You haven't added any tracks yet.</p>
      ) : (
        <ul className="space-y-4 mb-6">
          {playlist.map((track) => (
            <li
              key={track.id}
              className="bg-white/10 p-4 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{track.title}</p>
                <p className="text-sm text-gray-300">{track.artist.name}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentTrack(track)}
                  className="bg-white text-purple-700 px-3 py-1 rounded text-sm"
                >
                  ▶
                </button>
                <button
                  onClick={() => removeFromPlaylist(track.id)}
                  className="bg-red-400 text-white rounded p-1 hover:bg-red-500 text-xl"
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <AudioPlayer track={currentTrack} />

      <a href="/music" className="inline-block mt-6 underline text-sm text-gray-200">
        ← Back to Music Player
      </a>
    </div>
  );
}
