export interface Almacen {
  id: number;
  nombre: string;
  ubicacion?: string;
  descripcion?: string;
}

export interface AlmacenRequest {
  nombre: string;
  ubicacion?: string;
  descripcion?: string;
}
