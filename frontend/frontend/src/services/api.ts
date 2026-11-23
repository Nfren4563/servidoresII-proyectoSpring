import type { Producto, ProductoRequest } from "../types/Producto";
import type { Almacen, AlmacenRequest } from "../types/Almacen";
import type { Existencia } from "../types/Existencia";
import type { Movimiento, MovimientoRequest } from "../types/Movimiento";

const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? "/api" : "http://localhost:8080/api");

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    let errorDetail = `Error HTTP ${response.status}`;
    try {
      const data = await response.json();
      if (data.message) {
        errorDetail = data.message;
      } else if (data.errores) {
        errorDetail = Object.values(data.errores).join(", ");
      }
    } catch {
    }
    throw new Error(errorDetail);
  }

  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    return {} as T;
  }

  return response.json();
}

export const productosApi = {
  getAll: () => request<Producto[]>("/productos"),
  getById: (id: number) => request<Producto>(`/productos/${id}`),
  create: (producto: ProductoRequest) =>
    request<Producto>("/productos", {
      method: "POST",
      body: JSON.stringify(producto),
    }),
  update: (id: number, producto: ProductoRequest) =>
    request<Producto>(`/productos/${id}`, {
      method: "PUT",
      body: JSON.stringify(producto),
    }),
  delete: (id: number) =>
    request<void>(`/productos/${id}`, {
      method: "DELETE",
    }),
};

export const almacenesApi = {
  getAll: () => request<Almacen[]>("/almacenes"),
  getById: (id: number) => request<Almacen>(`/almacenes/${id}`),
  create: (almacen: AlmacenRequest) =>
    request<Almacen>("/almacenes", {
      method: "POST",
      body: JSON.stringify(almacen),
    }),
  update: (id: number, almacen: AlmacenRequest) =>
    request<Almacen>(`/almacenes/${id}`, {
      method: "PUT",
      body: JSON.stringify(almacen),
    }),
  delete: (id: number) =>
    request<void>(`/almacenes/${id}`, {
      method: "DELETE",
    }),
};

export const existenciasApi = {
  getAll: () => request<Existencia[]>("/existencias"),
  getByProducto: (productoId: number) =>
    request<Existencia[]>(`/existencias/producto/${productoId}`),
  getByAlmacen: (almacenId: number) =>
    request<Existencia[]>(`/existencias/almacen/${almacenId}`),
};

export const movimientosApi = {
  getAll: () => request<Movimiento[]>("/movimientos"),
  getByProducto: (productoId: number) =>
    request<Movimiento[]>(`/movimientos/producto/${productoId}`),
  create: (movimiento: MovimientoRequest) =>
    request<Movimiento>("/movimientos", {
      method: "POST",
      body: JSON.stringify(movimiento),
    }),
};
