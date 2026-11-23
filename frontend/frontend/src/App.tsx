import { useEffect, useState } from "react";
import { Sidebar, type TabType } from "./components/Sidebar";
import { ProductoTable } from "./components/ProductoTable";
import { AlmacenTable } from "./components/AlmacenTable";
import { ExistenciasView } from "./components/ExistenciasView";
import { MovimientosView } from "./components/MovimientosView";
import { ProductoModal } from "./components/ProductoModal";
import { AlmacenModal } from "./components/AlmacenModal";
import { productosApi, almacenesApi, existenciasApi, movimientosApi } from "./services/api";

import type { Producto, ProductoRequest } from "./types/Producto";
import type { Almacen, AlmacenRequest } from "./types/Almacen";
import type { Existencia } from "./types/Existencia";
import type { Movimiento, MovimientoRequest } from "./types/Movimiento";
import "./App.css";

export function App() {
  const [activeTab, setActiveTab] = useState<TabType>("productos");

  const [productos, setProductos] = useState<Producto[]>([]);
  const [almacenes, setAlmacenes] = useState<Almacen[]>([]);
  const [existencias, setExistencias] = useState<Existencia[]>([]);
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);

  const [cargando, setCargando] = useState(false);
  const [errorGlobal, setErrorGlobal] = useState<string | null>(null);

  const [modalProductoAbierto, setModalProductoAbierto] = useState(false);
  const [productoParaEditar, setProductoParaEditar] = useState<Producto | null>(null);

  const [modalAlmacenAbierto, setModalAlmacenAbierto] = useState(false);
  const [almacenParaEditar, setAlmacenParaEditar] = useState<Almacen | null>(null);

  const cargarDatos = async () => {
    try {
      setCargando(true);
      setErrorGlobal(null);
      const [prods, alms, exis, movs] = await Promise.all([
        productosApi.getAll(),
        almacenesApi.getAll(),
        existenciasApi.getAll(),
        movimientosApi.getAll(),
      ]);
      setProductos(prods);
      setAlmacenes(alms);
      setExistencias(exis);
      setMovimientos(movs);
    } catch (err) {
      setErrorGlobal(
        err instanceof Error
          ? err.message
          : "Error de conexión con el backend en http://localhost:8080"
      );
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleGuardarProducto = async (datos: ProductoRequest, id?: number) => {
    if (id) {
      await productosApi.update(id, datos);
    } else {
      await productosApi.create(datos);
    }
    await cargarDatos();
  };

  const handleEliminarProducto = async (id: number) => {
    try {
      await productosApi.delete(id);
      await cargarDatos();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error al eliminar el producto");
    }
  };

  const handleGuardarAlmacen = async (datos: AlmacenRequest, id?: number) => {
    if (id) {
      await almacenesApi.update(id, datos);
    } else {
      await almacenesApi.create(datos);
    }
    await cargarDatos();
  };

  const handleEliminarAlmacen = async (id: number) => {
    try {
      await almacenesApi.delete(id);
      await cargarDatos();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error al eliminar el almacén");
    }
  };

  const handleRegistrarMovimiento = async (req: MovimientoRequest) => {
    await movimientosApi.create(req);
    await cargarDatos();
  };

  const titulosTab: Record<TabType, { titulo: string; descripcion: string }> = {
    productos: {
      titulo: "Catálogo de Productos",
      descripcion: "Administración de artículos, departamentos y especificaciones",
    },
    almacenes: {
      titulo: "Almacenes y Sucursales",
      descripcion: "Puntos de resguardo, capacidad y ubicaciones operativas",
    },
    existencias: {
      titulo: "Control de Existencias",
      descripcion: "Disponibilidad física de unidades por producto y almacén",
    },
    movimientos: {
      titulo: "Historial de Movimientos",
      descripcion: "Registro inmutable de entradas, salidas, transferencias y ajustes",
    },
  };

  return (
    <div className="app-container-layout">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        conteos={{
          productos: productos.length,
          almacenes: almacenes.length,
          existencias: existencias.length,
          movimientos: movimientos.length,
        }}
      />

      <main className="main-workspace">
        <header className="workspace-header">
          <div className="header-title-group">
            <h1>{titulosTab[activeTab].titulo}</h1>
            <p>{titulosTab[activeTab].descripcion}</p>
          </div>

          <div className="header-controls">
            <button
              type="button"
              className="btn-neutral-secondary"
              onClick={cargarDatos}
              disabled={cargando}
              title="Sincronizar con el servidor"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  animation: cargando ? "spin 1s linear infinite" : "none",
                }}
              >
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
              <span>{cargando ? "Actualizando..." : "Sincronizar"}</span>
            </button>
          </div>
        </header>

        <div className="workspace-content">
          {errorGlobal && (
            <div className="alert-toast-error">
              <span>{errorGlobal}</span>
              <button
                type="button"
                className="btn-action"
                onClick={cargarDatos}
              >
                Reintentar conexión
              </button>
            </div>
          )}

          {activeTab === "productos" && (
            <ProductoTable
              productos={productos}
              existencias={existencias}
              onEliminar={handleEliminarProducto}
              onEditar={(prod) => {
                setProductoParaEditar(prod);
                setModalProductoAbierto(true);
              }}
              onNuevo={() => {
                setProductoParaEditar(null);
                setModalProductoAbierto(true);
              }}
            />
          )}

          {activeTab === "almacenes" && (
            <AlmacenTable
              almacenes={almacenes}
              onEliminar={handleEliminarAlmacen}
              onEditar={(alm) => {
                setAlmacenParaEditar(alm);
                setModalAlmacenAbierto(true);
              }}
              onNuevo={() => {
                setAlmacenParaEditar(null);
                setModalAlmacenAbierto(true);
              }}
            />
          )}

          {activeTab === "existencias" && (
            <ExistenciasView
              existencias={existencias}
              almacenes={almacenes}
              cargando={cargando}
            />
          )}

          {activeTab === "movimientos" && (
            <MovimientosView
              movimientos={movimientos}
              productos={productos}
              almacenes={almacenes}
              cargando={cargando}
              onRegistrarMovimiento={handleRegistrarMovimiento}
            />
          )}
        </div>
      </main>

      <ProductoModal
        isOpen={modalProductoAbierto}
        productoParaEditar={productoParaEditar}
        onClose={() => setModalProductoAbierto(false)}
        onGuardar={handleGuardarProducto}
      />

      <AlmacenModal
        isOpen={modalAlmacenAbierto}
        almacenParaEditar={almacenParaEditar}
        onClose={() => setModalAlmacenAbierto(false)}
        onGuardar={handleGuardarAlmacen}
      />
    </div>
  );
}

export default App;
