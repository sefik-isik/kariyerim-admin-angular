import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UniversityDepartmentDescription } from '../../../models/component/universityDepartmentDescription';
import { UniversityDepartmentDescriptionService } from '../../../services/universityDepartmentDescription.service';
import { AuthService } from '../../../services/auth.service';
import { ValidationService } from '../../../services/validation.service';
import { UniversityDepartmentDescriptionDTO } from '../../../models/dto/universityDepartmentDescriptionDTO';
import { UniversityDepartmentDescriptionDetailComponent } from '../universityDepartmentDescriptionDetail/universityDepartmentDescriptionDetail.component';
import { UniversityDepartmentDescriptionUpdateComponent } from '../universityDepartmentDescriptionUpdate/universityDepartmentDescriptionUpdate.component';
import { FilterUniversityDepartmentDescriptionPipe } from '../../../pipes/filterUniversityDepartmentDescription.pipe';
import { UniversityDepartmentService } from '../../../services/universityDepartment.service';
import { UniversityDepartment } from '../../../models/component/universitydepartment';

@Component({
  selector: 'app-universityDepartmentDescriptionList',
  templateUrl: './universityDepartmentDescriptionList.component.html',
  styleUrls: ['./universityDepartmentDescriptionList.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    FilterUniversityDepartmentDescriptionPipe,
  ],
})
export class UniversityDepartmentDescriptionListComponent implements OnInit {
  universityDepartmentDescriptionDTOs: UniversityDepartmentDescriptionDTO[] =
    [];
  universityDepartments: UniversityDepartment[] = [];
  dataLoaded = false;
  filter1 = '';
  componentTitle = 'University Department Description List';
  admin: boolean = false;

  constructor(
    private universityDepartmentDescriptionService: UniversityDepartmentDescriptionService,
    private universityDepartmentService: UniversityDepartmentService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private authService: AuthService,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getUniversityDepartmentDescriptions();
    this.getUniversityDepartments();

    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getUniversityDepartmentDescriptions();
      }
    });
  }

  getUniversityDepartmentDescriptions() {
    this.universityDepartmentDescriptionService.getAllDTO().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.universityDepartmentDescriptionDTOs = response.data.filter(
          (f) => f.departmentName != '-'
        );
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

  delete(universityDepartmentDescription: UniversityDepartmentDescription) {
    if (!this.authService.isAdmin()) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.universityDepartmentDescriptionService
      .delete(universityDepartmentDescription)
      .subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.ngOnInit();
          this.toastrService.success('Başarı ile silindi');
        },
        (responseError) => this.validationService.handleErrors(responseError)
      );
  }

  deleteAll() {
    if (!this.authService.isAdmin()) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Tümünü Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.universityDepartmentDescriptionDTOs.forEach(
      (universityDepartmentDescriptionDTO) => {
        this.universityDepartmentDescriptionService
          .delete(universityDepartmentDescriptionDTO)
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
      this.toastrService.success('Tümü Başarı ile silindi');
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
