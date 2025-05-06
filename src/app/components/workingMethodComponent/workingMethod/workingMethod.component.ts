import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { WorkingMethod } from '../../../models/workingMethod';
import { WorkingMethodService } from '../../../services/workingMethod.service';

@Component({
  selector: 'app-workingMethod',
  templateUrl: './workingMethod.component.html',
  styleUrls: ['./workingMethod.component.css'],
  imports: [CommonModule, FormsModule, RouterLink],
})
export class WorkingMethodComponent implements OnInit {
  workingMethods: WorkingMethod[] = [];
  componentTitle = 'Working Methods';

  constructor(
    private toastrService: ToastrService,
    private authService: AuthService,
    private workingMethodService: WorkingMethodService
  ) {}

  ngOnInit() {
    this.getWorkingMethods();
  }

  getWorkingMethods() {
    this.workingMethodService.getAll().subscribe(
      (response) => {
        this.workingMethods = response.data;
      },
      (error) => console.error
    );
  }

  delete(workingMethod: WorkingMethod) {
    if (!this.authService.isAdmin('status')) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.workingMethodService.delete(workingMethod).subscribe(
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
    this.workingMethods.forEach((workingMethod) => {
      this.workingMethodService.delete(workingMethod).subscribe(
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
