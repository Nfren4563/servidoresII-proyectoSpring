package com.efren.inventario.service;

import org.springframework.stereotype.Service;

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

    public Almacen guardarAlmacen(Almacen almacen) {
        return almacenRepository.save(almacen);
    }

    public void eliminarAlmacen(Long id) {
        almacenRepository.deleteById(id);
    }

    public Almacen actualizarAlmacen(Long id, Almacen almacen) {
        Almacen almacenExistente = almacenRepository.findById(id)
                .orElseThrow(() -> new AlmacenNoEncontradoException("Almacen no encontrado"));
        almacenExistente.setNombreAlmacen(almacen.getNombreAlmacen());
        return almacenRepository.save(almacenExistente);
    }
}
