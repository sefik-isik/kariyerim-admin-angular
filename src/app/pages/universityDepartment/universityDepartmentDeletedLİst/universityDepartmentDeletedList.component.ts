import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { UniversityDepartmentDTO } from '../../../models/universityDepartmentDTO';
import { University } from '../../../models/university';
import { UniversityDepartmentService } from '../../../services/universityDepartment.service';
import { UniversityService } from '../../../services/university.service';
import { FilterUniversityDepartmentPipe } from '../../../pipes/filterUniversityDepartment.pipe';
import { FilterUniversityDepartmentsByUniversityPipe } from '../../../pipes/filterUniversityDepartmentsByUniversity.pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UniversityDepartmentUpdateComponent } from '../universityDepartmentUpdate/universityDepartmentUpdate.component';
import { UniversityDepartmentDetailComponent } from '../universityDepartmentDetail/universityDepartmentDetail.component';

@Component({
  selector: 'app-universityDepartmentDeletedList',
  templateUrl: './universityDepartmentDeletedList.component.html',
  styleUrls: ['./universityDepartmentDeletedList.component.css'],
  imports: [
    CommonModule,
    FormsModule,

    FilterUniversityDepartmentPipe,
    FilterUniversityDepartmentsByUniversityPipe,
  ],
})
export class UniversityDepartmentDeletedListComponent implements OnInit {
  universityDepartmentDTOs: UniversityDepartmentDTO[] = [];
  universities: University[];
  dataLoaded = false;
  filter1 = '';
  filter2 = '';
  componentTitle = 'Deleted University Departments';
  constructor(
    private universityDepartmentService: UniversityDepartmentService,
    private toastrService: ToastrService,
    private universityService: UniversityService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getUniversities();
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
        this.universities = response.data;
      },
      (error) => console.error
    );
  }

  getUniversityDepartments() {
    this.universityDepartmentService.getAllDeletedDTO().subscribe(
      (response) => {
        this.universityDepartmentDTOs = response.data;
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

  open(universityDepartmentDTO: UniversityDepartmentDTO) {
    const modalRef = this.modalService.open(
      UniversityDepartmentUpdateComponent,
      {
        size: 'lg',
        backdrop: 'static',
        keyboard: false,
        centered: true,
        scrollable: true,
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
        keyboard: false,
        centered: true,
        scrollable: true,
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
    this.getUniversityDepartments();
  }
}
