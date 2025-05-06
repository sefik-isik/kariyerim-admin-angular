import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LicenceDegree } from '../../../models/licenceDegree';
import { LicenceDegreeService } from '../../../services/licenseDegree.service';

@Component({
  selector: 'app-licenceDegreeOfDeleted',
  templateUrl: './licenceDegreeOfDeleted.component.html',
  styleUrls: ['./licenceDegreeOfDeleted.component.css'],
  imports: [CommonModule, FormsModule, RouterLink],
})
export class LicenceDegreeOfDeletedComponent implements OnInit {
  licenceDegrees: LicenceDegree[] = [];
  componentTitle = 'Licence Degree Of Deleted';
  filter1: string;

  constructor(
    private toastrService: ToastrService,
    private licenceDegreeService: LicenceDegreeService
  ) {}

  ngOnInit() {
    this.getLicenceDegrees();
  }

  getLicenceDegrees() {
    this.licenceDegreeService.getDeletedAll().subscribe(
      (response) => {
        this.licenceDegrees = response.data;
      },
      (error) => console.error
    );
  }

  unDelete(licenceDegree: LicenceDegree) {
    this.licenceDegreeService.update(licenceDegree).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (error) => console.error
    );
  }

  unDeleteAll() {
    this.licenceDegrees.forEach((licenceDegree) => {
      this.licenceDegreeService.update(licenceDegree).subscribe(
        (response) => {},
        (error) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  clearInput1() {
    this.filter1 = null;
    this.getLicenceDegrees();
  }
}
