import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/localStorage.service';
import { Router } from '@angular/router';
import { CodeService } from '../../services/code.service';

@Component({
  selector: 'app-companyUserMain',
  templateUrl: './companyUserMain.component.html',
  styleUrls: ['./companyUserMain.component.css'],
})
export class CompanyUserMainComponent implements OnInit {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,

    private codeService: CodeService
  ) {}

  ngOnInit() {
    if (this.localStorageService.getFromLocalStorage('id') == null) {
      this.router.navigate(['login']);
    } else {
      this.codeService.getCode();
    }
  }
}
