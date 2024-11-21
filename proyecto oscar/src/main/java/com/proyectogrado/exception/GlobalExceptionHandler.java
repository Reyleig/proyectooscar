package com.proyectogrado.exception;

import com.proyectogrado.dto.ErrorDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BussinesExepcion.class)
    public ResponseEntity<ErrorDto> handleCustomException(BussinesExepcion ex) {
        ErrorDto errorResponse = new ErrorDto(ex.getCode(), ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    // Otros métodos para manejar diferentes excepciones...
}
