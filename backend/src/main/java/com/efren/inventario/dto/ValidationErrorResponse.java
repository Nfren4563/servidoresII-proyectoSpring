package com.efren.inventario.dto;

import java.util.Map;

public class ValidationErrorResponse {
    private int status;
    private String error;
    private String message;
    private Map<String, String> errores;

    public ValidationErrorResponse(int status, String error, String message, Map<String, String> errores) {
        this.status = status;
        this.error = error;
        this.message = message;
        this.errores = errores;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Map<String, String> getErrores() {
        return errores;
    }

    public void setErrores(Map<String, String> errores) {
        this.errores = errores;
    }

}
