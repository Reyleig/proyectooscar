package com.proyectogrado.factory;

import com.proyectogrado.dto.UsuarioDto;
import com.proyectogrado.model.Usuarios;
import org.springframework.stereotype.Component;

@Component
public class UsuarioFactory {

    public UsuarioDto entidadADTO(Usuarios usuario) {
        UsuarioDto usuarioDto = new UsuarioDto();
        usuarioDto.setNombre(usuario.getUsername());
        return usuarioDto;
    }

    public Usuarios dtoAEntidad(UsuarioDto usuarioDto) {
        Usuarios usuario = new Usuarios();
        usuario.setUsername(usuarioDto.getNombre());
        return usuario;
    }
}