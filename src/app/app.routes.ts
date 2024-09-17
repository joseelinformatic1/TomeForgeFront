import { RouterModule,Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { HomeComponent } from './components/home/home.component';
import { PersonajesComponent } from './components/personajes/personajes.component';
import { CampanyasComponent } from './components/campanyas/campanyas.component';
import { AmigosComponent } from './components/amigos/amigos.component';
import { TableroVirtualComponent } from './components/tablero-virtual/tablero-virtual.component';
import { AddCharacterComponent } from './components/add-character/add-character.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },  // Ruta sin Header
    {
      path: '',
      component: MainLayoutComponent,  // El layout con el header
      children: [
        { path: '', component: HomeComponent },  // Home usa el layout con el Header
        { path: 'characters', component: PersonajesComponent },  // Vista de personajes
        { path: 'campains', component: CampanyasComponent },  // Vista de campañas
        { path: 'friends', component: AmigosComponent },  // Vista de amigos
        { path: 'games', component: AmigosComponent },  // Vista de juegos
        { path: 'tabletop', component: TableroVirtualComponent },  // Vista del tablero virtual
        { path: 'addCharacter', component: AddCharacterComponent } // Vista añadir personaje
        
      ]
    },
    { path: '**', redirectTo: '' }  // Redirigir a Home si la ruta no es válida
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}
