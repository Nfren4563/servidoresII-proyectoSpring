package com.efren.inventario.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public class ProductoRequest {

    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;

    private String descripcion;

    @Positive(message = "El precio debe ser mayor a 0")
    private double precio;

    @NotBlank(message = "El departamento es obligatorio")
    private String departamento;

    public ProductoRequest() {
    }

    public ProductoRequest(String nombre, String descripcion, double precio, String departamento) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.departamento = departamento;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public String getDepartamento() {
        return departamento;
    }

    public void setDepartamento(String departamento) {
        this.departamento = departamento;
    }
}

