import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { UniversityDepartmentDTO } from '../../../models/universityDepartmentDTO';
import { University } from '../../../models/university';
import { UniversityDepartmentService } from '../../../services/universityDepartment.service';
import { UniversityService } from '../../../services/university.service';
import { FilterUniversityDepartmentPipe } from '../../../pipes/filterUniversityDepartment.pipe';
import { FilterUniversityDepartmentsByUniversityPipe } from '../../../pipes/filterUniversityDepartmentsByUniversity.pipe';

@Component({
  selector: 'app-universityDepartmentOfDeleted',
  templateUrl: './universityDepartmentOfDeleted.component.html',
  styleUrls: ['./universityDepartmentOfDeleted.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    FilterUniversityDepartmentPipe,
    FilterUniversityDepartmentsByUniversityPipe,
  ],
})
export class UniversityDepartmentOfDeletedComponent implements OnInit {
  universityDepartmentDTOs: UniversityDepartmentDTO[] = [];
  universities: University[];
  dataLoaded = false;
  filter1 = '';
  filter2 = '';
  componentTitle = 'Deleted University Departments';
  constructor(
    private universityDepartmentService: UniversityDepartmentService,
    private toastrService: ToastrService,
    private universityService: UniversityService
  ) {}

  ngOnInit() {
    this.getUniversities();
    this.getUniversityDepartments();
  }

  getUniversities() {
    this.universityService.getAll().subscribe(
      (response) => {
        this.universities = response.data.filter((f) => f.deletedDate == null);
        this.dataLoaded = true;
      },
      (error) => console.error
    );
  }

  getUniversityDepartments() {
    this.universityDepartmentService.getAllDTO().subscribe(
      (response) => {
        this.universityDepartmentDTOs = response.data.filter(
          (f) => f.deletedDate != null
        );
      },
      (error) => console.error
    );
  }

  unDelete(UniversityDepartment: UniversityDepartmentDTO) {
    this.universityDepartmentService.update(UniversityDepartment).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (error) => console.error
    );
  }

  unDeleteAll() {
    this.universityDepartmentDTOs.forEach((universityDepartment) => {
      this.universityDepartmentService.update(universityDepartment).subscribe(
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
    this.getUniversities();
  }

  clearInput2() {
    this.filter2 = null;
    this.getUniversityDepartments();
  }
}
