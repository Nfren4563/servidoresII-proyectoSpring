package com.efren.inventario.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

public class ProductoRequest {
    @NotBlank(message = "Colocar nombre es obligatorio")
    private String nombre;
    @Positive(message = "El precio debe ser mayor a 0")
    private double precio;
    @PositiveOrZero(message = "La cantidad debe ser mayor o igual a 0")
    private int cantidad;
    @NotNull(message = "El almacen es obligatorio")
    private Long almacenId;
    @NotBlank(message = "El departamento es obligatorio")
    private String departamento;

    public ProductoRequest() {

    }

    public ProductoRequest(String nombre, double precio, int cantidad, Long almacenId, String departamento) {
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        this.almacenId = almacenId;
        this.departamento = departamento;
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

    public Long getAlmacenId() {
        return almacenId;
    }

    public void setAlmacenId(Long almacenId) {
        this.almacenId = almacenId;
    }

    public String getDepartamento() {
        return departamento;
    }

    public void setDepartamento(String departamento) {
        this.departamento = departamento;
    }

}
