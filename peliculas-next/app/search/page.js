import Link from "next/link";

export default async function Search({ searchParams }) {
  const { query = "" } = await searchParams;

  let peliculas = [];

  if (query) {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=es-ES&query=${query}`,
      { cache: "no-store" }
    );

    const data = await response.json();
    peliculas = data.results;
  }

  return (
    <div>
      <Link href="/">← Volver</Link>

      <h1>Buscar películas</h1>

      {/* FORMULARIO */}
      <form action="/search">
        <input
          type="text"
          name="query"
          placeholder="Buscar película..."
          defaultValue={query || ""}
        />

        <button type="submit">Buscar</button>
      </form>

      {/* RESULTADOS */}
      {query && <p>Resultados para: "{query}"</p>}

      {peliculas.map((peli) => (
        <Link key={peli.id} href={`/movie/${peli.id}`}>
          <div>
            <h3>{peli.title}</h3>
            <p>{peli.release_date}</p>
          </div>
        </Link>
      ))}

      {query && peliculas.length === 0 && (
        <p>No se encontraron resultados</p>
      )}
    </div>
  );
}