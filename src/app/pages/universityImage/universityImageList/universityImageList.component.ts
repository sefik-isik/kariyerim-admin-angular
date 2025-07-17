import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { University } from '../../../models/component/university';
import { UniversityImage } from '../../../models/component/universityImage';
import { FilterUniversityImagePipe } from '../../../pipes/filterUniversityImage.pipe';
import { UniversityService } from '../../../services/university.service';
import { UniversityImageService } from '../../../services/universityImage.service';
import { UniversityImageDetailComponent } from '../universityImageDetail/universityImageDetail.component';
import { UniversityImageUpdateComponent } from '../universityImageUpdate/universityImageUpdate.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-universityImageList',
  templateUrl: './universityImageList.component.html',
  styleUrls: ['./universityImageList.component.css'],
  imports: [CommonModule, FormsModule, FilterUniversityImagePipe],
})
export class UniversityImageListComponent implements OnInit {
  universityImages: UniversityImage[] = [];
  universities: University[] = [];
  filter1: string = '';
  componentTitle = 'University Images';
  admin: boolean = false;

  constructor(
    private toastrService: ToastrService,
    private universityImageService: UniversityImageService,
    private universityService: UniversityService,
    private modalService: NgbModal,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getUniversities();
    this.getUniversityImages();

    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getUniversityImages();
      }
    });
  }

  getUniversityImages() {
    this.universityImageService.getAll().subscribe(
      (response) => {
        this.universityImages = response.data.filter(
          (f) => f.universityName != '-'
        );
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  getUniversities() {
    this.universityService.getAll().subscribe(
      (response) => {
        this.universities = response.data.filter(
          (f) => f.universityName != '-'
        );
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  updateMainImage(universityImage: UniversityImage) {
    if (!confirm('Ana Resim Olarak Güncellemek istediğinize emin misiniz?')) {
      this.toastrService.info('Güncelleme İşlemi İptal Edildi');
      return;
    }
    universityImage.isMainImage = true;
    this.universityImageService.update(universityImage).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile güncellendi');
        this.ngOnInit();
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  updateLogoImage(universityImage: UniversityImage) {
    if (!confirm('Logo Olarak Güncellemek istediğinize emin misiniz?')) {
      this.toastrService.info('Güncelleme İşlemi İptal Edildi');
      return;
    }
    universityImage.isLogo = true;
    this.universityImageService.update(universityImage).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile güncellendi');
        this.ngOnInit();
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  delete(universityImage: UniversityImage) {
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.universityImageService.delete(universityImage).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile silindi');
        this.ngOnInit();
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  deleteAll() {
    if (!confirm('Tümünü Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.universityImages.forEach((universityImage) => {
      this.universityImageService.delete(universityImage).subscribe(
        (response) => {},
        (responseError) => this.toastrService.error(responseError.error.message)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
    }, 500);
  }

  open(universityImage: UniversityImage) {
    const modalRef = this.modalService.open(UniversityImageUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.universityImage = universityImage;
  }

  openDetail(universityImage: UniversityImage) {
    const modalRef = this.modalService.open(UniversityImageDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.universityImage = universityImage;
  }

  clearInput1() {
    this.filter1 = null;
    this.getUniversityImages();
  }
}
