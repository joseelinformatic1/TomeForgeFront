import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [RouterOutlet, LoginComponent, HeaderComponent]
})
export class AppComponent {
  usersListVisible: boolean = false;

  toggleAdminMode() {
    this.usersListVisible = !this.usersListVisible;
  }
  
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(private storageService: StorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.username;
     
    }
  }
  logout(): void {
    this.authService.logout();
    this.storageService.removeToken();
    this.isLoggedIn = false;
    window.location.reload(); // Opcional: Recargar la aplicación para limpiar el estado
  }
}