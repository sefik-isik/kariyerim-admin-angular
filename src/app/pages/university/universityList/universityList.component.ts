import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { UniversityService } from '../../../services/university.service';
import { FilterUniversityPipe } from '../../../pipes/filterUniversity.pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UniversityUpdateComponent } from '../universityUpdate/universityUpdate.component';
import { UniversityDetailComponent } from '../universityDetail/universityDetail.component';
import { UniversityDTO } from '../../../models/dto/universityDTO';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-universityList',
  templateUrl: './universityList.component.html',
  styleUrls: ['./universityList.component.css'],
  imports: [CommonModule, FormsModule, FilterUniversityPipe],
})
export class UniversityListComponent implements OnInit {
  universityDTOs: UniversityDTO[] = [];
  componentTitle = 'Universities';
  filter1: string;
  admin: boolean = false;

  constructor(
    private toastrService: ToastrService,
    private authService: AuthService,
    private universityService: UniversityService,
    private modalService: NgbModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getUniversities();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getUniversities();
      }
    });
  }

  getUniversities() {
    this.universityService.getAllDTO().subscribe(
      (response) => {
        this.universityDTOs = response.data.filter(
          (f) => f.universityName != '-'
        );
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  delete(universityDTO: UniversityDTO) {
    if (!this.authService.isAdmin()) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.universityService.delete(universityDTO).subscribe(
      (response) => {
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
    this.universityDTOs.forEach((universityDTO) => {
      this.universityService.delete(universityDTO).subscribe(
        (response) => {},
        (responseError) => this.validationService.handleErrors(responseError)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
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
