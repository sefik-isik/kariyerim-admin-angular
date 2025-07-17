import { FacultyService } from '../../../services/faculty.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { Faculty } from '../../../models/component/faculty';
import { FilterFacultyPipe } from '../../../pipes/filterFaculty.pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FacultyUpdateComponent } from '../facultyUpdate/facultyUpdate.component';
import { FacultyDetailComponent } from '../facultyDetail/facultyDetail.component';

@Component({
  selector: 'app-facultyList',
  templateUrl: './facultyList.component.html',
  styleUrls: ['./facultyList.component.css'],
  imports: [CommonModule, FormsModule, FilterFacultyPipe],
})
export class FacultyListComponent implements OnInit {
  faculties: Faculty[] = [];
  componentTitle = 'Faculties';
  filter1: string;
  admin: boolean = false;

  constructor(
    private toastrService: ToastrService,
    private authService: AuthService,
    private facultyService: FacultyService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getFaculties();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getFaculties();
      }
    });
  }

  getFaculties() {
    this.facultyService.getAll().subscribe(
      (response) => {
        this.faculties = response.data.filter((f) => f.facultyName != '-');
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  delete(faculty: Faculty) {
    if (!this.authService.isAdmin()) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.facultyService.delete(faculty).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile silindi');
      },
      (responseError) => this.toastrService.error(responseError.error.message)
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
    this.faculties.forEach((faculty) => {
      this.facultyService.delete(faculty).subscribe(
        (response) => {},
        (responseError) => this.toastrService.error(responseError.error.message)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
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
