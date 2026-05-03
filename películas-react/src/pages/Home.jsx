import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

// https://developer.themoviedb.org/reference/movie-popular-list
function App() {
  const [peliculas, setPeliculas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY;
  
  useEffect(() => {
    console.log("Lanzando fetch a la API...");

    async function fetchPeliculas() {
      try { // https://jsonplaceholder.typicode.com/posts
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES`
        );

        console.log("API_KEY: ", API_KEY);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        console.log("Respuesta recibida, status:", response.status);

        const data = await response.json();
        console.log("Respuesta completa: ", data);
        console.log("peliculas recibidos:", data.results.length);

        setPeliculas(data.results.slice(0, 10)); // Limitar a los primeros 10 peliculas

      } catch (err) {
        console.error("Error al obtener los datos:", err);
        setError(err.message);

      } finally {
        setLoading(false);
      }
    }

    fetchPeliculas();
  }, []); // Array de dependencias vacio para ejecutar solo una vez al montar el componente

  return (

    
    <div style={{ maxWidth: 700, margin: "2rem auto", fontFamily: "system-ui" }}>
      <h1>🎬 Películas </h1>
      <p style={{ color: "#666" }}>Mostrando {peliculas.length} películas</p>

      <div>
        
        {loading && <p style={{ textAlign: "center", fontSize: "1.5rem" }}>⏳ Cargando películas...</p>}
       
        <div>
            <button >
            <Link to="/search" style={{ textDecoration: "none", color: "inherit" }}>
                Buscar peliculas
            </Link>
            </button>
      </div>
        {peliculas && peliculas.length > 0 && peliculas.map((peli) => (
        // Al pulsar en la película, te lleva a los detalles de la misma.
            <Link 
                key={peli.id}
                to={`/movie/${peli.id}`} style={{ textDecoration: "none", color: "inherit" }}>
        
                <article
                    
                    style={{
                    border: "1px solid #ddd",
                    borderRadius: 8,
                    padding: "1rem",
                    marginBottom: "1rem",
                    }}
                >
                    <h3 style={{ margin: "0 0 0.5rem" }}>
                    #{peli.id} — {peli.original_title} - {peli.release_date} - {peli.vote_average}⭐
                    </h3>
                    <p style={{ color: "#555", margin: 0 }}>{peli.overview}</p>
                </article>
            </Link>
        ))}
        
        {error && <p style={{ color: "red" }}>❌ Error: {error}</p>}
      </div>
    </div>
  );
}
export default App;


