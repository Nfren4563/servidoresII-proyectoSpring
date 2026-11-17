package com.efren.inventario.controller;

import com.efren.inventario.dto.ProductoRequest;
import com.efren.inventario.model.Producto;
import com.efren.inventario.service.ProductoService;

import jakarta.validation.Valid;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductoController {
    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @GetMapping
    public List<Producto> obtenerTodosLosProductos() {
        return productoService.obtenerTodosLosProductos();
    }

    @GetMapping("/{id}")
    public Producto obtenerProductoPorId(@PathVariable Long id) {
        return productoService.obtenerProductoPorId(id);
    }

    @PostMapping
    public Producto agregarProducto(@Valid @RequestBody ProductoRequest request) {
        return productoService.crearProducto(request);
    }

    @DeleteMapping("/{id}")
    public void eliminarProducto(@PathVariable Long id) {
        productoService.eliminarProducto(id);

    }

    @PutMapping("/{id}")
    public Producto actualizarProducto(@PathVariable Long id, @Valid @RequestBody ProductoRequest request) {
        return productoService.actualizarProducto(id, request);
    }

}
