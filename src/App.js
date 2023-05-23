import './App.css';

import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { Navigation } from './components/PageNavigation';
import SearchPage from './pages/SearchPage';
<<<<<<< HEAD
import Album from './components/Album';
import AudioPlayer from './components/Player';
=======
import FavouritePage from './pages/FavouritesPage';
import AlbumPage from './pages/AlbumPage';
>>>>>>> 1606bb0582613e619d2a89fee22691697d7c8fa2

function App() {
  return (
    <div className="App">
      <Navigation/>
      <Routes>
        <Route path="/" element={<HomePage />} />
<<<<<<< HEAD
        <Route path="/music/search" element={<SearchPage />} />
        <Route path="/music/album/:id" element={<Album />} />
        <Route path="/music/favourite" element={<h1>favourite page</h1>}/>
        <Route path="/audioplayer/:id" element={<AudioPlayer />} />
=======
        <Route path="/music/search" element={<h1><SearchPage /></h1>} />
        <Route path="/music/album/:id" element={<AlbumPage />} />
        <Route path="/music/favourite" element={<FavouritePage />}/>
>>>>>>> 1606bb0582613e619d2a89fee22691697d7c8fa2
      </Routes>
      
    </div>
  );
}

export default App;
