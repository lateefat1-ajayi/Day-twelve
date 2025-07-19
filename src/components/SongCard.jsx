export default function SongCard({ track, onPlay, onAdd }) {
  return (
    <div className="bg-white/10 p-4 rounded-lg shadow hover:bg-white/20 transition">
      <img src={track.album.cover_medium} alt="" className="rounded mb-2" />
      <h3 className="text-lg font-bold">{track.title}</h3>
      <p className="text-sm text-gray-300">{track.artist.name}</p>
      <div className="flex items-center mt-2 gap-2">
        <button
          onClick={() => onPlay(track)}
          className="bg-white text-purple-800 px-2 py-1 rounded"
        >
          ▶ Play
        </button>
        <button
          onClick={() => onAdd(track)}
          className="text-sm underline"
        >
          + Playlist
        </button>
      </div>
    </div>
  );
}
