import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
// `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES`
// https://developer.themoviedb.org/docs/image-basics
export default function Movies (){
    const { id } = useParams();
    const [pelicula, setPelicula] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const API_KEY = import.meta.env.VITE_API_KEY;
      
    useEffect(() => {
        console.log("Lanzando fetch a la API...");
    
        async function fetchPelicula() {
          try { // https://jsonplaceholder.typicode.com/posts
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=es-ES`
            );
    
            console.log("API_KEY: ", API_KEY);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            console.log("Respuesta recibida, status:", response.status);
    
            const data = await response.json();
            console.log("Respuesta completa: ", data);
            console.log("pelicula recibidos:", data.length);
    
            setPelicula(data);
    
          } catch (err) {
            console.error("Error al obtener los datos:", err);
            setError(err.message);
    
          } finally {
            setLoading(false);
          }
        }
    
        fetchPelicula();
      }, [id]); // Array de dependencias vacio para ejecutar solo una vez al montar el componente
    
  return (
    <>

      <h1>Información detallada de la película</h1>
      <p>Detalles...</p>
      <div>
        
        {loading && <p style={{ textAlign: "center", fontSize: "1.5rem" }}>⏳ Cargando películas...</p>}
        
        <p><strong>Título:</strong> {pelicula.original_title}</p>
        <img 

            src={ pelicula.poster_path 
                    ? `https://image.tmdb.org/t/p/w500${pelicula.poster_path}` 
                    : "https://via.placeholder.com/500x750?text=No+Image"
            } 
            alt={pelicula.original_title} >
        </img>
        <p><strong>Fecha de estreno:</strong> {pelicula.release_date}</p>
        <p><strong>Calificación:</strong> {pelicula.vote_average} ⭐</p>
        <p><strong>Duración:</strong> {pelicula.runtime} minutos</p>

        <p><strong>Popularidad:</strong> {pelicula.popularity}</p>
        <p><strong>Géneros:</strong> {pelicula.genres && pelicula.genres.map(g => g.name).join(", ")}</p>
        <h3>Sinopsis</h3>
        <p>{pelicula.overview}</p>

        {error && <p style={{ color: "red" }}>❌ Error: {error}</p>}
      </div>
      <div>
        <button >
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Volver a la lista de películas
          </Link>
        </button> 
      </div>
      <div>
        <button >
            <Link to="/search" style={{ textDecoration: "none", color: "inherit" }}>
                Volver al buscador de películas
            </Link>
        </button>
      </div>

    </> 
  );
}