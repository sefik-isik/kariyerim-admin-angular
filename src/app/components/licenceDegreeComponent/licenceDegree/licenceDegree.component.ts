import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { LicenceDegree } from '../../../models/licenceDegree';
import { LicenceDegreeService } from '../../../services/licenseDegree.service';

@Component({
  selector: 'app-licenceDegree',
  templateUrl: './licenceDegree.component.html',
  styleUrls: ['./licenceDegree.component.css'],
  imports: [CommonModule, FormsModule, RouterLink],
})
export class LicenceDegreeComponent implements OnInit {
  licenceDegrees: LicenceDegree[] = [];

  componentTitle = 'Licence Degree';

  constructor(
    private toastrService: ToastrService,
    private authService: AuthService,
    private licenceDegreeService: LicenceDegreeService
  ) {}

  ngOnInit() {
    this.getLicenceDegrees();
  }

  getLicenceDegrees() {
    this.licenceDegreeService.getAll().subscribe(
      (response) => {
        this.licenceDegrees = response.data;
      },
      (error) => console.error
    );
  }

  delete(licenceDegree: LicenceDegree) {
    if (!this.authService.isAdmin('status')) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.licenceDegreeService.delete(licenceDegree).subscribe(
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
    this.licenceDegrees.forEach((licenceDegrees) => {
      this.licenceDegreeService.delete(licenceDegrees).subscribe(
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
