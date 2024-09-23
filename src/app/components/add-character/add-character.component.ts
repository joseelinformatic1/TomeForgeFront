import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ImageCropperComponent, ImageCroppedEvent, LoadedImage} from 'ngx-image-cropper';

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
  imports: [CommonModule,ImageCropperComponent],
  templateUrl: './add-character.component.html',
  styleUrls: ['./add-character.component.css']
})
export class AddCharacterComponent {
  imageChangeEvent: any = '';
  croppedImage: any = '';
  
  fileChangeEvent($event: any): void {
    this.imageChangeEvent = event;
  }

  imageCropped(event: ImageCroppedEvent){
    this.croppedImage = event.base64;
  }
  
  cropperReady(){
    console.log('Cropper Listo');
  }

  loadImageFailed() {
    console.error('Error al cargar la imagen');
  }

  guardarImagen() {
    // Aquí puedes guardar la imagen recortada o subirla al servidor
    console.log('Imagen guardada:', this.croppedImage);
  }

  cancelar() {
    // Acción para cancelar el recorte
    this.imageChangeEvent = '';
    this.croppedImage = '';
  }

  // Definir las características con el tipo correcto
  caracteristicas: { [key: string]: Caracteristica } = {
    fuerza: { valor: 10, modificador: 0, bonus: 0, bonus2: false, bonus1: false, puedeSeleccionarBonus2: true, puedeSeleccionarBonus1: true  },
    destreza: { valor: 10, modificador: 0, bonus: 0, bonus2: false, bonus1: false, puedeSeleccionarBonus2: true,puedeSeleccionarBonus1: true },
    constitucion: { valor: 10, modificador: 0, bonus: 0, bonus2: false, bonus1: false, puedeSeleccionarBonus2: true, puedeSeleccionarBonus1: true },
    inteligencia: { valor: 10, modificador: 0, bonus: 0, bonus2: false, bonus1: false, puedeSeleccionarBonus2: true, puedeSeleccionarBonus1: true },
    sabiduria: { valor: 10, modificador: 0, bonus: 0, bonus2: false, bonus1: false, puedeSeleccionarBonus2: true, puedeSeleccionarBonus1: true },
    carisma: { valor: 10, modificador: 0, bonus: 0, bonus2: false, bonus1: false, puedeSeleccionarBonus2: true, puedeSeleccionarBonus1: true }
  };

  puedeSeleccionarBonus2: boolean = true;
  puedeSeleccionarBonus1: boolean = true;

  // Método para incrementar el valor y actualizar el modificador
  incrementar(caracteristica: string) {
    if (this.caracteristicas[caracteristica].valor !== undefined) {
      this.caracteristicas[caracteristica].valor += 1;
      this.actualizarModificador(caracteristica); // Actualizamos el modificador
    }
  }

  // Método para decrementar el valor y actualizar el modificador
  decrementar(caracteristica: string) {
    if (this.caracteristicas[caracteristica].valor !== undefined && this.caracteristicas[caracteristica].valor > 0) {
      this.caracteristicas[caracteristica].valor -= 1;
      this.actualizarModificador(caracteristica); // Actualizamos el modificador
    }
  }

  // Método para actualizar el modificador
  actualizarModificador(caracteristica: string) {
    const valor = this.caracteristicas[caracteristica].valor;
    this.caracteristicas[caracteristica].modificador = Math.floor((valor - 10) / 2); // Actualiza el modificador cada 2 puntos
  }

  // Método para asignar bonus
 
asignarBonus(caracteristica: string, bonus: number) {
  const statObj = this.caracteristicas[caracteristica];

  if (bonus === 2) {
    if (statObj.bonus2) {
      // Si ya tiene el +2, lo deseleccionamos
      statObj.bonus2 = false;
      this.puedeSeleccionarBonus2 = true;
    } else if (this.puedeSeleccionarBonus2) {
      // Si se puede asignar +2, desactivamos +2 en cualquier otra característica
      Object.keys(this.caracteristicas).forEach(key => {
        this.caracteristicas[key].bonus2 = (key === caracteristica);
      });
      this.puedeSeleccionarBonus2 = false;
    }
  } else if (bonus === 1) {
    if (statObj.bonus1) {
      // Si ya tiene el +1, lo deseleccionamos
      statObj.bonus1 = false;
      this.puedeSeleccionarBonus1 = true;
    } else if (this.puedeSeleccionarBonus1) {
      // Si se puede asignar +1, desactivamos +1 en cualquier otra característica
      Object.keys(this.caracteristicas).forEach(key => {
        this.caracteristicas[key].bonus1 = (key === caracteristica);
      });
      this.puedeSeleccionarBonus1 = false;
    }
  }
}

}
