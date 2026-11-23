import { useState } from "react";
import type { Producto } from "../types/Producto";
import type { Existencia } from "../types/Existencia";

interface ProductoTableProps {
  productos: Producto[];
  existencias: Existencia[];
  onEliminar: (id: number) => void;
  onEditar: (producto: Producto) => void;
  onNuevo: () => void;
}

export function ProductoTable({
  productos,
  existencias,
  onEliminar,
  onEditar,
  onNuevo,
}: ProductoTableProps) {
  const [busqueda, setBusqueda] = useState("");
  const [deptoFiltro, setDeptoFiltro] = useState("todos");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const departamentos = Array.from(
    new Set(productos.map((p) => p.departamento).filter(Boolean))
  );

  const getExistenciasProducto = (productoId: number) => {
    return existencias.filter((e) => e.producto.id === productoId);
  };

  const getStockTotal = (productoId: number) => {
    return getExistenciasProducto(productoId).reduce((acc, curr) => acc + curr.cantidad, 0);
  };

  const productosFiltrados = productos.filter((p) => {
    const coincideTexto =
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.id.toString().includes(busqueda) ||
      (p.descripcion && p.descripcion.toLowerCase().includes(busqueda.toLowerCase()));
    const coincideDepto = deptoFiltro === "todos" || p.departamento === deptoFiltro;
    return coincideTexto && coincideDepto;
  });

  return (
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
              placeholder="Buscar por código, nombre o descripción..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="input-search"
            />
          </div>

          <div className="select-wrapper">
            <select
              value={deptoFiltro}
              onChange={(e) => setDeptoFiltro(e.target.value)}
              className="select-input"
            >
              <option value="todos">Todos los departamentos</option>
              {departamentos.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        <button type="button" className="btn-solid-primary" onClick={onNuevo}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Nuevo Producto</span>
        </button>
      </div>

      {productosFiltrados.length === 0 ? (
        <div className="panel-empty-state">
          <p className="empty-title">No hay productos que coincidan con la búsqueda</p>
          <p className="empty-subtext">Intenta ajustar los filtros o registra un nuevo producto en el catálogo.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: "90px" }}>Código</th>
                <th>Producto</th>
                <th>Departamento</th>
                <th className="cell-num">Precio</th>
                <th className="cell-num">Stock Total</th>
                <th style={{ width: "140px", textAlign: "right" }}>Acciones</th>
                <th style={{ width: "40px" }}></th>
              </tr>
            </thead>
            <tbody>
              {productosFiltrados.map((producto) => {
                const stock = getStockTotal(producto.id);
                const existenciasDetalle = getExistenciasProducto(producto.id);
                const isExpanded = expandedId === producto.id;

                return (
                  <>
                    <tr
                      key={producto.id}
                      className={`table-row ${isExpanded ? "row-is-expanded" : ""}`}
                    >
                      <td className="cell-code">
                        PRD-{producto.id.toString().padStart(4, "0")}
                      </td>
                      <td>
                        <div className="item-title">{producto.nombre}</div>
                        {producto.descripcion && (
                          <div className="item-description">{producto.descripcion}</div>
                        )}
                      </td>
                      <td>
                        <span className="neutral-tag">{producto.departamento}</span>
                      </td>
                      <td className="cell-num font-mono">
                        ${producto.precio.toFixed(2)}
                      </td>
                      <td className="cell-num font-mono font-bold">
                        {stock} uds.
                      </td>
                      <td className="cell-actions">
                        <button
                          type="button"
                          className="btn-action"
                          onClick={() => onEditar(producto)}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="btn-action text-danger"
                          onClick={() => {
                            if (confirm(`¿Eliminar producto "${producto.nombre}"?`)) {
                              onEliminar(producto.id);
                            }
                          }}
                        >
                          Eliminar
                        </button>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <button
                          type="button"
                          className="btn-toggle-expand"
                          onClick={() => setExpandedId(isExpanded ? null : producto.id)}
                          title="Ver distribución por almacén"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            style={{
                              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                              transition: "transform 0.15s ease",
                            }}
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </button>
                      </td>
                    </tr>

                    {isExpanded && (
                      <tr key={`expand-${producto.id}`} className="row-detail-container">
                        <td colSpan={7}>
                          <div className="detail-box">
                            <div className="detail-box-header">
                              <span className="detail-box-title">
                                Distribución de existencias en almacenes para "{producto.nombre}"
                              </span>
                            </div>
                            {existenciasDetalle.length === 0 ? (
                              <p className="detail-box-empty">
                                Este producto no tiene existencias registradas en ningún almacén. Registra una entrada en el módulo de Movimientos.
                              </p>
                            ) : (
                              <table className="sub-table">
                                <thead>
                                  <tr>
                                    <th>Almacén</th>
                                    <th>Ubicación</th>
                                    <th style={{ textAlign: "right" }}>Cantidad Disponible</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {existenciasDetalle.map((ex) => (
                                    <tr key={ex.id}>
                                      <td className="font-semibold">{ex.almacen.nombre}</td>
                                      <td className="text-muted">{ex.almacen.ubicacion || "—"}</td>
                                      <td style={{ textAlign: "right" }} className="font-mono font-bold">
                                        {ex.cantidad} uds.
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
