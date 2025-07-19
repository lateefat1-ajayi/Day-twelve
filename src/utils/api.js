export async function searchTracks(query) {
  const res = await fetch(`https://api.deezer.com/search?q=${query}`);
  const data = await res.json();
  return data.data; 
}
