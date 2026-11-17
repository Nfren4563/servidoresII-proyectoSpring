package com.efren.inventario.service;

import com.efren.inventario.dto.MovimientoRequest;
import com.efren.inventario.exception.AlmacenNoEncontradoException;
import com.efren.inventario.exception.ProductoNoEncontradoException;
import com.efren.inventario.exception.StockInsuficienteException;
import com.efren.inventario.model.*;
import com.efren.inventario.repository.AlmacenRepository;
import com.efren.inventario.repository.ExistenciaRepository;
import com.efren.inventario.repository.MovimientoRepository;
import com.efren.inventario.repository.ProductoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MovimientoService {

    private final MovimientoRepository movimientoRepository;
    private final ExistenciaRepository existenciaRepository;
    private final ProductoRepository productoRepository;
    private final AlmacenRepository almacenRepository;

    public MovimientoService(MovimientoRepository movimientoRepository,
                             ExistenciaRepository existenciaRepository,
                             ProductoRepository productoRepository,
                             AlmacenRepository almacenRepository) {
        this.movimientoRepository = movimientoRepository;
        this.existenciaRepository = existenciaRepository;
        this.productoRepository = productoRepository;
        this.almacenRepository = almacenRepository;
    }

    public List<Movimiento> obtenerTodos() {
        return movimientoRepository.findAllByOrderByFechaDesc();
    }

    public List<Movimiento> obtenerPorProducto(Long productoId) {
        return movimientoRepository.findByProductoIdOrderByFechaDesc(productoId);
    }

    @Transactional
    public Movimiento registrarMovimiento(MovimientoRequest request) {
        TipoMovimiento tipo = TipoMovimiento.valueOf(request.getTipo().toUpperCase());

        Producto producto = productoRepository.findById(request.getProductoId())
                .orElseThrow(() -> new ProductoNoEncontradoException("Producto no encontrado"));

        Movimiento movimiento = new Movimiento();
        movimiento.setProducto(producto);
        movimiento.setTipo(tipo);
        movimiento.setCantidad(request.getCantidad());
        movimiento.setFecha(LocalDateTime.now());
        movimiento.setObservaciones(request.getObservaciones());

        switch (tipo) {
            case ENTRADA -> {
                Almacen destino = obtenerAlmacen(request.getAlmacenDestinoId(), "Almacen destino es obligatorio para entradas");
                movimiento.setAlmacenDestino(destino);
                sumarExistencia(producto, destino, request.getCantidad());
            }
            case SALIDA -> {
                Almacen origen = obtenerAlmacen(request.getAlmacenOrigenId(), "Almacen origen es obligatorio para salidas");
                movimiento.setAlmacenOrigen(origen);
                restarExistencia(producto, origen, request.getCantidad());
            }
            case AJUSTE -> {
                Almacen destino = obtenerAlmacen(request.getAlmacenDestinoId(), "Almacen destino es obligatorio para ajustes");
                movimiento.setAlmacenDestino(destino);
                ajustarExistencia(producto, destino, request.getCantidad());
            }
            case TRANSFERENCIA -> {
                Almacen origen = obtenerAlmacen(request.getAlmacenOrigenId(), "Almacen origen es obligatorio para transferencias");
                Almacen destino = obtenerAlmacen(request.getAlmacenDestinoId(), "Almacen destino es obligatorio para transferencias");
                movimiento.setAlmacenOrigen(origen);
                movimiento.setAlmacenDestino(destino);
                restarExistencia(producto, origen, request.getCantidad());
                sumarExistencia(producto, destino, request.getCantidad());
            }
        }

        return movimientoRepository.save(movimiento);
    }

    private Almacen obtenerAlmacen(Long almacenId, String mensajeError) {
        if (almacenId == null) {
            throw new IllegalArgumentException(mensajeError);
        }
        return almacenRepository.findById(almacenId)
                .orElseThrow(() -> new AlmacenNoEncontradoException("Almacen no encontrado"));
    }

    private void sumarExistencia(Producto producto, Almacen almacen, int cantidad) {
        Existencia existencia = existenciaRepository
                .findByProductoIdAndAlmacenId(producto.getId(), almacen.getId())
                .orElseGet(() -> {
                    Existencia nueva = new Existencia(producto, almacen, 0);
                    return existenciaRepository.save(nueva);
                });
        existencia.setCantidad(existencia.getCantidad() + cantidad);
        existenciaRepository.save(existencia);
    }

    private void restarExistencia(Producto producto, Almacen almacen, int cantidad) {
        Existencia existencia = existenciaRepository
                .findByProductoIdAndAlmacenId(producto.getId(), almacen.getId())
                .orElseThrow(() -> new StockInsuficienteException(
                        "No hay existencia del producto en este almacen"));
        int nuevaCantidad = existencia.getCantidad() - cantidad;
        if (nuevaCantidad < 0) {
            throw new StockInsuficienteException(
                    "Stock insuficiente. Disponible: " + existencia.getCantidad()
                            + ", solicitado: " + cantidad);
        }
        existencia.setCantidad(nuevaCantidad);
        existenciaRepository.save(existencia);
    }

    private void ajustarExistencia(Producto producto, Almacen almacen, int cantidad) {
        Existencia existencia = existenciaRepository
                .findByProductoIdAndAlmacenId(producto.getId(), almacen.getId())
                .orElseGet(() -> {
                    Existencia nueva = new Existencia(producto, almacen, 0);
                    return existenciaRepository.save(nueva);
                });
        existencia.setCantidad(cantidad);
        existenciaRepository.save(existencia);
    }
}
