import type { Producto } from "../types/Producto";

interface ProductoTableProps {
  productos: Producto[];
}

export function ProductoTable({ productos }: ProductoTableProps) {
  if (productos.length === 0) {
    return (
      <div className="empty-state">
        <p>No hay productos registrados en el inventario.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="tabla-inventario">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Departamento</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Almacén</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td className="text-center">{producto.id}</td>
              <td className="font-semibold">{producto.nombre}</td>
              <td>{producto.departamento || "—"}</td>
              <td className="text-right">${producto.precio.toFixed(2)}</td>
              <td className="text-center">
                <span className={producto.cantidad <= 5 ? "badge-low-stock" : "badge-stock"}>
                  {producto.cantidad}
                </span>
              </td>
              <td>{producto.almacen?.nombreAlmacen || "Sin almacén"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
