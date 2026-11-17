package com.efren.inventario.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Entity;

@Entity
@Table(name = "almacenes")

public class Almacen {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombreAlmacen;
    
    public Almacen() {
        
    }
    public Almacen(String nombreAlmacen){
        this.nombreAlmacen = nombreAlmacen;

    }
    public Long getId(){
        return id;
    }
    public String getNombreAlmacen(){
        return nombreAlmacen;
    }
    public void setNombreAlmacen(String nombreAlmacen){
        this.nombreAlmacen = nombreAlmacen;
    }   

}
