import { FilterFacultyPipe } from '../../../pipes/filterFaculty.pipe';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Faculty } from '../../../models/component/faculty';
import { FacultyService } from '../../../services/faculty.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FacultyUpdateComponent } from '../facultyUpdate/facultyUpdate.component';
import { FacultyDetailComponent } from '../facultyDetail/facultyDetail.component';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-facultyDeletedList',
  templateUrl: './facultyDeletedList.component.html',
  styleUrls: ['./facultyDeletedList.component.css'],
  imports: [CommonModule, FormsModule, FilterFacultyPipe],
})
export class FacultyDeletedListComponent implements OnInit {
  faculties: Faculty[] = [];
  componentTitle = 'Faculties Deleted List';
  filter1: string;

  constructor(
    private toastrService: ToastrService,
    private facultyService: FacultyService,
    private modalService: NgbModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.getFaculties();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getFaculties();
      }
    });
  }

  getFaculties() {
    this.facultyService.getDeletedAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.faculties = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDelete(faculty: Faculty) {
    this.facultyService.update(faculty).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDeleteAll() {
    this.faculties.forEach((faculty) => {
      this.facultyService.update(faculty).subscribe(
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

  terminate(faculty: Faculty) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.facultyService.terminate(faculty).subscribe(
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

    this.faculties.forEach((faculty) => {
      this.facultyService.terminate(faculty).subscribe(
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

  open(faculty: Faculty) {
    const modalRef = this.modalService.open(FacultyUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.faculty = faculty;
  }

  openDetail(faculty: Faculty) {
    const modalRef = this.modalService.open(FacultyDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.faculty = faculty;
  }

  clearInput1() {
    this.filter1 = null;
    this.getFaculties();
  }
}
