import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { UniversityDepartmentDTO } from '../../../models/universityDepartmentDTO';
import { University } from '../../../models/university';
import { UniversityDepartmentService } from '../../../services/universityDepartment.service';
import { UniversityService } from '../../../services/university.service';
import { FilterUniversityDepartmentsByUniversityPipe } from '../../../pipes/filterUniversityDepartmentsByUniversity.pipe';
import { FilterUniversityDepartmentPipe } from '../../../pipes/filterUniversityDepartment.pipe';

@Component({
  selector: 'app-universityDepartment',
  templateUrl: './universityDepartment.component.html',
  styleUrls: ['./universityDepartment.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    FilterUniversityDepartmentPipe,
    FilterUniversityDepartmentsByUniversityPipe,
    RouterLink,
  ],
})
export class UniversityDepartmentComponent implements OnInit {
  universityDepartmentDTOs: UniversityDepartmentDTO[] = [];
  universities: University[] = [];
  filter1 = '';
  filter2 = '';
  componentTitle = 'University Departments';
  constructor(
    private universityDepartmentService: UniversityDepartmentService,
    private toastrService: ToastrService,
    private universityService: UniversityService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getUniversities();
    this.getUniversityDepartments();
  }

  getUniversities() {
    this.universityService.getAll().subscribe(
      (response) => {
        this.universities = response.data;
      },
      (error) => console.error
    );
  }

  getUniversityDepartments() {
    this.universityDepartmentService.getAllDTO().subscribe(
      (response) => {
        this.universityDepartmentDTOs = response.data;
      },
      (error) => console.error
    );
  }

  delete(universityDepartment: UniversityDepartmentDTO) {
    if (!this.authService.isAdmin('status')) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.universityDepartmentService.delete(universityDepartment).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile silindi');
        this.ngOnInit();
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
    this.universityDepartmentDTOs.forEach((universityDepartmentDTO) => {
      this.universityDepartmentService
        .delete(universityDepartmentDTO)
        .subscribe(
          (response) => {},
          (error) => console.error
        );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
    }, 500);
  }

  getUniversityId(universityName: string): number {
    return this.universities.find((f) => f.universityName == universityName)
      ?.id;
  }

  clearInput1() {
    this.filter1 = null;
    this.getUniversities();
  }

  clearInput2() {
    this.filter2 = null;
    this.getUniversityDepartments();
  }
}
