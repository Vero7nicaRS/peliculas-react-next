import Link from "next/link";

export default async function Movie({ params }) {
  const { id } =  await params;

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=es-ES`
  );

  const pelicula = await response.json();

  return (
    <> 
    <div style={{ maxWidth: 700, margin: "2rem auto", fontFamily: "system-ui" }}>
        <h1>Información detallada de la película</h1>
        <p>Detalles...</p> 
        
        <button >
            <Link href="/" style={{ border: "1px solid #ccc", padding: "0.2rem", textDecoration: "none", color: "inherit" }}>
                Volver a la lista de películas
            </Link>
        </button>
        
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
            <div>
                <button >
                    <Link href="/search" style={{ border: "1px solid #ccc", padding: "0.2rem", textDecoration: "none", color: "inherit" }}>
                        Volver al buscador de películas
                    </Link>
                </button>
            </div>

        </div>

    </>

  );
}