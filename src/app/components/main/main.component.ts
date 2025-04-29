import { CodeService } from './../../services/code.service';
import { Component, OnInit } from '@angular/core';
import { PersonelUserCode } from '../../models/userCodes';
import { CompanyUserCode } from '../../models/userCodes';
import { LocalStorageService } from '../../services/localStorage.service';
import { UserCodeModel } from '../../models/userCodeModel';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import e from 'express';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  imports: [],
})
export class MainComponent implements OnInit {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private authService: AuthService,
    private toastrService: ToastrService,
    private codeService: CodeService
  ) {}

  ngOnInit() {
    if (this.localStorageService.getFromLocalStorage('id') == null) {
      this.router.navigate(['login']);
    } else {
      this.codeService.getCode();
    }
  }

  updatePersonelUserCode() {
    if (!confirm('Personel Userı seçmek istediğinize emin misiniz?')) {
      this.toastrService.info('Seçim İşlemi İptal Edildi');
      return;
    }
    this.updateUserCode(PersonelUserCode);
  }

  updateCompanyUserCode() {
    if (!confirm('Company Userı seçmek istediğinize emin misiniz?')) {
      this.toastrService.info('Seçim İşlemi İptal Edildi');
      return;
    }
    this.updateUserCode(CompanyUserCode);
  }

  updateUserCode(code: string) {
    this.authService.updateCode(this.getModel(code)).subscribe(
      (response) => {
        this.codeService.getCode();
        this.toastrService.success('Seçiminizi başarıyla yaptınız', 'Başarılı');
      },
      (error) => console.log(error)
    );
  }

  getModel(code: string): UserCodeModel {
    let updateUserCodeModel: UserCodeModel = Object.assign({
      id: this.localStorageService.getFromLocalStorage('id'),
      code: code,
      email: this.localStorageService.getFromLocalStorage('email'),
    });
    return updateUserCodeModel;
  }
}
