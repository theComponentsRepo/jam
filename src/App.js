// import './App.css';

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<h1>HomePage</h1>} />
        <Route path="/music/search" element={<h1>searchpage</h1>} />
        <Route path="/music/album/:id" element={<h1>album playlist page</h1>} />
        <Route path="/music/favourite" element={<h1>favourite page</h1>}/>
      </Routes>
    </div>
  );
}

export default App;
