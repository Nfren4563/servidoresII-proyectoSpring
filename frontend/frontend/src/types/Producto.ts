export interface Producto {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  departamento: string;
}

export interface ProductoRequest {
  nombre: string;
  descripcion?: string;
  precio: number;
  departamento: string;
}
