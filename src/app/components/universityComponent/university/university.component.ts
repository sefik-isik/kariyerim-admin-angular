import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { University } from '../../../models/university';
import { UniversityService } from '../../../services/university.service';
import { FilterUniversityPipe } from '../../../pipes/filterUniversity.pipe';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css'],
  imports: [CommonModule, FormsModule, RouterLink, FilterUniversityPipe],
})
export class UniversityComponent implements OnInit {
  universities: University[] = [];
  componentTitle = 'Universities';
  filter1: string;

  constructor(
    private toastrService: ToastrService,
    private authService: AuthService,
    private universityService: UniversityService
  ) {}

  ngOnInit() {
    this.getUniversities();
  }

  getUniversities() {
    this.universityService.getAll().subscribe(
      (response) => {
        this.universities = response.data.filter((f) => f.deletedDate == null);
      },
      (error) => console.error
    );
  }

  delete(university: University) {
    if (!this.authService.isAdmin('status')) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.universityService.delete(university).subscribe(
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
    this.universities.forEach((university) => {
      this.universityService.delete(university).subscribe(
        (response) => {},
        (error) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
    }, 500);
  }

  clearInput1() {
    this.filter1 = null;
    this.getUniversities();
  }
}
