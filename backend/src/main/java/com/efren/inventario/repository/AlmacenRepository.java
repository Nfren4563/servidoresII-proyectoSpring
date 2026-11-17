package com.efren.inventario.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.efren.inventario.model.Almacen;

public interface AlmacenRepository extends JpaRepository<Almacen, Long> {
    
}
