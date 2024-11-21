import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
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
    private storage: Storage // Para guardar el token localmente
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  async ngOnInit(): Promise<void> {
    await this.storage.create(); // Inicializa el almacenamiento si no está creado
    const token = await this.storage.get('jwt_token'); // Obtén el token

    if (token) {
      console.log('Usuario ya logueado, redirigiendo a home');
      this.router.navigate(['/tabs']); // Redirige al home
    }
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      // Ajusta la URL a tu API
      const apiUrl = 'http://localhost:8081/auth/login';

      this.http.post(apiUrl, { username, password }).subscribe({
        next: async (response: any) => {
          // Guarda el token JWT
          console.log(response);
          this.router.navigate(['/tabs']);
          await this.storage['set']('jwt_token', response.token);
          // Redirige al home o módulo correspondiente

        },
        error: (err) => {
          this.isAlertOpen = true;
        },
      });
    }
  }
  register(){
    this.router.navigate(['/register']);
  }

  setResult() {
    this.isAlertOpen = false;
  }
}
