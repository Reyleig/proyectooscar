import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  isAlertOpen = false;
  alertButtons = [
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        this.setResult();
      },
    },
  ];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private storage: Storage
  ) {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  async ngOnInit() {
    await this.storage.create(); // Inicializa el almacenamiento si no está creado
    const token = await this.storage.get('jwt_token'); // Obtén el token

    if (token) {
      console.log('Usuario ya logueado, redirigiendo a home');
      this.router.navigate(['/tabs']); // Redirige al home
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { firstname, username, password } = this.registerForm.value;

      // Ajusta la URL de tu API
      const apiUrl = 'http://localhost:8081/auth/register';

      this.http.post(apiUrl, { firstname, username, password }).subscribe({
        next: () => {
          this.isAlertOpen = true;
        },
        error: (err) => {
          console.error('Registration failed:', err);
        },
      });
    }
  }


  setResult() {
    this.router.navigate(['/login']);
  }
}
