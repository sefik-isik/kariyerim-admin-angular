import { University } from './../../../models/component/university';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UniversityDescription } from '../../../models/component/universityDescription';
import { UniversityDescriptionDTO } from '../../../models/dto/universityDescriptionDTO';
import { FilterUniversityDescriptionPipe } from '../../../pipes/filterUniversityDescription.pipe';
import { AuthService } from '../../../services/auth.service';
import { UniversityDescriptionService } from '../../../services/universityDescription.service';
import { ValidationService } from '../../../services/validation.service';
import { UniversityDescriptionDetailComponent } from '../universityDescriptionDetail/universityDescriptionDetail.component';
import { UniversityDescriptionUpdateComponent } from '../universityDescriptionUpdate/universityDescriptionUpdate.component';
import { UniversityService } from '../../../services/university.service';

@Component({
  selector: 'app-universityDescriptionList',
  templateUrl: './universityDescriptionList.component.html',
  styleUrls: ['./universityDescriptionList.component.css'],
  imports: [CommonModule, FormsModule, FilterUniversityDescriptionPipe],
})
export class UniversityDescriptionListComponent implements OnInit {
  universityDescriptionDTOs: UniversityDescriptionDTO[] = [];
  universities: University[] = [];
  dataLoaded = false;
  filter1 = '';
  componentTitle = 'Position Description Deleted List';
  admin: boolean = false;

  constructor(
    private universityDescriptionService: UniversityDescriptionService,
    private universityService: UniversityService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private authService: AuthService,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getUniversityDescriptions();
    this.getUniversities();

    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getUniversityDescriptions();
      }
    });
  }

  getUniversityDescriptions() {
    this.universityDescriptionService.getAllDTO().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.universityDescriptionDTOs = response.data.filter(
          (f) => f.universityName != '-'
        );
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
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

  delete(universityDescription: UniversityDescription) {
    if (!this.authService.isAdmin()) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.universityDescriptionService.delete(universityDescription).subscribe(
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

    this.universityDescriptionDTOs.forEach((universityDescription) => {
      this.universityDescriptionService.delete(universityDescription).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
        },
        (responseError) => this.validationService.handleErrors(responseError)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
    }, 500);
  }

  open(universityDescriptionDTO: UniversityDescriptionDTO) {
    const modalRef = this.modalService.open(
      UniversityDescriptionUpdateComponent,
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
    modalRef.componentInstance.universityDescriptionDTO =
      universityDescriptionDTO;
  }

  openDetail(universityDescriptionDTO: UniversityDescriptionDTO) {
    const modalRef = this.modalService.open(
      UniversityDescriptionDetailComponent,
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
    modalRef.componentInstance.universityDescriptionDTO =
      universityDescriptionDTO;
  }

  clearInput1() {
    this.filter1 = null;
    this.getUniversityDescriptions();
  }
}
