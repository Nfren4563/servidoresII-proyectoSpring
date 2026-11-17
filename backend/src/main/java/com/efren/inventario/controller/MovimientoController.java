package com.efren.inventario.controller;

import com.efren.inventario.dto.MovimientoRequest;
import com.efren.inventario.model.Movimiento;
import com.efren.inventario.service.MovimientoService;

import jakarta.validation.Valid;

import java.util.List;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/movimientos")
@CrossOrigin(origins = "http://localhost:5173")
public class MovimientoController {

    private final MovimientoService movimientoService;

    public MovimientoController(MovimientoService movimientoService) {
        this.movimientoService = movimientoService;
    }

    @GetMapping
    public List<Movimiento> obtenerTodos() {
        return movimientoService.obtenerTodos();
    }

    @GetMapping("/producto/{productoId}")
    public List<Movimiento> obtenerPorProducto(@PathVariable Long productoId) {
        return movimientoService.obtenerPorProducto(productoId);
    }

    @PostMapping
    public Movimiento registrarMovimiento(@Valid @RequestBody MovimientoRequest request) {
        return movimientoService.registrarMovimiento(request);
    }
}
