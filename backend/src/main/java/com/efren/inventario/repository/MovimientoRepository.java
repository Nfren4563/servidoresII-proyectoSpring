package com.efren.inventario.repository;

import com.efren.inventario.model.Movimiento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MovimientoRepository extends JpaRepository<Movimiento, Long> {

    List<Movimiento> findByProductoIdOrderByFechaDesc(Long productoId);

    List<Movimiento> findAllByOrderByFechaDesc();
}
