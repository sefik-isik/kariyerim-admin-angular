import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UniversityService } from '../../../services/university.service';
import { FilterUniversityPipe } from '../../../pipes/filterUniversity.pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UniversityUpdateComponent } from '../universityUpdate/universityUpdate.component';
import { UniversityDetailComponent } from '../universityDetail/universityDetail.component';
import { UniversityDTO } from '../../../models/dto/universityDTO';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-universityDeletedList',
  templateUrl: './universityDeletedList.component.html',
  styleUrls: ['./universityDeletedList.component.css'],
  imports: [CommonModule, FormsModule, FilterUniversityPipe],
})
export class UniversityDeletedListComponent implements OnInit {
  universityDTOs: UniversityDTO[] = [];
  componentTitle = 'University Deleted List';
  filter1: string;

  constructor(
    private toastrService: ToastrService,
    private universityService: UniversityService,
    private modalService: NgbModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.getUniversities();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getUniversities();
      }
    });
  }

  getUniversities() {
    this.universityService.getDeletedAllDTO().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.universityDTOs = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDelete(universityDTOs: UniversityDTO) {
    this.universityService.update(universityDTOs).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDeleteAll() {
    this.universityDTOs.forEach((universityDTO) => {
      this.universityService.update(universityDTO).subscribe(
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

  terminate(universityDTO: UniversityDTO) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.universityService.terminate(universityDTO).subscribe(
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

    this.universityDTOs.forEach((universityDTO) => {
      this.universityService.terminate(universityDTO).subscribe(
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

  open(universityDTO: UniversityDTO) {
    const modalRef = this.modalService.open(UniversityUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.universityDTO = universityDTO;
  }

  openDetail(universityDTO: UniversityDTO) {
    const modalRef = this.modalService.open(UniversityDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.universityDTO = universityDTO;
  }

  clearInput1() {
    this.filter1 = null;
    this.getUniversities();
  }
}
