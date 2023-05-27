import './App.css';

import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { Navigation } from './components/PageNavigation';
import SearchPage from './pages/SearchPage';
import AlbumPage from './pages/AlbumPage';
import FavouritePage from './pages/FavouritesPage';
import { useEffect, useState } from 'react';
import AudioPlayer from './components/AudioPlayer';


function App() {




  const [mp3List, setMp3List] = useState([]);
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  return (
    <div className="App dark:bg-slate-900 dark:h-auto">
      <Navigation/>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/music/search" element={<h1><SearchPage /></h1>} />
        <Route path="/music/album/:id" element={<AlbumPage {...{setMp3List, setSelectedTrackIndex, setIsPlaying}}/>} />
        <Route path="/music/favourite" element={<FavouritePage {...{setMp3List, setSelectedTrackIndex, setIsPlaying}}/>}/>
      </Routes>
      <AudioPlayer {...{mp3List, selectedTrackIndex, isPlaying, setSelectedTrackIndex, setIsPlaying}} />
    </div>
  );
}

export default App;