import type { Producto } from "./Producto";
import type { Almacen } from "./Almacen";

export interface Existencia {
  id: number;
  producto: Producto;
  almacen: Almacen;
  cantidad: number;
}
