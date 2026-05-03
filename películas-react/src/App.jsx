import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './pages/Home';
import Movies from './pages/Movies';
import Search from './pages/Search';

function App() {
  return (
    <BrowserRouter>
      {/* NAVBAR */}

      {/* RUTAS */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Movies />} /> {/* Detalles de la película*/}
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<p>404: Página no encontrada</p>} />
      </Routes>

      {/* FOOTER */}
    </BrowserRouter>
  );
}

export default App;
