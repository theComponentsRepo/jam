import './App.css';

import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { Navigation } from './components/PageNavigation';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/music/search" element={<h1><SearchPage /></h1>} />
        <Route path="/music/album/:id" element={<h1>album playlist page</h1>} />
        <Route path="/music/favourite" element={<h1>favourite page</h1>}/>
      </Routes>
      <Navigation/>
    </div>
  );
}

export default App;
