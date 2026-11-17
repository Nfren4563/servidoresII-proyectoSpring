export interface Almacen {
    id: number;
    nombreAlmacen: string;
}

export interface Producto {
    id: number;
    nombre: string;
    cantidad: number;
    precio: number;
    departamento: string;
    almacen: Almacen;
}