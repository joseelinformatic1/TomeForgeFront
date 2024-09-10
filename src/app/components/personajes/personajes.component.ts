import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-personajes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.css']
 
})
export class PersonajesComponent {
  personajes = [
    {
      nombre: 'Satiro',
      clase: 'Bardo',
      nivel: 4,
      campanya: 'D&D 5ª Ed.',
      imagen: 'assets/satiro.jpg'  // Asegúrate de que la imagen esté en la ruta correcta
    },
    {
      nombre: 'Xylon',
      clase: 'Druida',
      nivel: 2,
      campanya: 'D&D 5ª Ed.',
      imagen: 'assets/xylon.jpg'
    },
    {
      nombre: 'Mortimer el Risueño',
      clase: 'Bardo',
      nivel: 2,
      campanya: 'D&D 5ª Ed.',
      imagen: 'assets/mortimer.jpg'
    },
    {
      nombre: 'Mortimer el Risueño',
      clase: 'Bardo',
      nivel: 2,
      campanya: 'D&D 5ª Ed.',
      imagen: 'assets/mortimer.jpg'
    },
    {
      nombre: 'Mortimer el Risueño',
      clase: 'Bardo',
      nivel: 2,
      campanya: 'D&D 5ª Ed.',
      imagen: 'assets/mortimer.jpg'
    },
    {
      nombre: 'Mortimer el Risueño',
      clase: 'Bardo',
      nivel: 2,
      campanya: 'D&D 5ª Ed.',
      imagen: 'assets/mortimer.jpg'
    },
    {
      nombre: 'Mortimer el Risueño',
      clase: 'Bardo',
      nivel: 2,
      campanya: 'D&D 5ª Ed.',
      imagen: 'assets/mortimer.jpg'
    },
    {
      nombre: 'Mortimer el Risueño',
      clase: 'Bardo',
      nivel: 2,
      campanya: 'D&D 5ª Ed.',
      imagen: 'assets/mortimer.jpg'
    },
    {
      nombre: 'Mortimer el Risueño',
      clase: 'Bardo',
      nivel: 2,
      campanya: 'D&D 5ª Ed.',
      imagen: 'assets/mortimer.jpg'
    }
    // Agrega más personajes aquí
  ];

  verDetalles(personaje: any) {
    console.log('Ver detalles de:', personaje.nombre);
  }

  editarPersonaje(personaje: any) {
    console.log('Editar personaje:', personaje.nombre);
  }

  eliminarPersonaje(personaje: any) {
    console.log('Eliminar personaje:', personaje.nombre);
  }
}
