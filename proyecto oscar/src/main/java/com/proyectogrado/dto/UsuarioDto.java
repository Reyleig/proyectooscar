package com.proyectogrado.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class UsuarioDto {
    @JsonProperty("nombre")
    private String nombre;

}
