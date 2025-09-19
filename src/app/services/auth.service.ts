import { Injectable, OnInit } from '@angular/core';
import { ApiUrl } from '../models/concrete/apiUrl';
import { LocalStorageService } from './helperServices/localStorage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginModel } from '../models/auth/loginModel';
import { PasswordModel } from '../models/auth/passwordModel';
import { RegisterModel } from '../models/auth/registerModel';
import { TokenModel } from '../models/auth/tokenModel';
import { AdminStatus } from '../models/concrete/status';
import { SingleResponseModel } from '../models/response/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  newUrlPath: string = ApiUrl + 'Auths/';

  constructor(
    private HttpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit() {}

  register(registerModel: RegisterModel) {
    return this.HttpClient.post<SingleResponseModel<TokenModel>>(
      this.newUrlPath + 'register',
      registerModel
    );
  }

  login(loginModel: LoginModel) {
    return this.HttpClient.post<SingleResponseModel<TokenModel>>(
      this.newUrlPath + 'login',
      loginModel
    );
  }

  isAuthenticated() {
    if (this.localStorageService.getFromLocalStorage('token')) {
      return true;
    } else {
      return false;
    }
  }

  updatePassword(passwordModel: PasswordModel) {
    return this.HttpClient.post<SingleResponseModel<PasswordModel>>(
      this.newUrlPath + 'updatepassword',
      passwordModel
    );
  }

  checkTokenExpiration(key: string): boolean {
    const expirationTime = this.localStorageService.getFromLocalStorage(key);

    let thisTime = new Date();
    thisTime.setHours(thisTime.getHours() + 3);

    if (expirationTime < thisTime.toJSON()) {
      if (this.localStorageService.clearLocalStorage()) {
        return true;
      }
    }
    return false;
  }

  isAdmin() {
    if (this.localStorageService.getFromLocalStorage('status') == AdminStatus) {
      return true;
    }
    return false;
  }

  logout() {
    this.localStorageService.clearLocalStorage();
    this.router.navigate(['login']);
    window.location.reload();
  }
}
