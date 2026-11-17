package com.efren.inventario.service;

import org.springframework.stereotype.Service;

import com.efren.inventario.dto.AlmacenRequest;
import com.efren.inventario.exception.AlmacenNoEncontradoException;
import com.efren.inventario.model.Almacen;
import com.efren.inventario.repository.AlmacenRepository;
import java.util.List;

@Service
public class AlmacenService {

    private final AlmacenRepository almacenRepository;

    public AlmacenService(AlmacenRepository almacenRepository) {
        this.almacenRepository = almacenRepository;
    }

    public List<Almacen> obtenerTodosLosAlmacenes() {
        return almacenRepository.findAll();
    }

    public Almacen obtenerAlmacenPorId(Long id) {
        return almacenRepository.findById(id)
                .orElseThrow(() -> new AlmacenNoEncontradoException("Almacen no encontrado"));
    }

    public Almacen crearAlmacen(AlmacenRequest request) {
        Almacen almacen = new Almacen();
        almacen.setNombre(request.getNombre());
        almacen.setUbicacion(request.getUbicacion());
        almacen.setDescripcion(request.getDescripcion());
        return almacenRepository.save(almacen);
    }

    public Almacen actualizarAlmacen(Long id, AlmacenRequest request) {
        Almacen almacen = almacenRepository.findById(id)
                .orElseThrow(() -> new AlmacenNoEncontradoException("Almacen no encontrado"));
        almacen.setNombre(request.getNombre());
        almacen.setUbicacion(request.getUbicacion());
        almacen.setDescripcion(request.getDescripcion());
        return almacenRepository.save(almacen);
    }

    public void eliminarAlmacen(Long id) {
        if (!almacenRepository.existsById(id)) {
            throw new AlmacenNoEncontradoException("Almacen no encontrado");
        }
        almacenRepository.deleteById(id);
    }
}

