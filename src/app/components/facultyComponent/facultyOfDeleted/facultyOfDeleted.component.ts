import { FilterFacultyPipe } from './../../../pipes/filterFaculty.pipe';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Faculty } from '../../../models/faculty';
import { FacultyService } from '../../../services/faculty.service';

@Component({
  selector: 'app-facultyOfDeleted',
  templateUrl: './facultyOfDeleted.component.html',
  styleUrls: ['./facultyOfDeleted.component.css'],
  imports: [CommonModule, FormsModule, RouterLink, FilterFacultyPipe],
})
export class FacultyOfDeletedComponent implements OnInit {
  faculties: Faculty[] = [];
  componentTitle = 'Faculties Of Deleted';
  filter1: string;

  constructor(
    private toastrService: ToastrService,
    private facultyService: FacultyService
  ) {}

  ngOnInit() {
    this.getFaculties();
  }

  getFaculties() {
    this.facultyService.getAll().subscribe(
      (response) => {
        this.faculties = response.data.filter((f) => f.deletedDate != null);
      },
      (error) => console.error
    );
  }

  unDelete(faculty: Faculty) {
    this.facultyService.update(faculty).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (error) => console.error
    );
  }

  unDeleteAll() {
    this.faculties.forEach((faculty) => {
      this.facultyService.update(faculty).subscribe(
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
    this.getFaculties();
  }
}
