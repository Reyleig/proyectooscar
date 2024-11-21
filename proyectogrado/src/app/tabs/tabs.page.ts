import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private storage: Storage, private router: Router) {}

  async logout() {
    await this.storage.create();
    await this.storage.remove('jwt_token'); // Eliminar el token
    console.log('Sesión cerrada');
    this.router.navigate(['/login']); // Redirigir al login
  }
}
