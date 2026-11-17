package com.efren.inventario.model;

import jakarta.persistence.*;

@Entity
@Table(name = "productos")

public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private double precio;
    private int cantidad;
    private String departamento;
    @ManyToOne
    @JoinColumn(name = "almacen_id")
    private Almacen almacen;

    public Producto() {

    }

    public Producto(String nombre, double precio, int cantidad, Almacen almacen, String departamento) {

        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        this.departamento = departamento;
        this.almacen = almacen;

    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public String getDepartamento() {
        return departamento;
    }

    public void setDepartamento(String departamento) {
        this.departamento = departamento;

    }

    public Almacen getAlmacen() {
        return almacen;
    }

    public void setAlmacen(Almacen almacen) {
        this.almacen = almacen;
    }
}
