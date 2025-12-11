import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MascotasService } from '../../services/mascotas.service';
import { ESPECIES } from '../../data/especies.spec';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-alta-mascota',
  templateUrl: './alta-mascota.component.html',
  styleUrls: ['./alta-mascota.component.css'] // Usa su propio archivo
})
export class AltaMascotaComponent implements OnInit {
  @Output() cerrar = new EventEmitter<void>();
  
  formulario!: FormGroup;
  especies = ESPECIES;
  razas: string[] = [];
  loading = false;
  formMessage: { type: 'success' | 'error', text: string, icon: string } | null = null;

  constructor(
    private fb: FormBuilder,
    private mascotasService: MascotasService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formulario = this.fb.group({
      especie: ['', Validators.required],
      raza: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      edad: [0, [Validators.required, Validators.min(0), Validators.max(50)]]
    });
  }

  onEspecieChange() {
    const especieSeleccionada = this.especies.find(
      e => e.nombre === this.formulario.value.especie
    );
    this.razas = especieSeleccionada ? especieSeleccionada.razas : [];
    this.formulario.controls['raza'].setValue('');
  }

  async guardarMascota() {
    if (this.formulario.invalid) {
      this.showMessage('error', 'Por favor completa todos los campos correctamente', 'fas fa-exclamation-circle');
      return;
    }

    this.loading = true;
    
    // Simulación de delay para mostrar loading
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      const nuevaMascota = {
        id: uuidv4(),
        ...this.formulario.value
      };

      this.mascotasService.agregar(nuevaMascota);
      
      this.showMessage('success', '¡Mascota registrada exitosamente!', 'fas fa-check-circle');
      
      // Cerrar después de 1.5 segundos
      setTimeout(() => {
        this.loading = false;
        this.cerrar.emit();
      }, 1500);

    } catch (error) {
      this.loading = false;
      this.showMessage('error', 'Error al guardar la mascota', 'fas fa-times-circle');
    }
  }

  onCancelar() {
    if (!this.loading) {
      this.cerrar.emit();
    }
  }

  private showMessage(type: 'success' | 'error', text: string, icon: string) {
    this.formMessage = { type, text, icon };
    
    setTimeout(() => {
      this.formMessage = null;
    }, 3000);
  }
}