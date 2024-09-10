import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';  // Componente al que quieres navegar

const routes: Routes = [
  { path: 'login', component: LoginComponent },  // Ruta que muestra el LoginComponent
  { path: '', redirectTo: '/login', pathMatch: 'full' }  // Redirige a /login por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Configuración del enrutador
  exports: [RouterModule]
})
export class AppRoutingModule {}
