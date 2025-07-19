import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import SongCard from "../components/SongCard";
import AudioPlayer from "../components/AudioPlayer";
import Playlist from "../components/Playlist";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const corsProxy = "https://corsproxy.io/?";
const searchUrl = "https://api.deezer.com/search?q=";

export default function MusicPage() {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

  // Load playlist & search history from localStorage
  useEffect(() => {
    setPlaylist(JSON.parse(localStorage.getItem("playlist")) || []);
    setSearchHistory(JSON.parse(localStorage.getItem("searchHistory")) || []);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    try {
      const res = await fetch(`${corsProxy}${searchUrl}${query}`);
      const data = await res.json();
      setTracks(data.data);

      const updatedHistory = [query, ...searchHistory.filter(q => q !== query)].slice(0, 10);
      setSearchHistory(updatedHistory);
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    } catch (error) {
      toast.error("Failed to fetch songs");
    }
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
    toast.success("Search history cleared");
  };

  const addToPlaylist = (track) => {
    const alreadyExists = playlist.find((item) => item.id === track.id);
    if (!alreadyExists) {
      const updated = [...playlist, track];
      setPlaylist(updated);
      localStorage.setItem("playlist", JSON.stringify(updated));
      toast.success("Added to Playlist");
    } else {
      toast("Already in Playlist", { icon: "⚠️" });
    }
  };

  const removeFromPlaylist = (id) => {
    const updated = playlist.filter((t) => t.id !== id);
    setPlaylist(updated);
    localStorage.setItem("playlist", JSON.stringify(updated));
    toast.success("Removed from Playlist");
  };

  const handleHistoryClick = (term) => {
    setQuery(term);
    setTimeout(() => {
      document.getElementById("searchBtn")?.click();
    }, 0);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-purple-500 to-indigo-900 text-white">

      {/* LEFT: Search + Results */}
      <div className="w-full md:w-2/3 p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">TuneWave 🎶</h1>
          <Link to="/playlist" className="underline text-sm text-gray-200 hover:text-white">
            View Full Playlist →
          </Link>
        </div>

        <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />

        {searchHistory.length > 0 && (
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Recent Searches</h3>
              <button
                onClick={clearHistory}
                className="text-sm text-white bg-rose-400 rounded p-1 hover:bg-rose-500"
              >
                Clear
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {searchHistory.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleHistoryClick(item)}
                  className="bg-white/10 hover:bg-white/20 text-sm px-3 py-1 rounded-full"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        <h2 className="text-2xl mb-4">Search Results</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tracks.map((track) => (
            <SongCard
              key={track.id}
              track={track}
              onPlay={setCurrentTrack}
              onAdd={addToPlaylist}
            />
          ))}
        </div>
      </div>

      {/* RIGHT: Playlist Preview & Player */}
      <div className="w-full md:w-1/3 p-6 bg-white/10">
        <Playlist
          playlist={playlist.slice(0, 2)}
          onRemove={removeFromPlaylist}
          preview
        />
        <AudioPlayer track={currentTrack} />
      </div>
    </div>
  );
}
