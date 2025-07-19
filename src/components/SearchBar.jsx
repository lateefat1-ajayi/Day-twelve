export default function SearchBar({ query, setQuery, onSearch }) {
  return (
    <form onSubmit={onSearch} className="mb-6 flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a song or artist..."
        className="w-full px-4 py-2 rounded-lg text-white border"
      />
      <button className="bg-white text-purple-700 px-4 py-2 rounded-lg font-semibold">
        Search
      </button>
    </form>
  );
}
