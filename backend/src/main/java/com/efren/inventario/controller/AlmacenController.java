package com.efren.inventario.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.efren.inventario.model.Almacen;
import com.efren.inventario.service.AlmacenService;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/almacenes")
@CrossOrigin(origins = "http://localhost:5173")
public class AlmacenController {
    private final AlmacenService almacenService;

    public AlmacenController(AlmacenService almacenService) {
        this.almacenService = almacenService;
    }

    @GetMapping
    public List<Almacen> obtenerTodosLosAlmacenes() {
        return almacenService.obtenerTodosLosAlmacenes();
    }

    @GetMapping("/{id}")
    public Almacen obtenerAlmacenPorId(@PathVariable Long id) {
        return almacenService.obtenerAlmacenPorId(id);
    }

    @PostMapping
    public Almacen crearAlmacen(@RequestBody Almacen almacen) {
        return almacenService.guardarAlmacen(almacen);

    }

    @PutMapping("/{id}")
    public Almacen actualizarAlmacen(@PathVariable Long id, @RequestBody Almacen almacen) {
        return almacenService.actualizarAlmacen(id, almacen);
    }

    @DeleteMapping("/{id}")
    public void eliminarAlmacen(@PathVariable Long id) {
        almacenService.eliminarAlmacen(id);
    }

}
