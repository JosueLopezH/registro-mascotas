import { Component } from '@angular/core';
import { MascotasService } from '../../services/mascotas.service';

@Component({
  selector: 'app-lista-mascotas',
  templateUrl: './lista-mascotas.component.html',
  styleUrls: ['./lista-mascotas.component.css']
})
export class ListaMascotasComponent {
  mascotas: any[] = [];                 
  mostrarAlta = false;
  mostrarEditar = false;
  mascotaEditarId: string | null = null;

  constructor(private mascotasService: MascotasService) {}

  ngOnInit(): void {
    this.cargarMascotas();
  }

  abrirAlta() {
    this.mostrarAlta = true;
    this.mostrarEditar = false;
  }

  abrirEditar(id: string) {
    this.mascotaEditarId = id;
    this.mostrarAlta = false;
    this.mostrarEditar = true;
  }

  cargarMascotas() {
    this.mascotas = this.mascotasService.obtenerTodas();
  }

  cerrarFormularios() {
    this.mostrarAlta = false;
    this.mostrarEditar = false;
    this.mascotaEditarId = null;
    this.cargarMascotas();
  }

  eliminar(id: string) {
    this.mascotasService.eliminar(id);
    this.cargarMascotas();
  }

  getIcon(especie: string): string {
    const icons: any = {
      perro: 'https://cdn-icons-png.flaticon.com/512/194/194279.png',
      gato: 'https://cdn-icons-png.flaticon.com/512/1818/1818401.png',
      ave: 'https://cdn-icons-png.flaticon.com/512/8277/8277619.png',
    };

    especie = especie.toLowerCase();
    return icons[especie] || 'https://cdn-icons-png.flaticon.com/512/194/194279.png';
  }
}