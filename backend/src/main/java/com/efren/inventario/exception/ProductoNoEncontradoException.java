package com.efren.inventario.exception;

public class ProductoNoEncontradoException extends RuntimeException {
    public ProductoNoEncontradoException(String mensaje) {
        super(mensaje);
    }
}
