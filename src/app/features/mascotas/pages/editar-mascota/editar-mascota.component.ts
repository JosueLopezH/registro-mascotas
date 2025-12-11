import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  
import { MascotasService } from '../../services/mascotas.service';
import { ESPECIES } from '../../data/especies.spec';

@Component({
  selector: 'app-editar-mascota',
  templateUrl: './editar-mascota.component.html',
  styleUrls: ['./editar-mascota.component.css']
})
export class EditarMascotaComponent implements OnChanges {
  @Input() idMascota: string | null = null;
  @Output() cerrar = new EventEmitter<void>();

  formulario!: FormGroup;
  especies = ESPECIES;
  razas: string[] = [];
  loading = false;
  formMessage: { type: 'success' | 'error', text: string, icon: string } | null = null;

  constructor(
    private fb: FormBuilder,
    private mascotasService: MascotasService
  ) {
    this.crearFormulario();
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      especie: ['', Validators.required],
      raza: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      edad: [0, [Validators.required, Validators.min(0), Validators.max(50)]]
    });
  }

  ngOnChanges(): void {
    if (this.idMascota) {
      this.cargarDatosMascota();
    }
  }

  cargarDatosMascota() {
    const mascota = this.mascotasService.obtenerPorId(this.idMascota!);
    if (!mascota) {
      this.showMessage('error', 'No se encontró la mascota', 'fas fa-exclamation-triangle');
      return;
    }

    this.formulario.patchValue({
      especie: mascota.especie,
      raza: mascota.raza,
      nombre: mascota.nombre,
      edad: mascota.edad
    });

    this.actualizarRazas(mascota.especie);
  }

  actualizarRazas(especieNombre: string) {
    const especie = this.especies.find(e => e.nombre === especieNombre);
    this.razas = especie ? especie.razas : [];

    const razaActual = this.formulario.get('raza')?.value;
    if (razaActual && !this.razas.includes(razaActual)) {
      this.formulario.patchValue({ raza: '' });
    }
  }

  onEspecieChange() {
    const especieNombre = this.formulario.get('especie')?.value;
    this.actualizarRazas(especieNombre);
  }

  async guardar() {
    if (this.formulario.invalid) {
      this.showMessage('error', 'Por favor completa todos los campos correctamente', 'fas fa-exclamation-circle');
      return;
    }

    this.loading = true;
    
    // Simulación de delay para mostrar loading
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      this.mascotasService.actualizar({
        id: this.idMascota!,
        ...this.formulario.value
      });

      this.showMessage('success', '¡Cambios guardados exitosamente!', 'fas fa-check-circle');
      
      // Cerrar después de 1.5 segundos
      setTimeout(() => {
        this.loading = false;
        this.cerrar.emit();
      }, 1500);

    } catch (error) {
      this.loading = false;
      this.showMessage('error', 'Error al guardar los cambios', 'fas fa-times-circle');
    }
  }

  onCancelar() {
    if (!this.loading) {
      this.cerrar.emit();
    }
  }

  private showMessage(type: 'success' | 'error', text: string, icon: string) {
    this.formMessage = { type, text, icon };
    
    // Auto-ocultar mensaje después de 3 segundos
    setTimeout(() => {
      this.formMessage = null;
    }, 3000);
  }
}