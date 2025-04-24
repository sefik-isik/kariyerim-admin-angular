import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { DriverLicenceService } from '../../../services/driverLicense.service';
import { DriverLicence } from '../../../models/driverLicence';

@Component({
  selector: 'app-driverLicence',
  templateUrl: './driverLicence.component.html',
  styleUrls: ['./driverLicence.component.css'],
  imports: [CommonModule, FormsModule, RouterLink],
})
export class DriverLicenceComponent implements OnInit {
  driverLicences: DriverLicence[] = [];
  componentTitle = 'Driver Licences';

  constructor(
    private toastrService: ToastrService,
    private authService: AuthService,
    private driverLicenceService: DriverLicenceService
  ) {}

  ngOnInit() {
    this.getDriverLicences();
  }

  getDriverLicences() {
    this.driverLicenceService.getAll().subscribe(
      (response) => {
        this.driverLicences = response.data.filter(
          (f) => f.deletedDate == null
        );
      },
      (error) => console.error
    );
  }

  delete(driverLicence: DriverLicence) {
    if (!this.authService.isAdmin('status')) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.driverLicenceService.delete(driverLicence).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile silindi');
      },
      (error) => console.error
    );
  }

  deleteAll() {
    if (!this.authService.isAdmin('status')) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Tümünü Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.driverLicences.forEach((driverLicences) => {
      this.driverLicenceService.delete(driverLicences).subscribe(
        (response) => {},
        (error) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
    }, 500);
  }
}
