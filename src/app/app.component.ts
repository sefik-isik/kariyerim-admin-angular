import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { LocalStorageService } from './services/helperServices/localStorage.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    if (this.localStorageService.getFromLocalStorage('token')) {
      this.router.navigate(['dashboard']);
    } else {
      this.router.navigate(['login']);
    }

    if (this.authService.checkTokenExpiration('expiration')) {
      this.authService.logout();
    }
  }
}
