import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  token: string | null = null;

  constructor(private storage: Storage) {}
  
  async ngOnInit() {
    // Inicializa el almacenamiento (solo si no se ha inicializado antes)
    await this.storage.create();
    // Obtén el token almacenado
    this.token = await this.storage.get('jwt_token');
    console.log('Token obtenido:', this.token);
  }
}
