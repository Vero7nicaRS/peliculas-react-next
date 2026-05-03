import Image from "next/image";
import Link from "next/link"; // Para hacer el enrutado entre páginas.
export default  async function Home() {
  const peliculas = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=es-ES`
  );

  const data = await peliculas.json();

  return (
     <div style={{ maxWidth: 700, margin: "2rem auto", fontFamily: "system-ui" }}>
      <h1>🎬 Películas </h1>

      {data.results.map((peli: any) => (
        <Link 
        key={peli.id}
        href={`/movie/${peli.id}`}>
        
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
    </div>
  );
}
