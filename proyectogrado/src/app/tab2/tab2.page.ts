import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  preguntaForm: FormGroup;
  preguntas: any[] = [];
  cuestionarios: any[] = [];
  cuestionarioIndex: number = 0;
  editando: boolean = false; // Indica si estamos editando una pregunta
  preguntaIndex: number | null = null; // Índice de la pregunta que se está editando

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.preguntaForm = this.fb.group({
      titulo: ['', Validators.required],
      opciones: this.fb.array([]), // Opciones dinámicas
      correcta: [null, Validators.required],
    });

    // Inicializamos con dos opciones
    this.agregarOpcion();
    this.agregarOpcion();
  }

  ngOnInit() {
    this.cuestionarioIndex = parseInt(this.route.snapshot.paramMap.get('index') || '0', 10);

    // Cargar cuestionarios desde localStorage
    const datosGuardados = localStorage.getItem('cuestionarios');
    if (datosGuardados) {
      this.cuestionarios = JSON.parse(datosGuardados);
      this.preguntas = this.cuestionarios[this.cuestionarioIndex]?.preguntas || [];
    }
  }

  // Obtener el FormArray de opciones
  get opciones(): FormArray {
    return this.preguntaForm.get('opciones') as FormArray;
  }

  // Crear un grupo para una opción
  crearOpcion(): FormGroup {
    return this.fb.group({
      opcion: ['', Validators.required],
    });
  }

  // Agregar una nueva opción al FormArray
  agregarOpcion() {
    this.opciones.push(this.crearOpcion());
  }

  // Eliminar una opción del FormArray
  eliminarOpcion(index: number) {
    if (this.opciones.length > 2) {
      this.opciones.removeAt(index);
    } else {
      alert('Debe haber al menos dos opciones');
    }
  }

  // Guardar una nueva pregunta o editarla
  guardarPregunta() {
    if (this.preguntaForm.valid) {
      const pregunta = this.preguntaForm.value;

      if (this.editando && this.preguntaIndex !== null) {
        // Actualizar pregunta existente
        this.preguntas[this.preguntaIndex] = pregunta;
      } else {
        // Agregar nueva pregunta
        this.preguntas.push(pregunta);
      }

      // Guardar cambios en localStorage
      this.cuestionarios[this.cuestionarioIndex].preguntas = this.preguntas;
      localStorage.setItem('cuestionarios', JSON.stringify(this.cuestionarios));

      // Reiniciar formulario
      this.resetFormulario();

      alert('Pregunta guardada correctamente');
    } else {
      alert('Por favor, completa todos los campos');
    }
  }

  // Editar una pregunta
  editarPregunta(index: number) {
    const pregunta = this.preguntas[index];
    this.preguntaForm.patchValue({
      titulo: pregunta.titulo,
      correcta: pregunta.correcta,
    });

    // Reiniciar el FormArray y cargar opciones
    this.opciones.clear();
    pregunta.opciones.forEach((opcion: any) => {
      this.opciones.push(this.fb.group({ opcion: [opcion.opcion, Validators.required] }));
    });

    this.editando = true;
    this.preguntaIndex = index;
  }

  // Eliminar una pregunta
  eliminarPregunta(index: number) {
    this.preguntas.splice(index, 1);

    // Guardar cambios en localStorage
    this.cuestionarios[this.cuestionarioIndex].preguntas = this.preguntas;
    localStorage.setItem('cuestionarios', JSON.stringify(this.cuestionarios));

    alert('Pregunta eliminada correctamente');
  }

  // Reiniciar formulario para nueva pregunta
  resetFormulario() {
    this.preguntaForm.reset();
    this.opciones.clear();
    this.agregarOpcion();
    this.agregarOpcion();
    this.editando = false;
    this.preguntaIndex = null;
  }

}
