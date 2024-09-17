import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Definir una interfaz para las características
interface Caracteristica {
  valor: number;
  modificador: number;
}

@Component({
  selector: 'app-add-character',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-character.component.html',
  styleUrls: ['./add-character.component.css']
})
export class AddCharacterComponent {
  // Definir las características con el tipo correcto
  caracteristicas: { [key: string]: Caracteristica } = {
    fuerza: { valor: 10, modificador: 0 },
    destreza: { valor: 10, modificador: 0 },
    constitucion: { valor: 10, modificador: 0 },
    inteligencia: { valor: 10, modificador: 0 },
    sabiduria: { valor: 10, modificador: 0 },
    carisma: { valor: 10, modificador: 0 }
  };

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
}
