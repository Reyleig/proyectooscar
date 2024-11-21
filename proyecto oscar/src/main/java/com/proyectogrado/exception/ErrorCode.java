package com.proyectogrado.exception;

public enum ErrorCode {
    RESOURCE_NOT_FOUND("ERR_001", "Recurso no encontrado"),
    INVALID_INPUT("ERR_002", "Entrada inválida"),
    ;

    private final String code;
    private final String message;

    ErrorCode(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}