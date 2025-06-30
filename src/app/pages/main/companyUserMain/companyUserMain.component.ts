import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/helperServices/admin.service';
import { AdminModel } from '../../../models/auth/adminModel';

@Component({
  selector: 'app-companyUserMain',
  templateUrl: './companyUserMain.component.html',
  styleUrls: ['./companyUserMain.component.css'],
})
export class CompanyUserMainComponent implements OnInit {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private adminService: AdminService
  ) {}

  ngOnInit() {}
}
