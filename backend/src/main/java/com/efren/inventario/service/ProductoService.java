package com.efren.inventario.service;

import com.efren.inventario.model.Almacen;
import org.springframework.stereotype.Service;
import com.efren.inventario.dto.ProductoRequest;
import com.efren.inventario.exception.AlmacenNoEncontradoException;
import com.efren.inventario.exception.ProductoNoEncontradoException;
import com.efren.inventario.model.Producto;
import com.efren.inventario.repository.AlmacenRepository;
import com.efren.inventario.repository.ProductoRepository;
import java.util.List;

@Service
public class ProductoService {
    private final AlmacenRepository almacenRepository;
    private final ProductoRepository productoRepository;

    public ProductoService(ProductoRepository productoRepository, AlmacenRepository almacenRepository) {
        this.productoRepository = productoRepository;
        this.almacenRepository = almacenRepository;
    }

    public List<Producto> obtenerTodosLosProductos() {
        return productoRepository.findAll();
    }

    public Producto crearProducto(ProductoRequest request) {
        Almacen almacen = almacenRepository
                .findById(request.getAlmacenId())
                .orElseThrow(() -> new AlmacenNoEncontradoException("Almacen no encontrado"));
        Producto producto = new Producto();
        producto.setNombre(request.getNombre());
        producto.setPrecio(request.getPrecio());
        producto.setCantidad(request.getCantidad());
        producto.setDepartamento(request.getDepartamento());
        producto.setAlmacen(almacen);
        return productoRepository.save(producto);
    }

    public Producto obtenerProductoPorId(Long id) {
        return productoRepository.findById(id)
                .orElseThrow(() -> new ProductoNoEncontradoException("Producto no encontrado"));
    }

    public void eliminarProducto(Long id) {
        productoRepository.deleteById(id);
    }

    public Producto actualizarProducto(Long id, ProductoRequest request) {
        Producto productoExistente = productoRepository.findById(id)
                .orElseThrow(() -> new ProductoNoEncontradoException("Producto no encontrado"));
        Almacen almacen = almacenRepository
                .findById(request.getAlmacenId())
                .orElseThrow(() -> new AlmacenNoEncontradoException("Almacen no encontrado"));
        productoExistente.setNombre(request.getNombre());
        productoExistente.setPrecio(request.getPrecio());
        productoExistente.setCantidad(request.getCantidad());
        productoExistente.setDepartamento(request.getDepartamento());
        productoExistente.setAlmacen(almacen);
        return productoRepository.save(productoExistente);
    }

}
