import type { Producto } from "./Producto";
import type { Almacen } from "./Almacen";

export type TipoMovimiento = "ENTRADA" | "SALIDA" | "AJUSTE" | "TRANSFERENCIA";

export interface Movimiento {
  id: number;
  producto: Producto;
  tipo: TipoMovimiento;
  cantidad: number;
  almacenOrigen?: Almacen | null;
  almacenDestino?: Almacen | null;
  fecha: string;
  observaciones?: string;
}

export interface MovimientoRequest {
  productoId: number;
  tipo: TipoMovimiento;
  cantidad: number;
  almacenOrigenId?: number;
  almacenDestinoId?: number;
  observaciones?: string;
}
