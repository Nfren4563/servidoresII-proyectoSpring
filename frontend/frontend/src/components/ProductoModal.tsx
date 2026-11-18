import { useState, useEffect } from "react";
import type { Producto, ProductoRequest } from "../types/Producto";

interface ProductoModalProps {
  isOpen: boolean;
  productoParaEditar: Producto | null;
  onClose: () => void;
  onGuardar: (datos: ProductoRequest, id?: number) => Promise<void>;
}

export function ProductoModal({
  isOpen,
  productoParaEditar,
  onClose,
  onGuardar,
}: ProductoModalProps) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState<number | "">("");
  const [departamento, setDepartamento] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [errorLocal, setErrorLocal] = useState<string | null>(null);

  useEffect(() => {
    if (productoParaEditar) {
      setNombre(productoParaEditar.nombre);
      setDescripcion(productoParaEditar.descripcion || "");
      setPrecio(productoParaEditar.precio);
      setDepartamento(productoParaEditar.departamento);
    } else {
      setNombre("");
      setDescripcion("");
      setPrecio("");
      setDepartamento("");
    }
    setErrorLocal(null);
  }, [productoParaEditar, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim()) {
      setErrorLocal("El nombre del producto es obligatorio.");
      return;
    }
    if (!departamento.trim()) {
      setErrorLocal("El departamento o categoría es obligatorio.");
      return;
    }
    if (precio === "" || Number(precio) <= 0) {
      setErrorLocal("El precio debe ser un número positivo mayor a 0.");
      return;
    }

    try {
      setGuardando(true);
      setErrorLocal(null);
      await onGuardar(
        {
          nombre: nombre.trim(),
          descripcion: descripcion.trim() || undefined,
          precio: Number(precio),
          departamento: departamento.trim(),
        },
        productoParaEditar ? productoParaEditar.id : undefined
      );
      onClose();
    } catch (err) {
      setErrorLocal(err instanceof Error ? err.message : "Error al guardar producto");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-dialog">
        <div className="modal-header-neutral">
          <div className="modal-header-titles">
            <h3>{productoParaEditar ? "Editar Producto" : "Nuevo Producto"}</h3>
            <p>Define los datos maestros del producto en el catálogo</p>
          </div>
          <button type="button" className="btn-modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {errorLocal && <div className="modal-alert-error">{errorLocal}</div>}

        <form onSubmit={handleSubmit} className="modal-form-body">
          <div className="field-group">
            <label>Nombre del Producto *</label>
            <input
              type="text"
              placeholder="Ej. Laptop Dell Latitude 5420"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="form-control"
              required
              autoFocus
            />
          </div>

          <div className="field-grid-2">
            <div className="field-group">
              <label>Departamento / Categoría *</label>
              <input
                type="text"
                placeholder="Ej. Computación, Oficina, etc."
                value={departamento}
                onChange={(e) => setDepartamento(e.target.value)}
                className="form-control"
                required
              />
            </div>

            <div className="field-group">
              <label>Precio Unitario ($) *</label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
                value={precio}
                onChange={(e) => setPrecio(e.target.value === "" ? "" : Number(e.target.value))}
                className="form-control"
                required
              />
            </div>
          </div>

          <div className="field-group">
            <label>Descripción detallada</label>
            <textarea
              rows={3}
              placeholder="Especificaciones técnicas, marca o notas del producto..."
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
              {guardando ? "Guardando..." : productoParaEditar ? "Actualizar Producto" : "Guardar Producto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
