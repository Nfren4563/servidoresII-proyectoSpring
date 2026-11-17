package com.efren.inventario.service;

import com.efren.inventario.exception.ExistenciaNoEncontradaException;
import com.efren.inventario.model.Existencia;
import com.efren.inventario.repository.ExistenciaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExistenciaService {

    private final ExistenciaRepository existenciaRepository;

    public ExistenciaService(ExistenciaRepository existenciaRepository) {
        this.existenciaRepository = existenciaRepository;
    }

    public List<Existencia> obtenerTodas() {
        return existenciaRepository.findAll();
    }

    public List<Existencia> obtenerPorProducto(Long productoId) {
        return existenciaRepository.findByProductoId(productoId);
    }

    public List<Existencia> obtenerPorAlmacen(Long almacenId) {
        return existenciaRepository.findByAlmacenId(almacenId);
    }

    public Existencia obtenerPorProductoYAlmacen(Long productoId, Long almacenId) {
        return existenciaRepository.findByProductoIdAndAlmacenId(productoId, almacenId)
                .orElseThrow(() -> new ExistenciaNoEncontradaException(
                        "No existe registro de existencia para producto " + productoId
                                + " en almacen " + almacenId));
    }
}
