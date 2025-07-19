export default function Playlist({ playlist, onRemove, preview = false }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
        🎵 Playlist {preview && <span className="text-sm opacity-70">(Preview)</span>}
      </h2>

      {playlist.length === 0 ? (
        <p className="text-sm text-gray-300">No songs added yet.</p>
      ) : (
        <ul className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {playlist.map((track) => (
            <li
              key={track.id}
              className="flex justify-between items-center bg-white/10 p-2 rounded"
            >
              <div className="truncate w-3/4">
                <p className="font-semibold truncate">{track.title}</p>
                <p className="text-sm text-gray-300 truncate">{track.artist.name}</p>
              </div>
              {onRemove && (
                <button
                  onClick={() => onRemove(track.id)}
                  className="bg-red-500 hover:bg-red-600 text-white rounded px-2 py-1 text-sm"
                  aria-label={`Remove ${track.title} from playlist`}
                >
                  ✕
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {preview && playlist.length > 0 && (
        <div className="mt-3 text-right">
          <a
            href="/playlist"
            className="text-sm text-purple-300 hover:underline"
          >
            View Full Playlist →
          </a>
        </div>
      )}
    </div>
  );
}
