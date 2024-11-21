package com.proyectogrado;

import com.proyectogrado.controller.ControladorPrueba;
import org.junit.Test;
import static org.junit.Assert.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class DemoApplicationTests {

    @Autowired
    ControladorPrueba controladorPrueba;

    @Test
    void contextLoads() {
        assertNotNull(controladorPrueba);
    }

}
