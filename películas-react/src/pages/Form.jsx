// src/PostForm.jsx
import { useState } from "react";

function PostForm() {
  // 1. Un estado por cada campo del formulario
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("tech");
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  console.log("🎨 Render del form — title:", title, "| body:", body, "| cat:", category);

  // 2. Handler del submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // ← IMPORTANTE: evitar recarga de página
    console.log("📤 Enviando formulario:", { title, body, category });

    // Validación básica
    if (!title.trim() || !body.trim()) {
      alert("⚠️ Título y cuerpo son obligatorios");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body, category }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      console.log("✅ Post creado con ID:", data.id);
      setResult(data);

      setTitle("");
      setBody("");
      setCategory("tech");
    }
    catch (err) {
      console.error("❌ Error al crear el post:", err);
      alert("Error al crear el post: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "system-ui" }}>
      <h1>✏️ Crear nuevo post</h1>

      <form onSubmit={handleSubmit}>
        {/* Input de texto — controlado */}
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: 4, fontWeight: "bold" }}>
            Título
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Escribe el título..."
            style={{
              width: "100%",
              padding: "0.5rem",
              fontSize: "1rem",
              borderRadius: 6,
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Textarea — mismo patrón */}
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: 4, fontWeight: "bold" }}>
            Contenido
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Escribe el contenido..."
            rows={4}
            style={{
              width: "100%",
              padding: "0.5rem",
              fontSize: "1rem",
              borderRadius: 6,
              border: "1px solid #ccc",
              boxSizing: "border-box",
              resize: "vertical",
            }}
          />
        </div>

        {/* Select — también controlado */}
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: 4, fontWeight: "bold" }}>
            Categoría
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              fontSize: "1rem",
              borderRadius: 6,
              border: "1px solid #ccc",
            }}
          >
            <option value="tech">Tecnología</option>
            <option value="science">Ciencia</option>
            <option value="design">Diseño</option>
            <option value="other">Otro</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={submitting}
          style={{
            backgroundColor: "#0066ff",
            color: "white",
            border: "none",
            padding: "0.75rem 2rem",
            fontSize: "1rem",
            borderRadius: 6,
            cursor: submitting ? "not-allowed" : "pointer",
          }}
        >
          {submitting ? "⏳ Enviando..." : "📤 Publicar post"}
        </button>
      </form>

      {/* 4. Preview en tiempo real */}
      {title && (
        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            backgroundColor: "#f0f0f0",
            borderRadius: 8,
          }}
        >
          <h3>👁️ Preview</h3>
          <h4>{title}</h4>
          <p>{body || "(sin contenido)"}</p>
          <span
            style={{
              backgroundColor: "#e0e0e0",
              padding: "2px 8px",
              borderRadius: 4,
              fontSize: "0.85rem",
            }}
          >
            {category}
          </span>
        </div>
      )}

      {/* Resultado del POST */}
      {result && (
        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            backgroundColor: "#d4edda",
            borderRadius: 8,
            border: "1px solid #c3e6cb",
          }}
        >
          <h3>✅ Post creado con éxito</h3>
          <p><strong>ID:</strong> {result.id}</p>
          <p><strong>Título:</strong> {result.title}</p>
          <p><strong>Cuerpo:</strong> {result.body}</p>
        </div>
      )}
    </div>
  );
}

export default PostForm;