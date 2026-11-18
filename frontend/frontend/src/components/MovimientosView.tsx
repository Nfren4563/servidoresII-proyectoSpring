import { useState } from "react";
import type { Movimiento, MovimientoRequest, TipoMovimiento } from "../types/Movimiento";
import type { Producto } from "../types/Producto";
import type { Almacen } from "../types/Almacen";

interface MovimientosViewProps {
  movimientos: Movimiento[];
  productos: Producto[];
  almacenes: Almacen[];
  cargando: boolean;
  onRegistrarMovimiento: (req: MovimientoRequest) => Promise<void>;
}

export function MovimientosView({
  movimientos,
  productos,
  almacenes,
  cargando,
  onRegistrarMovimiento,
}: MovimientosViewProps) {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [tipoFiltro, setTipoFiltro] = useState("TODOS");

  // Form states
  const [tipo, setTipo] = useState<TipoMovimiento>("ENTRADA");
  const [productoId, setProductoId] = useState<number | "">("");
  const [cantidad, setCantidad] = useState<number | "">("");
  const [almacenOrigenId, setAlmacenOrigenId] = useState<number | "">("");
  const [almacenDestinoId, setAlmacenDestinoId] = useState<number | "">("");
  const [observaciones, setObservaciones] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [errorLocal, setErrorLocal] = useState<string | null>(null);

  const resetForm = () => {
    setTipo("ENTRADA");
    setProductoId(productos.length > 0 ? productos[0].id : "");
    setCantidad("");
    setAlmacenOrigenId(almacenes.length > 0 ? almacenes[0].id : "");
    setAlmacenDestinoId(almacenes.length > 0 ? almacenes[0].id : "");
    setObservaciones("");
    setErrorLocal(null);
  };

  const handleOpenModal = () => {
    resetForm();
    setModalAbierto(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productoId) {
      setErrorLocal("Selecciona el producto a operar.");
      return;
    }
    if (!cantidad || Number(cantidad) <= 0) {
      setErrorLocal("La cantidad debe ser mayor a 0.");
      return;
    }
    if ((tipo === "ENTRADA" || tipo === "AJUSTE") && !almacenDestinoId) {
      setErrorLocal("El almacén de destino es obligatorio.");
      return;
    }
    if (tipo === "SALIDA" && !almacenOrigenId) {
      setErrorLocal("El almacén de origen es obligatorio.");
      return;
    }
    if (tipo === "TRANSFERENCIA") {
      if (!almacenOrigenId || !almacenDestinoId) {
        setErrorLocal("Debes seleccionar ambos almacenes: origen y destino.");
        return;
      }
      if (almacenOrigenId === almacenDestinoId) {
        setErrorLocal("El almacén de origen y destino no pueden ser el mismo.");
        return;
      }
    }

    try {
      setGuardando(true);
      setErrorLocal(null);
      await onRegistrarMovimiento({
        productoId: Number(productoId),
        tipo,
        cantidad: Number(cantidad),
        almacenOrigenId: (tipo === "SALIDA" || tipo === "TRANSFERENCIA") ? Number(almacenOrigenId) : undefined,
        almacenDestinoId: (tipo === "ENTRADA" || tipo === "TRANSFERENCIA" || tipo === "AJUSTE") ? Number(almacenDestinoId) : undefined,
        observaciones: observaciones.trim() || undefined,
      });
      setModalAbierto(false);
    } catch (err) {
      setErrorLocal(err instanceof Error ? err.message : "Error al procesar movimiento");
    } finally {
      setGuardando(false);
    }
  };

  const movimientosFiltrados = movimientos.filter((m) => {
    if (tipoFiltro === "TODOS") return true;
    return m.tipo === tipoFiltro;
  });

  return (
    <div className="card-panel">
      {/* Header Toolbar */}
      <div className="panel-toolbar">
        <div className="toolbar-search-group">
          <div className="select-wrapper">
            <select
              value={tipoFiltro}
              onChange={(e) => setTipoFiltro(e.target.value)}
              className="select-input"
            >
              <option value="TODOS">Todos los tipos de movimiento</option>
              <option value="ENTRADA">Entradas</option>
              <option value="SALIDA">Salidas</option>
              <option value="TRANSFERENCIA">Transferencias</option>
              <option value="AJUSTE">Ajustes</option>
            </select>
          </div>
        </div>

        <button
          type="button"
          className="btn-solid-primary"
          onClick={handleOpenModal}
          disabled={productos.length === 0 || almacenes.length === 0}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Registrar Movimiento</span>
        </button>
      </div>

      {cargando ? (
        <div className="panel-loading">Cargando historial de movimientos...</div>
      ) : movimientosFiltrados.length === 0 ? (
        <div className="panel-empty-state">
          <p className="empty-title">Sin movimientos registrados</p>
          <p className="empty-subtext">Utiliza el botón de Registrar Movimiento para ingresar, retirar o transferir existencias.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: "90px" }}>Folio</th>
                <th style={{ width: "140px" }}>Fecha</th>
                <th style={{ width: "130px" }}>Tipo</th>
                <th>Producto</th>
                <th className="cell-num">Cantidad</th>
                <th>Origen</th>
                <th>Destino</th>
                <th>Observaciones</th>
              </tr>
            </thead>
            <tbody>
              {movimientosFiltrados.map((mov) => {
                const badgeClass =
                  mov.tipo === "ENTRADA"
                    ? "tag-movement-in"
                    : mov.tipo === "SALIDA"
                    ? "tag-movement-out"
                    : mov.tipo === "TRANSFERENCIA"
                    ? "tag-movement-transfer"
                    : "tag-movement-adjust";

                return (
                  <tr key={mov.id} className="table-row">
                    <td className="cell-code">
                      MOV-{mov.id.toString().padStart(4, "0")}
                    </td>
                    <td className="text-muted" style={{ fontSize: "12.5px" }}>
                      {new Date(mov.fecha).toLocaleString("es-MX", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </td>
                    <td>
                      <span className={`tag-movement ${badgeClass}`}>
                        {mov.tipo}
                      </span>
                    </td>
                    <td>
                      <div className="item-title">{mov.producto?.nombre}</div>
                    </td>
                    <td className="cell-num font-mono font-bold">
                      {mov.cantidad} uds.
                    </td>
                    <td className="text-secondary">
                      {mov.almacenOrigen?.nombre || "—"}
                    </td>
                    <td className="text-secondary">
                      {mov.almacenDestino?.nombre || "—"}
                    </td>
                    <td className="text-muted" style={{ fontSize: "12.5px" }}>
                      {mov.observaciones || "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Registrar Movimiento */}
      {modalAbierto && (
        <div className="modal-overlay">
          <div className="modal-dialog">
            <div className="modal-header-neutral">
              <div className="modal-header-titles">
                <h3>Registrar Movimiento de Inventario</h3>
                <p>Operación inmutable con actualización transaccional de stock</p>
              </div>
              <button
                type="button"
                className="btn-modal-close"
                onClick={() => setModalAbierto(false)}
              >
                ✕
              </button>
            </div>

            {errorLocal && <div className="modal-alert-error">{errorLocal}</div>}

            <form onSubmit={handleSubmit} className="modal-form-body">
              <div className="field-group">
                <label>Tipo de Operación *</label>
                <select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value as TipoMovimiento)}
                  className="form-control"
                >
                  <option value="ENTRADA">ENTRADA (Recepción de mercancía a almacén)</option>
                  <option value="SALIDA">SALIDA (Despacho, venta o merma)</option>
                  <option value="TRANSFERENCIA">TRANSFERENCIA (Traspaso entre almacenes)</option>
                  <option value="AJUSTE">AJUSTE (Corrección física de existencias)</option>
                </select>
              </div>

              <div className="field-grid-2">
                <div className="field-group">
                  <label>Producto *</label>
                  <select
                    value={productoId}
                    onChange={(e) => setProductoId(Number(e.target.value))}
                    className="form-control"
                    required
                  >
                    <option value="" disabled>Seleccionar producto...</option>
                    {productos.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.nombre} ({p.departamento})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field-group">
                  <label>Cantidad de Unidades *</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="1"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value === "" ? "" : Number(e.target.value))}
                    className="form-control"
                    required
                  />
                </div>
              </div>

              {(tipo === "SALIDA" || tipo === "TRANSFERENCIA") && (
                <div className="field-group">
                  <label>Almacén Origen (sale stock) *</label>
                  <select
                    value={almacenOrigenId}
                    onChange={(e) => setAlmacenOrigenId(Number(e.target.value))}
                    className="form-control"
                    required
                  >
                    <option value="" disabled>Seleccionar almacén origen...</option>
                    {almacenes.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {(tipo === "ENTRADA" || tipo === "TRANSFERENCIA" || tipo === "AJUSTE") && (
                <div className="field-group">
                  <label>
                    {tipo === "AJUSTE"
                      ? "Almacén a Ajustar *"
                      : "Almacén Destino (ingresa stock) *"}
                  </label>
                  <select
                    value={almacenDestinoId}
                    onChange={(e) => setAlmacenDestinoId(Number(e.target.value))}
                    className="form-control"
                    required
                  >
                    <option value="" disabled>Seleccionar almacén destino...</option>
                    {almacenes.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="field-group">
                <label>Observaciones / Motivo</label>
                <input
                  type="text"
                  placeholder="Número de factura, motivo del movimiento o nota..."
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="modal-footer-neutral">
                <button
                  type="button"
                  className="btn-neutral-secondary"
                  onClick={() => setModalAbierto(false)}
                  disabled={guardando}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-solid-primary"
                  disabled={guardando}
                >
                  {guardando ? "Procesando..." : "Confirmar Operación"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
