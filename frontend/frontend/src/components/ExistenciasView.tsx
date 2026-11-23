import { useState } from "react";
import type { Existencia } from "../types/Existencia";
import type { Almacen } from "../types/Almacen";

interface ExistenciasViewProps {
  existencias: Existencia[];
  almacenes: Almacen[];
  cargando: boolean;
}

export function ExistenciasView({
  existencias,
  almacenes,
  cargando,
}: ExistenciasViewProps) {
  const [busqueda, setBusqueda] = useState("");
  const [almacenFiltro, setAlmacenFiltro] = useState("todos");

  if (cargando) {
    return <div className="panel-loading">Cargando registros de existencias...</div>;
  }

  const existenciasFiltradas = existencias.filter((e) => {
    const coincideTexto =
      e.producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      e.producto.departamento.toLowerCase().includes(busqueda.toLowerCase()) ||
      e.almacen.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideAlmacen =
      almacenFiltro === "todos" || e.almacen.id.toString() === almacenFiltro;
    return coincideTexto && coincideAlmacen;
  });

  const totalUnidades = existencias.reduce((sum, e) => sum + e.cantidad, 0);
  const productosUnicosConStock = new Set(
    existencias.filter((e) => e.cantidad > 0).map((e) => e.producto.id)
  ).size;

  return (
    <div className="view-stack">
      <div className="metrics-row-neutral">
        <div className="metric-box-neutral">
          <span className="metric-sublabel">Total de Unidades en Stock</span>
          <span className="metric-main-value">{totalUnidades}</span>
          <span className="metric-context">distribuidas en todos los almacenes</span>
        </div>

        <div className="metric-box-neutral">
          <span className="metric-sublabel">Líneas de Producto con Stock</span>
          <span className="metric-main-value">{productosUnicosConStock}</span>
          <span className="metric-context">productos disponibles de inmediato</span>
        </div>

        <div className="metric-box-neutral">
          <span className="metric-sublabel">Registros de Almacenamiento</span>
          <span className="metric-main-value">{existencias.length}</span>
          <span className="metric-context">vínculos producto-almacén activos</span>
        </div>
      </div>

      <div className="card-panel">
        <div className="panel-toolbar">
          <div className="toolbar-search-group">
            <div className="input-search-wrapper">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Filtrar existencias por producto o almacén..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="input-search"
              />
            </div>

            <div className="select-wrapper">
              <select
                value={almacenFiltro}
                onChange={(e) => setAlmacenFiltro(e.target.value)}
                className="select-input"
              >
                <option value="todos">Todos los almacenes</option>
                {almacenes.map((a) => (
                  <option key={a.id} value={a.id.toString()}>{a.nombre}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {existenciasFiltradas.length === 0 ? (
          <div className="panel-empty-state">
            <p className="empty-title">Sin existencias registradas</p>
            <p className="empty-subtext">Realiza una Entrada de Mercancía en el módulo de Movimientos para cargar stock.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: "90px" }}>Código</th>
                  <th>Producto</th>
                  <th>Departamento</th>
                  <th>Almacén</th>
                  <th>Ubicación</th>
                  <th style={{ width: "160px", textAlign: "right" }}>Stock Disponible</th>
                </tr>
              </thead>
              <tbody>
                {existenciasFiltradas.map((ex) => (
                  <tr key={ex.id} className="table-row">
                    <td className="cell-code">
                      PRD-{ex.producto.id.toString().padStart(4, "0")}
                    </td>
                    <td>
                      <div className="item-title">{ex.producto.nombre}</div>
                    </td>
                    <td>
                      <span className="neutral-tag">{ex.producto.departamento}</span>
                    </td>
                    <td>
                      <span className="font-semibold">{ex.almacen.nombre}</span>
                    </td>
                    <td className="text-secondary">
                      {ex.almacen.ubicacion || "—"}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <span
                        className={`status-pill ${
                          ex.cantidad === 0
                            ? "status-pill-out"
                            : ex.cantidad <= 5
                            ? "status-pill-low"
                            : "status-pill-ok"
                        }`}
                      >
                        {ex.cantidad} {ex.cantidad === 1 ? "unidad" : "unidades"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
