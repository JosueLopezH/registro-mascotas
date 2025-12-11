import { Injectable } from '@angular/core';
import { Mascota } from '../interfaces/mascota';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {

  private storageKey = 'mascotas';

  constructor() {}

  obtenerTodas(): Mascota[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  saveMascotas(mascotas: Mascota[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(mascotas));
  }

  agregar(mascota: Mascota) {
    const mascotas = this.obtenerTodas();
    mascotas.push(mascota);
    this.saveMascotas(mascotas);
  }

  actualizar(mascota: Mascota) {
    const mascotas = this.obtenerTodas().map(m => m.id === mascota.id ? mascota : m);
    this.saveMascotas(mascotas);
  }

  eliminar(id: string) {
    const mascotas = this.obtenerTodas().filter(m => m.id !== id);
    this.saveMascotas(mascotas);
  }

  obtenerPorId(id: string): Mascota | undefined {
    return this.obtenerTodas().find(m => m.id === id);
  }
}
