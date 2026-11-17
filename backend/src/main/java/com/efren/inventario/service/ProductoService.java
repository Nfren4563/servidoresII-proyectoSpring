package com.efren.inventario.service;

import org.springframework.stereotype.Service;
import com.efren.inventario.dto.ProductoRequest;
import com.efren.inventario.exception.ProductoNoEncontradoException;
import com.efren.inventario.model.Producto;
import com.efren.inventario.repository.ProductoRepository;
import java.util.List;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;

    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    public List<Producto> obtenerTodosLosProductos() {
        return productoRepository.findAll();
    }

    public Producto obtenerProductoPorId(Long id) {
        return productoRepository.findById(id)
                .orElseThrow(() -> new ProductoNoEncontradoException("Producto no encontrado"));
    }

    public Producto crearProducto(ProductoRequest request) {
        Producto producto = new Producto();
        producto.setNombre(request.getNombre());
        producto.setDescripcion(request.getDescripcion());
        producto.setPrecio(request.getPrecio());
        producto.setDepartamento(request.getDepartamento());
        return productoRepository.save(producto);
    }

    public Producto actualizarProducto(Long id, ProductoRequest request) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new ProductoNoEncontradoException("Producto no encontrado"));
        producto.setNombre(request.getNombre());
        producto.setDescripcion(request.getDescripcion());
        producto.setPrecio(request.getPrecio());
        producto.setDepartamento(request.getDepartamento());
        return productoRepository.save(producto);
    }

    public void eliminarProducto(Long id) {
        if (!productoRepository.existsById(id)) {
            throw new ProductoNoEncontradoException("Producto no encontrado");
        }
        productoRepository.deleteById(id);
    }
}

