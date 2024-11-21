import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private storage: Storage, private router: Router) {}

  async canActivate(): Promise<boolean> {
    await this.storage.create();
    const token = await this.storage.get('jwt_token');
    if (token) {
      return true; // Usuario autenticado
    } else {
      this.router.navigate(['/login']); // Redirige al login si no hay token
      return false;
    }
  }
}