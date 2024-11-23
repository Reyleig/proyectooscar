import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  cuestionarioForm: FormGroup;
  cuestionarios: any[] = [];


  crearCuestionario() {
    if (this.cuestionarioForm.valid) {
      const nuevoCuestionario = this.cuestionarioForm.value;
      this.cuestionarios.push(nuevoCuestionario);
      this.guardarCuestionarios();
      this.cuestionarioForm.reset();
      alert('Cuestionario creado correctamente');
    }
  }

  cargarCuestionarios() {
    const datosGuardados = localStorage.getItem('cuestionarios');
    if (datosGuardados) {
      this.cuestionarios = JSON.parse(datosGuardados);
    }
  }

  guardarCuestionarios() {
    localStorage.setItem('cuestionarios', JSON.stringify(this.cuestionarios));
  }

  agregarPreguntas(index: number) {
    // Navegar a la página de preguntas, pasando el índice o ID del cuestionario
    this.router.navigate([`/tabs/tab2/${index}`]);
    
    console.log('Agregar preguntas al cuestionario:', index);
  }

  eliminarCuestionario(index: number) {
    this.cuestionarios.splice(index, 1);
    this.guardarCuestionarios();
    alert('Cuestionario eliminado');
  } 




  token: string | null = null;
  questionForm: FormGroup;

  //constructor(private storage: Storage) {}
  
  constructor(private fb: FormBuilder, private storage: Storage, private router: Router) {
    this.questionForm = this.fb.group({
      questions: this.fb.array([]) // Inicializa un arreglo de preguntas vacío
    });
    this.cuestionarioForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: [''],
    });

    this.cargarCuestionarios();
  }
  // Getter para acceder al FormArray
  get questions(): FormArray {
    return this.questionForm.get('questions') as FormArray;
  }

  // Añadir una nueva pregunta
  addQuestion() {
    const questionGroup = this.fb.group({
      text: ['', Validators.required], // Campo para el texto de la pregunta
      options: this.fb.array([this.createOption()]), // Opciones iniciales
    });
    this.questions.push(questionGroup);
  }

  // Crear una nueva opción
  createOption(): FormGroup {
    return this.fb.group({
      text: ['', Validators.required], // Campo para el texto de la opción
      correct: [false] // Indica si es la respuesta correcta
    });
  }

  // Obtener el FormArray de las opciones de una pregunta específica
getOptions(questionIndex: number): FormArray {
  return this.questions.at(questionIndex).get('options') as FormArray;
}


  // Añadir una nueva opción a una pregunta específica
  addOption(questionIndex: number) {
    const options = this.questions.at(questionIndex).get('options') as FormArray;
    options.push(this.createOption());
  }
  

   // Enviar el formulario al backend
   submitForm() {
    if (this.questionForm.valid) {
      console.log('Formulario enviado:', this.questionForm.value);
      // Aquí puedes enviar los datos al backend con HttpClient
    } else {
      console.error('El formulario no es válido');
    }
  }
  
  async ngOnInit() {
    // Inicializa el almacenamiento (solo si no se ha inicializado antes)
    await this.storage.create();
    // Obtén el token almacenado
    this.token = await this.storage.get('jwt_token');
    console.log('Token obtenido:', this.token);
  }
}
