import { FacultyService } from './../../../services/faculty.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { Faculty } from '../../../models/faculty';
import { FilterFacultyPipe } from '../../../pipes/filterFaculty.pipe';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css'],
  imports: [CommonModule, FormsModule, RouterLink, FilterFacultyPipe],
})
export class FacultyComponent implements OnInit {
  faculties: Faculty[] = [];
  componentTitle = 'Faculties';
  filter1: string;

  constructor(
    private toastrService: ToastrService,
    private authService: AuthService,
    private facultyService: FacultyService
  ) {}

  ngOnInit() {
    this.getFaculties();
  }

  getFaculties() {
    this.facultyService.getAll().subscribe(
      (response) => {
        this.faculties = response.data.filter((f) => f.deletedDate == null);
      },
      (error) => console.error
    );
  }

  delete(faculty: Faculty) {
    if (!this.authService.isAdmin('status')) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.facultyService.delete(faculty).subscribe(
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
    this.faculties.forEach((faculty) => {
      this.facultyService.delete(faculty).subscribe(
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
    this.getFaculties();
  }
}
