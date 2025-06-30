import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { Router } from '@angular/router';

import { AdminService } from '../../../services/helperServices/admin.service';
import { AdminModel } from '../../../models/auth/adminModel';

@Component({
  selector: 'app-personelUserMain',
  templateUrl: './personelUserMain.component.html',
  styleUrls: ['./personelUserMain.component.css'],
})
export class PersonelUserMainComponent implements OnInit {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private adminService: AdminService
  ) {}

  ngOnInit() {}
}
