package com.proyectogrado.exception;

import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class BussinesExepcion extends RuntimeException {
    private String code;
    private HttpStatus status;
    public BussinesExepcion(String code, String message, HttpStatus status) {
        super(message);
        this.code = code;
        this.status = status;
    }


}
