import { useState, useEffect } from "react";
import type { Almacen, AlmacenRequest } from "../types/Almacen";

interface AlmacenModalProps {
  isOpen: boolean;
  almacenParaEditar: Almacen | null;
  onClose: () => void;
  onGuardar: (datos: AlmacenRequest, id?: number) => Promise<void>;
}

export function AlmacenModal({
  isOpen,
  almacenParaEditar,
  onClose,
  onGuardar,
}: AlmacenModalProps) {
  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [errorLocal, setErrorLocal] = useState<string | null>(null);

  useEffect(() => {
    if (almacenParaEditar) {
      setNombre(almacenParaEditar.nombre);
      setUbicacion(almacenParaEditar.ubicacion || "");
      setDescripcion(almacenParaEditar.descripcion || "");
    } else {
      setNombre("");
      setUbicacion("");
      setDescripcion("");
    }
    setErrorLocal(null);
  }, [almacenParaEditar, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim()) {
      setErrorLocal("El nombre del almacén es obligatorio.");
      return;
    }

    try {
      setGuardando(true);
      setErrorLocal(null);
      await onGuardar(
        {
          nombre: nombre.trim(),
          ubicacion: ubicacion.trim() || undefined,
          descripcion: descripcion.trim() || undefined,
        },
        almacenParaEditar ? almacenParaEditar.id : undefined
      );
      onClose();
    } catch (err) {
      setErrorLocal(err instanceof Error ? err.message : "Error al guardar almacén");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-dialog">
        <div className="modal-header-neutral">
          <div className="modal-header-titles">
            <h3>{almacenParaEditar ? "Editar Almacén" : "Nuevo Almacén"}</h3>
            <p>Registra una nueva sucursal, nave industrial o punto de distribución</p>
          </div>
          <button type="button" className="btn-modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {errorLocal && <div className="modal-alert-error">{errorLocal}</div>}

        <form onSubmit={handleSubmit} className="modal-form-body">
          <div className="field-group">
            <label>Nombre del Almacén *</label>
            <input
              type="text"
              placeholder="Ej. Almacén Central Hermosillo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="form-control"
              required
              autoFocus
            />
          </div>

          <div className="field-group">
            <label>Ubicación física / Dirección</label>
            <input
              type="text"
              placeholder="Ej. Parque Industrial Hermosillo, Nave 5"
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="field-group">
            <label>Descripción / Finalidad del almacén</label>
            <textarea
              rows={3}
              placeholder="Capacidad estimada, tipo de mercancía resguardada o notas..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="modal-footer-neutral">
            <button
              type="button"
              className="btn-neutral-secondary"
              onClick={onClose}
              disabled={guardando}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-solid-primary"
              disabled={guardando}
            >
              {guardando ? "Guardando..." : almacenParaEditar ? "Actualizar Almacén" : "Guardar Almacén"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
