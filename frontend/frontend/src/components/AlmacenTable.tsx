import { useState } from "react";
import type { Almacen } from "../types/Almacen";

interface AlmacenTableProps {
  almacenes: Almacen[];
  onEliminar: (id: number) => void;
  onEditar: (almacen: Almacen) => void;
  onNuevo: () => void;
}

export function AlmacenTable({
  almacenes,
  onEliminar,
  onEditar,
  onNuevo,
}: AlmacenTableProps) {
  const [busqueda, setBusqueda] = useState("");

  const almacenesFiltrados = almacenes.filter(
    (a) =>
      a.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      (a.ubicacion && a.ubicacion.toLowerCase().includes(busqueda.toLowerCase())) ||
      (a.descripcion && a.descripcion.toLowerCase().includes(busqueda.toLowerCase()))
  );

  return (
    <div className="card-panel">
      {/* Header Toolbar */}
      <div className="panel-toolbar">
        <div className="toolbar-search-group">
          <div className="input-search-wrapper">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Buscar por nombre, ubicación o notas..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="input-search"
            />
          </div>
        </div>

        <button type="button" className="btn-solid-primary" onClick={onNuevo}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Nuevo Almacén</span>
        </button>
      </div>

      {/* Table Data */}
      {almacenesFiltrados.length === 0 ? (
        <div className="panel-empty-state">
          <p className="empty-title">No hay almacenes registrados</p>
          <p className="empty-subtext">Crea tu primer almacén o sucursal para administrar existencias y transferencias.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: "90px" }}>Código</th>
                <th>Nombre del Almacén</th>
                <th>Ubicación</th>
                <th>Descripción / Finalidad</th>
                <th style={{ width: "140px", textAlign: "right" }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {almacenesFiltrados.map((almacen) => (
                <tr key={almacen.id} className="table-row">
                  <td className="cell-code">
                    ALM-{almacen.id.toString().padStart(3, "0")}
                  </td>
                  <td>
                    <div className="item-title">{almacen.nombre}</div>
                  </td>
                  <td>
                    <span className="location-pill-neutral">
                      {almacen.ubicacion || "Sin ubicación registrada"}
                    </span>
                  </td>
                  <td className="text-secondary">
                    {almacen.descripcion || "Almacén general de inventario"}
                  </td>
                  <td className="cell-actions">
                    <button
                      type="button"
                      className="btn-action"
                      onClick={() => onEditar(almacen)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="btn-action text-danger"
                      onClick={() => {
                        if (confirm(`¿Eliminar almacén "${almacen.nombre}"?`)) {
                          onEliminar(almacen.id);
                        }
                      }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
