import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';

import { Modal } from 'bootstrap';

// Definir una interfaz para las características
interface Caracteristica {
  bonus: any;
  valor: number;
  modificador: number;
  puedeSeleccionarBonus2: boolean;
  puedeSeleccionarBonus1: boolean;
  bonus2: boolean;  // Para manejar el checkbox del +2
  bonus1: boolean;  // Para manejar el checkbox del +1
}

@Component({
  selector: 'app-add-character',
  standalone: true,
  imports: [CommonModule, ImageCropperComponent],
  templateUrl: './add-character.component.html',
  styleUrls: ['./add-character.component.css']
})
export class AddCharacterComponent {

  // Referencias a elementos del DOM usando ViewChild
  @ViewChild('inputField') inputField!: ElementRef;
  @ViewChild('modalInput') modalInput!: ElementRef;
  @ViewChild('modalElement') modalElement!: ElementRef;

  imageChangeEvent: any = '';
  croppedImage: any = '';

  // Manejo de eventos del cropper de imágenes
  fileChangeEvent($event: any): void {
    this.imageChangeEvent = $event; // Nota: corregido para tomar $event
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  cropperReady() {
    console.log('Cropper Listo');
  }

  loadImageFailed() {
    console.error('Error al cargar la imagen');
  }

  guardarImagen() {
    console.log('Imagen guardada:', this.croppedImage);
  }

  cancelar() {
    this.imageChangeEvent = '';
    this.croppedImage = '';
  }

  // Características inicializadas
  caracteristicas: { [key: string]: Caracteristica } = {
    fuerza: { valor: 10, modificador: 0, bonus: 0, bonus2: false, bonus1: false, puedeSeleccionarBonus2: true, puedeSeleccionarBonus1: true },
    destreza: { valor: 10, modificador: 0, bonus: 0, bonus2: false, bonus1: false, puedeSeleccionarBonus2: true, puedeSeleccionarBonus1: true },
    constitucion: { valor: 10, modificador: 0, bonus: 0, bonus2: false, bonus1: false, puedeSeleccionarBonus2: true, puedeSeleccionarBonus1: true },
    inteligencia: { valor: 10, modificador: 0, bonus: 0, bonus2: false, bonus1: false, puedeSeleccionarBonus2: true, puedeSeleccionarBonus1: true },
    sabiduria: { valor: 10, modificador: 0, bonus: 0, bonus2: false, bonus1: false, puedeSeleccionarBonus2: true, puedeSeleccionarBonus1: true },
    carisma: { valor: 10, modificador: 0, bonus: 0, bonus2: false, bonus1: false, puedeSeleccionarBonus2: true, puedeSeleccionarBonus1: true }
  };

  puedeSeleccionarBonus2: boolean = true;
  puedeSeleccionarBonus1: boolean = true;

  readonly LIMITE_MAXIMO = 18;
  readonly LIMITE_MINIMO = 3;

  // Incrementar el valor y actualizar el modificador
  incrementar(caracteristica: string) {
    if (this.caracteristicas[caracteristica].valor < this.LIMITE_MAXIMO) {
      this.caracteristicas[caracteristica].valor += 1;
      this.actualizarModificador(caracteristica);
    }
  }


  // Decrementar el valor y actualizar el modificador
  decrementar(caracteristica: string) {
    if (this.caracteristicas[caracteristica].valor > this.LIMITE_MINIMO) {
      this.caracteristicas[caracteristica].valor -= 1;
      this.actualizarModificador(caracteristica);
    }
  }
  // Actualizar el modificador
  actualizarModificador(caracteristica: string) {
    const valor = this.caracteristicas[caracteristica].valor;
    this.caracteristicas[caracteristica].modificador = Math.floor((valor - 10) / 2);
  }

  asignarBonus(caracteristica: string, bonus: number) {
    // Si selecciona el checkbox de +2
    if (bonus === 2) {
      if (this.caracteristicas[caracteristica].bonus2) {
        // Si el checkbox de +2 estaba seleccionado, lo desmarcamos y habilitamos todo de nuevo
        this.caracteristicas[caracteristica].valor -= 2;
        this.caracteristicas[caracteristica].bonus2 = false;
        this.habilitarTodosCheckBoxes(); // Vuelve a habilitar todos los checkboxes
      } else {
        // Si no estaba seleccionado, lo marcamos y deshabilitamos el checkbox de +1
        this.caracteristicas[caracteristica].valor += 2;
        this.caracteristicas[caracteristica].bonus2 = true;
        this.caracteristicas[caracteristica].puedeSeleccionarBonus1 = false; // Deshabilitamos el +1 de esta característica
        this.deshabilitarOtrosCheckBoxes(caracteristica, bonus);
      }
    }

    // Si selecciona el checkbox de +1
    if (bonus === 1) {
      if (this.caracteristicas[caracteristica].bonus1) {
        // Si el checkbox de +1 estaba seleccionado, lo desmarcamos y habilitamos todo de nuevo
        this.caracteristicas[caracteristica].valor -= 1;
        this.caracteristicas[caracteristica].bonus1 = false;
        this.habilitarTodosCheckBoxes(); // Vuelve a habilitar todos los checkboxes
      } else {
        // Si no estaba seleccionado, lo marcamos y deshabilitamos el checkbox de +2
        this.caracteristicas[caracteristica].valor += 1;
        this.caracteristicas[caracteristica].bonus1 = true;
        this.caracteristicas[caracteristica].puedeSeleccionarBonus2 = false; // Deshabilitamos el +2 de esta característica
        this.deshabilitarOtrosCheckBoxes(caracteristica, bonus);
      }
    }

    this.actualizarModificador(caracteristica); // Actualizamos el modificador después del cambio
  }

  // Método para deshabilitar otros checkboxes de las demás características, excepto la actual
  deshabilitarOtrosCheckBoxes(caracteristicaSeleccionada: string, bonus: number) {
    for (const key in this.caracteristicas) {
      if (key !== caracteristicaSeleccionada) { // Solo deshabilitamos otras características
        if (bonus === 2) {
          this.caracteristicas[key].puedeSeleccionarBonus2 = false;
        }
        if (bonus === 1) {
          this.caracteristicas[key].puedeSeleccionarBonus1 = false;
        }
      }
    }
  }

  // Método para habilitar todos los checkboxes cuando se deselecciona un bonus
  habilitarTodosCheckBoxes() {
    for (const key in this.caracteristicas) {
      this.caracteristicas[key].puedeSeleccionarBonus2 = true;
      this.caracteristicas[key].puedeSeleccionarBonus1 = true;
    }
  }





  // Abrir el modal y asignar valores al campo
  abrirModal() {
    const modalInputElement = this.modalInput.nativeElement as HTMLInputElement;
    const inputFieldElement = this.inputField.nativeElement as HTMLInputElement;

    // Pasamos el valor del inputField al modalInput
    modalInputElement.value = inputFieldElement.value;

    // Mostrar el modal usando Bootstrap (suponiendo que Bootstrap esté instalado)
    const modalElement = this.modalElement.nativeElement;
    const modal = new Modal(modalElement);
    modal.show();
  }

  // Guardar valor del modal en el input original y cerrar el modal
  guardarModal() {
    const modalInputElement = this.modalInput.nativeElement as HTMLInputElement;
    const inputFieldElement = this.inputField.nativeElement as HTMLInputElement;

    // Asignamos el valor del modalInput al inputField
    inputFieldElement.value = modalInputElement.value;

    // Cerramos el modal
    const modalElement = this.modalElement.nativeElement;
    const modal = Modal.getInstance(modalElement) as Modal;
    if (modal) {
      modal.hide();
    }
  }
}
