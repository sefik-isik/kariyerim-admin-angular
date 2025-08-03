import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UniversityDepartmentDescription } from '../../../models/component/universityDepartmentDescription';
import { UniversityDepartmentDescriptionDTO } from '../../../models/dto/universityDepartmentDescriptionDTO';
import { UniversityDepartmentDescriptionService } from '../../../services/universityDepartmentDescription.service';
import { ValidationService } from '../../../services/validation.service';
import { UniversityDepartmentDescriptionDetailComponent } from '../universityDepartmentDescriptionDetail/universityDepartmentDescriptionDetail.component';
import { UniversityDepartmentDescriptionUpdateComponent } from '../universityDepartmentDescriptionUpdate/universityDepartmentDescriptionUpdate.component';
import { UniversityDepartment } from '../../../models/component/universitydepartment';
import { UniversityDepartmentService } from '../../../services/universityDepartment.service';

@Component({
  selector: 'app-universityDepartmentDescriptionDeletedList',
  templateUrl: './universityDepartmentDescriptionDeletedList.component.html',
  styleUrls: ['./universityDepartmentDescriptionDeletedList.component.css'],
  imports: [CommonModule, FormsModule],
})
export class UniversityDepartmentDescriptionDeletedListComponent
  implements OnInit
{
  universityDepartmentDescriptionDTOs: UniversityDepartmentDescriptionDTO[] =
    [];
  universityDepartments: UniversityDepartment[] = [];
  dataLoaded = false;
  filter1 = '';
  componentTitle = 'University Department Description Deleted List';
  constructor(
    private universityDepartmentDescriptionService: UniversityDepartmentDescriptionService,
    private universityDepartmentService: UniversityDepartmentService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.getUniversityDepartmentDescriptions();
    this.getUniversityDepartments();

    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getUniversityDepartmentDescriptions();
      }
    });
  }

  getUniversityDepartmentDescriptions() {
    this.universityDepartmentDescriptionService.getDeletedAllDTO().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.universityDepartmentDescriptionDTOs = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getUniversityDepartments() {
    this.universityDepartmentService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.universityDepartments = response.data.filter(
          (f) => f.departmentName != '-'
        );
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDelete(
    universityDepartmentDescriptionDTO: UniversityDepartmentDescription
  ) {
    this.universityDepartmentDescriptionService
      .update(universityDepartmentDescriptionDTO)
      .subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.ngOnInit();
          this.toastrService.success('Başarı ile geri alındı');
        },
        (responseError) => this.validationService.handleErrors(responseError)
      );
  }

  unDeleteAll() {
    this.universityDepartmentDescriptionDTOs.forEach(
      (universityDepartmentDescriptionDTO) => {
        this.universityDepartmentDescriptionService
          .update(universityDepartmentDescriptionDTO)
          .subscribe(
            (response) => {
              this.validationService.handleSuccesses(response);
            },
            (responseError) =>
              this.validationService.handleErrors(responseError)
          );
      }
    );
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  terminate(
    universityDepartmentDescriptionDTO: UniversityDepartmentDescriptionDTO
  ) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.universityDepartmentDescriptionService
      .terminate(universityDepartmentDescriptionDTO)
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

    this.universityDepartmentDescriptionDTOs.forEach(
      (universityDepartmentDescriptionDTO) => {
        this.universityDepartmentDescriptionService
          .terminate(universityDepartmentDescriptionDTO)
          .subscribe(
            (response) => {
              this.validationService.handleSuccesses(response);
            },
            (responseError) =>
              this.validationService.handleErrors(responseError)
          );
      }
    );
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile kalıcı olarak silindi');
    }, 500);
  }

  open(universityDepartmentDescriptionDTO: UniversityDepartmentDescriptionDTO) {
    const modalRef = this.modalService.open(
      UniversityDepartmentDescriptionUpdateComponent,
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
    modalRef.componentInstance.universityDepartmentDescriptionDTO =
      universityDepartmentDescriptionDTO;
  }

  openDetail(
    universityDepartmentDescriptionDTO: UniversityDepartmentDescriptionDTO
  ) {
    const modalRef = this.modalService.open(
      UniversityDepartmentDescriptionDetailComponent,
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
    modalRef.componentInstance.universityDepartmentDescriptionDTO =
      universityDepartmentDescriptionDTO;
  }

  clearInput1() {
    this.filter1 = null;
    this.getUniversityDepartmentDescriptions();
  }
}
