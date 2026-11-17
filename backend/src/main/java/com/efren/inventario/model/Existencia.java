package com.efren.inventario.model;

import jakarta.persistence.*;

@Entity
@Table(name = "existencias", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"producto_id", "almacen_id"})
})
public class Existencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "producto_id", nullable = false)
    private Producto producto;

    @ManyToOne
    @JoinColumn(name = "almacen_id", nullable = false)
    private Almacen almacen;

    private int cantidad;

    public Existencia() {
    }

    public Existencia(Producto producto, Almacen almacen, int cantidad) {
        this.producto = producto;
        this.almacen = almacen;
        this.cantidad = cantidad;
    }

    public Long getId() {
        return id;
    }

    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    public Almacen getAlmacen() {
        return almacen;
    }

    public void setAlmacen(Almacen almacen) {
        this.almacen = almacen;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }
}
