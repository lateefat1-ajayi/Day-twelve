export default function AudioPlayer({ track }) {
  if (!track) return null;

  return (
    <div className="mt-6">
      <h3 className="text-lg mb-1">Now Playing</h3>
      <p className="font-semibold">{track.title}</p>
      <p className="text-sm text-gray-300">{track.artist.name}</p>
      <audio
        controls
        src={track.preview}
        className="w-full mt-2"
        autoPlay
      />
    </div>
  );
}
