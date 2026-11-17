package com.efren.inventario.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.efren.inventario.dto.AlmacenRequest;
import com.efren.inventario.model.Almacen;
import com.efren.inventario.service.AlmacenService;

import jakarta.validation.Valid;

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
    public Almacen crearAlmacen(@Valid @RequestBody AlmacenRequest request) {
        return almacenService.crearAlmacen(request);
    }

    @PutMapping("/{id}")
    public Almacen actualizarAlmacen(@PathVariable Long id, @Valid @RequestBody AlmacenRequest request) {
        return almacenService.actualizarAlmacen(id, request);
    }

    @DeleteMapping("/{id}")
    public void eliminarAlmacen(@PathVariable Long id) {
        almacenService.eliminarAlmacen(id);
    }
}

