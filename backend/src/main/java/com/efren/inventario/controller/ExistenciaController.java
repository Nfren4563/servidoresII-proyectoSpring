package com.efren.inventario.controller;

import com.efren.inventario.model.Existencia;
import com.efren.inventario.service.ExistenciaService;

import java.util.List;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/existencias")
@CrossOrigin(origins = "http://localhost:5173")
public class ExistenciaController {

    private final ExistenciaService existenciaService;

    public ExistenciaController(ExistenciaService existenciaService) {
        this.existenciaService = existenciaService;
    }

    @GetMapping
    public List<Existencia> obtenerTodas() {
        return existenciaService.obtenerTodas();
    }

    @GetMapping("/producto/{productoId}")
    public List<Existencia> obtenerPorProducto(@PathVariable Long productoId) {
        return existenciaService.obtenerPorProducto(productoId);
    }

    @GetMapping("/almacen/{almacenId}")
    public List<Existencia> obtenerPorAlmacen(@PathVariable Long almacenId) {
        return existenciaService.obtenerPorAlmacen(almacenId);
    }
}
