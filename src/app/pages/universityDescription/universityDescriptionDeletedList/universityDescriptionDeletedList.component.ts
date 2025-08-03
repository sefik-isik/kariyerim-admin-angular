import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UniversityDescription } from '../../../models/component/universityDescription';
import { UniversityDescriptionDTO } from '../../../models/dto/universityDescriptionDTO';
import { FilterUniversityDescriptionPipe } from '../../../pipes/filterUniversityDescription.pipe';
import { UniversityDescriptionService } from '../../../services/universityDescription.service';
import { ValidationService } from '../../../services/validation.service';
import { UniversityDescriptionDetailComponent } from '../universityDescriptionDetail/universityDescriptionDetail.component';
import { UniversityDescriptionUpdateComponent } from '../universityDescriptionUpdate/universityDescriptionUpdate.component';
import { UniversityService } from '../../../services/university.service';
import { University } from '../../../models/component/university';

@Component({
  selector: 'app-universityDescriptionDeletedList',
  templateUrl: './universityDescriptionDeletedList.component.html',
  styleUrls: ['./universityDescriptionDeletedList.component.css'],
  imports: [CommonModule, FormsModule, FilterUniversityDescriptionPipe],
})
export class UniversityDescriptionDeletedListComponent implements OnInit {
  universityDescriptionDTOs: UniversityDescriptionDTO[] = [];
  universities: University[] = [];
  dataLoaded = false;
  filter1 = '';
  componentTitle = 'University Description Deleted List';

  constructor(
    private universityDescriptionService: UniversityDescriptionService,
    private universityService: UniversityService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.getUniversityDescriptions();
    this.getUniversities();

    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getUniversityDescriptions();
      }
    });
  }

  getUniversityDescriptions() {
    this.universityDescriptionService.getDeletedAllDTO().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.universityDescriptionDTOs = response.data;
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

  unDelete(universityDescription: UniversityDescription) {
    this.universityDescriptionService.update(universityDescription).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDeleteAll() {
    this.universityDescriptionDTOs.forEach((universityDescriptionDTO) => {
      this.universityDescriptionService
        .update(universityDescriptionDTO)
        .subscribe(
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

  terminate(universityDescription: UniversityDescription) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.universityDescriptionService
      .terminate(universityDescription)
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

    this.universityDescriptionDTOs.forEach((universityDescription) => {
      this.universityDescriptionService
        .terminate(universityDescription)
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

  open(universityDescription: UniversityDescription) {
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
    modalRef.componentInstance.universityDescription = universityDescription;
  }

  openDetail(universityDescription: UniversityDescription) {
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
    modalRef.componentInstance.universityDescription = universityDescription;
  }

  clearInput1() {
    this.filter1 = null;
    this.getUniversityDescriptions();
  }
}
