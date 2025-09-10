import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../services/helperServices/localStorage.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
  imports: [CommonModule, RouterLink],
})
export class NaviComponent implements OnInit {
  firstName: string;
  lastName: string;
  isAuth: boolean;
  isAdmin: boolean = false;

  constructor(
    private localStorageService: LocalStorageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (this.authService.isAdmin()) {
      this.isAdmin = true;
    }
    this.firstName = this.localStorageService.getFromLocalStorage('firstName');
    this.lastName = this.localStorageService.getFromLocalStorage('lastName');

    this.isAuthenticated();
  }

  exit() {
    this.authService.logout();
  }

  isAuthenticated() {
    if (this.localStorageService.getFromLocalStorage('token')) {
      this.isAuth = true;
    } else {
      this.isAuth = false;
    }
  }
}
