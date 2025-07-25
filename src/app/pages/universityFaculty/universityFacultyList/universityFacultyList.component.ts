import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { ValidationService } from '../../../services/validation.service';
import { UniversityFaculty } from '../../../models/component/universityFaculty';
import { UniversityFacultyService } from '../../../services/universityFaculty.service';
import { FilterUniversityFacultyPipe } from '../../../pipes/filterUniversityFaculty.pipe';
import { UniversityFacultyUpdateComponent } from '../universityFacultyUpdate/universityFacultyUpdate.component';
import { UniversityFacultyDetailComponent } from '../universityFacultyDetail/universityFacultyDetail.component';

@Component({
  selector: 'app-universityFacultyList',
  templateUrl: './universityFacultyList.component.html',
  styleUrls: ['./universityFacultyList.component.css'],
  imports: [CommonModule, FormsModule, FilterUniversityFacultyPipe],
})
export class UniversityFacultyListComponent implements OnInit {
  universityFaculties: UniversityFaculty[] = [];
  admin: boolean = false;
  componentTitle = 'Sectors';
  filter1: string;

  constructor(
    private toastrService: ToastrService,
    private authService: AuthService,
    private universityFacultyService: UniversityFacultyService,
    private modalService: NgbModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getUniversityFaculties();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getUniversityFaculties();
      }
    });
  }

  getUniversityFaculties() {
    this.universityFacultyService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.universityFaculties = response.data.filter(
          (f) => f.facultyName != '-'
        );
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  delete(universityFaculty: UniversityFaculty) {
    if (!this.authService.isAdmin()) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.universityFacultyService.delete(universityFaculty).subscribe(
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
    this.universityFaculties.forEach((universityFaculty) => {
      this.universityFacultyService.delete(universityFaculty).subscribe(
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
    this.getUniversityFaculties();
  }
}
