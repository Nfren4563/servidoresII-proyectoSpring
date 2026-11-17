import { useEffect, useState } from "react";
import type { Producto } from "./types/Producto";
import { ProductoTable } from "./components/ProductoTable";
import "./App.css";

function App() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const cargarProductos = async () => {
    try {
      setCargando(true);
      setError(null);
      const response = await fetch("http://localhost:8080/api/productos");
      if (!response.ok) {
        throw new Error(`Error en el servidor: HTTP ${response.status}`);
      }
      const data: Producto[] = await response.json();
      setProductos(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo conectar con el servidor. Verifica que el backend esté ejecutándose."
      );
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  return (
    <div className="app-container">
      <header className="header-section">
        <div>
          <h1>Control de Inventario</h1>
          <p>Catálogo general de productos y existencias por almacén</p>
        </div>
        <button
          onClick={cargarProductos}
          disabled={cargando}
          style={{
            padding: "8px 16px",
            fontSize: "14px",
            cursor: "pointer",
            borderRadius: "6px",
            border: "1px solid var(--border)",
            background: "var(--code-bg)",
            color: "var(--text-h)",
          }}
        >
          {cargando ? "Actualizando..." : "↻ Refrescar"}
        </button>
      </header>

      {error && (
        <div className="error-banner">
          <span>⚠️ {error}</span>
          <button onClick={cargarProductos}>Reintentar</button>
        </div>
      )}

      {cargando ? (
        <div className="loading-state">
          <p>Cargando inventario...</p>
        </div>
      ) : (
        <ProductoTable productos={productos} />
      )}
    </div>
  );
}

export default App;