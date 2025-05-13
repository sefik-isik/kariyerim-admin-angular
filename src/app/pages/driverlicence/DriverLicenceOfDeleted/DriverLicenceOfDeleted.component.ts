import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DriverLicence } from '../../../models/driverLicence';
import { DriverLicenceService } from '../../../services/driverLicense.service';

@Component({
  selector: 'app-DriverLicenceOfDeleted',
  templateUrl: './DriverLicenceOfDeleted.component.html',
  styleUrls: ['./DriverLicenceOfDeleted.component.css'],
  imports: [CommonModule, FormsModule, RouterLink],
})
export class DriverLicenceOfDeletedComponent implements OnInit {
  driverLicences: DriverLicence[] = [];

  componentTitle = 'Driver Licences Of Deleted';

  constructor(
    private toastrService: ToastrService,
    private driverLicenceService: DriverLicenceService
  ) {}

  ngOnInit() {
    this.getDriverLicences();
  }

  getDriverLicences() {
    this.driverLicenceService.getDeletedAll().subscribe(
      (response) => {
        this.driverLicences = response.data;
      },
      (error) => console.error
    );
  }

  unDelete(driverLicence: DriverLicence) {
    this.driverLicenceService.update(driverLicence).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (error) => console.error
    );
  }

  unDeleteAll() {
    this.driverLicences.forEach((driverLicence) => {
      this.driverLicenceService.update(driverLicence).subscribe(
        (response) => {},
        (error) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }
}
