import { Link } from "react-router-dom";
import {useState, useEffect} from 'react'

export default function Search (){
    const API_KEY = import.meta.env.VITE_API_KEY;
    const [query, setQuery] = useState("");
    const [peliculas, setPeliculas] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Nos buscar si el query tiene menos de 3 caracteres, para evitar hacer demasiadas peticiones a la API
        if (query.trim().length < 3) {
            setPeliculas([]);
            setError(null);
            return;
        }

        const abortController = new AbortController(); // Para cancelar la petición si el usuario sigue escribiendo

        // Debounce de 500ms
        const timeoutId = setTimeout( async() => {
            // Hacer la búsqueda después de 500ms de que el usuario deje de escribir
            setLoading(true);
            setError(null);
            try{
                const response = await fetch(
                    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=es-ES&query=${encodeURIComponent(query)}`,
                    { signal: abortController.signal }
                    //encodeURIComponent para manejar caracteres especiales en la búsqueda, como espacios o acentos.
                );
                if(!response.ok){
                    throw new Error ( response.status === 403 
                        ? "Límite de peticiones alcanzado. Espera un momento" 
                        : `HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setPeliculas(data.results || []);
                
            } catch (error) {
                // No mostrar error si fue una cancelación de la petición.
                if (error.name !== "AbortError") {
                    setError("Error al buscar películas");
                    setPeliculas([]);
                }
            } finally {
                setLoading(false);
            }
        }, 500); // Ejecutar después de 500ms

        // CLEANUP
        // Se ejecuta si 'query' cambia antes de que termine el efecto.
        return () => {
            clearTimeout(timeoutId); // Cancela el debounce
            abortController.abort(); // Cancela la petición HTTP en curso si el usuario sigue escribiendo antes de que termine la búsqueda actual
            console.log (`Cleanup ejecutado: debounce cancelado y petición abortada" ${query}`);
        }
    }, [query, API_KEY]); // Solo cuando la query cambie

  return (
    <>

      <h1>Buscar películas</h1>
      <p>Busca tu película favorita...</p>

    {/* Input para buscar películas */}
    <input
      type="text"
      placeholder="Buscar una película (min. 3 caracteres)..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      style={{ 
            width: "100%", 
            padding: "0.75rem", 
            fontSize: "1.1rem", 
            marginBottom: "1rem",
            borderRadius: 8,
            border: '2px solid #ddd',
            boxSizing: "border-box"
        }}
    />
    {/* Indicadores de estado */}
    {query.length > 0 && query.trim().length < 3 && (
        <p style={{ color: "#666" }}>Escribe al menos 3 caracteres para buscar...</p>
    )}

    {loading && <p>Buscando películas...{query} </p>}
    {error && <p style={{ color: "red" }}>❌ {error}</p>}

    {/* Resultados */}
  {/*
  {!loading && !error && peliculas.length === 0 && query.trim().length > 0 && (
        <p> Mostrando {peliculas.length} películas como resultado</p>
    )}

   */}  
    <div>
        {peliculas && peliculas.length > 0 &&  peliculas.map((pelicula) => (
            <Link 
                key={pelicula.id}
                to={`/movie/${pelicula.id}`} style={{ textDecoration: "none", color: "inherit" }}>
        
            <article
                    style={{
                    border: "1px solid #ddd",
                    borderRadius: 8,
                    padding: "1rem",
                    marginBottom: "1rem",
                    }}
                >
                    <h3 style={{ margin: "0 0 0.5rem" }}>
                        {pelicula.title}
                    </h3>
                    <p style={{ color: "#555", margin: 0 }}>{pelicula.overview}</p>
                </article>
            </Link>
        ))}
    </div>

    {/*Estado vacío */}
    {!loading && !error && query.length >=3 && peliculas.length === 0 && (
        <p>No se encontraron películas para "{query}"</p>
    )}
    </> 
  );
}