package com.efren.inventario.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class MovimientoRequest {

    @NotNull(message = "El producto es obligatorio")
    private Long productoId;

    @NotNull(message = "El tipo es obligatorio")
    private String tipo;

    @Positive(message = "La cantidad debe ser mayor a 0")
    private int cantidad;

    private Long almacenOrigenId;

    private Long almacenDestinoId;

    private String observaciones;

    public MovimientoRequest() {
    }

    public Long getProductoId() {
        return productoId;
    }

    public void setProductoId(Long productoId) {
        this.productoId = productoId;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public Long getAlmacenOrigenId() {
        return almacenOrigenId;
    }

    public void setAlmacenOrigenId(Long almacenOrigenId) {
        this.almacenOrigenId = almacenOrigenId;
    }

    public Long getAlmacenDestinoId() {
        return almacenDestinoId;
    }

    public void setAlmacenDestinoId(Long almacenDestinoId) {
        this.almacenDestinoId = almacenDestinoId;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }
}
