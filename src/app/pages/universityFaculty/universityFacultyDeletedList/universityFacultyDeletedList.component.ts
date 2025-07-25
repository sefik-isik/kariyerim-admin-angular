import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FilterPositionPipe } from '../../../pipes/filterPosition.pipe';
import { ValidationService } from '../../../services/validation.service';
import { UniversityFaculty } from '../../../models/component/universityFaculty';
import { UniversityFacultyService } from '../../../services/universityFaculty.service';
import { UniversityFacultyUpdateComponent } from '../universityFacultyUpdate/universityFacultyUpdate.component';
import { UniversityFacultyDetailComponent } from '../universityFacultyDetail/universityFacultyDetail.component';
import { FilterUniversityFacultyPipe } from '../../../pipes/filterUniversityFaculty.pipe';

@Component({
  selector: 'app-universityFacultyDeletedList',
  templateUrl: './universityFacultyDeletedList.component.html',
  styleUrls: ['./universityFacultyDeletedList.component.css'],
  imports: [CommonModule, FormsModule, FilterUniversityFacultyPipe],
})
export class UniversityFacultyDeletedListComponent implements OnInit {
  universityFaculties: UniversityFaculty[] = [];
  componentTitle = 'University Faculty Deleted List';
  filter1: string;

  constructor(
    private toastrService: ToastrService,
    private universityFacultyService: UniversityFacultyService,
    private modalService: NgbModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.getUniversityFacultys();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getUniversityFacultys();
      }
    });
  }

  getUniversityFacultys() {
    this.universityFacultyService.getDeletedAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.universityFaculties = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDelete(universityFaculty: UniversityFaculty) {
    this.universityFacultyService.update(universityFaculty).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDeleteAll() {
    this.universityFaculties.forEach((universityFaculty) => {
      this.universityFacultyService.update(universityFaculty).subscribe(
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

  terminate(universityFaculty: UniversityFaculty) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.universityFacultyService.terminate(universityFaculty).subscribe(
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

    this.universityFaculties.forEach((universityFaculty) => {
      this.universityFacultyService.terminate(universityFaculty).subscribe(
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

  open(universityFaculty: UniversityFaculty) {
    const modalRef = this.modalService.open(UniversityFacultyUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.universityFaculty = universityFaculty;
  }

  openDetail(universityFaculty: UniversityFaculty) {
    const modalRef = this.modalService.open(UniversityFacultyDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.universityFaculty = universityFaculty;
  }

  clearInput1() {
    this.filter1 = null;
    this.getUniversityFacultys();
  }
}
