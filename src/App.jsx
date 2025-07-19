import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import MusicPage from './pages/MusicPage';
import Home from './pages/Home';
import PlaylistPage from './pages/PlaylistPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/music" element={<MusicPage />} />
          <Route path="/playlist" element={<PlaylistPage />} />
          {/* Optional: Add a fallback 404 route */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
          style: {
            background: '#1f2937',
            color: '#fff',
          },
        }}
      />
    </>
  );
}

export default App;
