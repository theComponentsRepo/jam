import './App.css';

import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { Navigation } from './components/PageNavigation';
import SearchPage from './pages/SearchPage';
import FavouritePage from './pages/FavouritesPage';
import AlbumPage from './pages/AlbumPage';

function App() {
  return (
    <div className="App">
      <Navigation/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/music/search" element={<h1><SearchPage /></h1>} />
        <Route path="/music/album/:id" element={<AlbumPage />} />
        <Route path="/music/favourite" element={<FavouritePage />}/>
      </Routes>
      
    </div>
  );
}

export default App;