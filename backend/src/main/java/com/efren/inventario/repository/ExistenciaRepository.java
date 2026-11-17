package com.efren.inventario.repository;

import com.efren.inventario.model.Existencia;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ExistenciaRepository extends JpaRepository<Existencia, Long> {

    List<Existencia> findByProductoId(Long productoId);

    List<Existencia> findByAlmacenId(Long almacenId);

    Optional<Existencia> findByProductoIdAndAlmacenId(Long productoId, Long almacenId);
}
