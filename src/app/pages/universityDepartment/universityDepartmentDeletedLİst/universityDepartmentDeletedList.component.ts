import { DepartmentService } from './../../../services/department.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { UniversityDepartmentDTO } from '../../../models/dto/universityDepartmentDTO';
import { University } from '../../../models/component/university';
import { UniversityDepartmentService } from '../../../services/universityDepartment.service';
import { UniversityService } from '../../../services/university.service';
import { FilterUniversityDepartmentPipe } from '../../../pipes/filterUniversityDepartment.pipe';
import { FilterUniversityDepartmentsByUniversityPipe } from '../../../pipes/filterUniversityDepartmentsByUniversity.pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UniversityDepartmentUpdateComponent } from '../universityDepartmentUpdate/universityDepartmentUpdate.component';
import { UniversityDepartmentDetailComponent } from '../universityDepartmentDetail/universityDepartmentDetail.component';
import { Department } from '../../../models/component/department';
import { FacultyService } from '../../../services/faculty.service';
import { Faculty } from '../../../models/component/faculty';
import { FilterUniversityFacultyPipe } from '../../../pipes/filterUniversityFaculty.pipe';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-universityDepartmentDeletedList',
  templateUrl: './universityDepartmentDeletedList.component.html',
  styleUrls: ['./universityDepartmentDeletedList.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    FilterUniversityDepartmentPipe,
    FilterUniversityDepartmentsByUniversityPipe,
    FilterUniversityFacultyPipe,
  ],
})
export class UniversityDepartmentDeletedListComponent implements OnInit {
  universityDepartmentDTOs: UniversityDepartmentDTO[] = [];
  universities: University[];
  faculties: Faculty[] = [];
  departments: Department[];
  dataLoaded = false;
  filter1 = '';
  filter2 = '';
  filter3 = '';
  componentTitle = 'Deleted University Departments';

  constructor(
    private universityDepartmentService: UniversityDepartmentService,
    private toastrService: ToastrService,
    private universityService: UniversityService,
    private facultyService: FacultyService,
    private departmentService: DepartmentService,
    private modalService: NgbModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.getUniversities();
    this.getFaculties();
    this.getDepartments();
    this.getUniversityDepartments();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getUniversityDepartments();
      }
    });
  }

  getUniversities() {
    this.universityService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.universities = response.data.filter(
          (f) => f.universityName != '-'
        );
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getFaculties() {
    this.facultyService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.faculties = response.data.filter((f) => f.facultyName != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getDepartments() {
    this.departmentService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.departments = response.data.filter((f) => f.departmentName != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getUniversityDepartments() {
    this.universityDepartmentService.getDeletedAllDTO().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.universityDepartmentDTOs = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDelete(UniversityDepartment: UniversityDepartmentDTO) {
    this.universityDepartmentService.update(UniversityDepartment).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDeleteAll() {
    this.universityDepartmentDTOs.forEach((universityDepartment) => {
      this.universityDepartmentService.update(universityDepartment).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
        },
        (responseError) => this.validationService.handleErrors(responseError)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  terminate(universityDepartmentDTO: UniversityDepartmentDTO) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.universityDepartmentService
      .terminate(universityDepartmentDTO)
      .subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.toastrService.success('Başarı ile kalıcı olarak silindi');
          this.ngOnInit();
        },
        (responseError) => this.validationService.handleErrors(responseError)
      );
  }

  terminateAll() {
    if (!confirm('Tümünü Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.universityDepartmentDTOs.forEach((universityDepartmentDTO) => {
      this.universityDepartmentService
        .terminate(universityDepartmentDTO)
        .subscribe(
          (response) => {
            this.validationService.handleSuccesses(response);
          },
          (responseError) => this.validationService.handleErrors(responseError)
        );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile kalıcı olarak silindi');
    }, 500);
  }

  open(universityDepartmentDTO: UniversityDepartmentDTO) {
    const modalRef = this.modalService.open(
      UniversityDepartmentUpdateComponent,
      {
        size: 'lg',
        backdrop: 'static',
        keyboard: true,
        centered: true,
        scrollable: false,
        windowClass: 'modal-holder',
        backdropClass: 'modal-backdrop',
      }
    );
    modalRef.componentInstance.universityDepartmentDTO =
      universityDepartmentDTO;
  }

  openDetail(universityDepartmentDTO: UniversityDepartmentDTO) {
    const modalRef = this.modalService.open(
      UniversityDepartmentDetailComponent,
      {
        size: 'lg',
        backdrop: 'static',
        keyboard: true,
        centered: true,
        scrollable: false,
        windowClass: 'modal-holder',
        backdropClass: 'modal-backdrop',
      }
    );
    modalRef.componentInstance.universityDepartmentDTO =
      universityDepartmentDTO;
  }

  clearInput1() {
    this.filter1 = null;
    this.getUniversities();
  }

  clearInput2() {
    this.filter2 = null;
    this.getFaculties();
  }

  clearInput3() {
    this.filter3 = null;
    this.getDepartments();
  }
}
