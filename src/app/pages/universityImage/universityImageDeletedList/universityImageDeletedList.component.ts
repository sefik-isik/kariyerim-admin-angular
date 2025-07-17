import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { University } from '../../../models/component/university';
import { UniversityImage } from '../../../models/component/universityImage';
import { UniversityService } from '../../../services/university.service';
import { UniversityImageService } from '../../../services/universityImage.service';
import { UniversityImageDetailComponent } from '../universityImageDetail/universityImageDetail.component';
import { UniversityImageUpdateComponent } from '../universityImageUpdate/universityImageUpdate.component';
import { FilterUniversityImagePipe } from '../../../pipes/filterUniversityImage.pipe';

@Component({
  selector: 'app-universityImageDeletedList',
  templateUrl: './universityImageDeletedList.component.html',
  styleUrls: ['./universityImageDeletedList.component.css'],
  imports: [CommonModule, FormsModule, FilterUniversityImagePipe],
})
export class UniversityImageDeletedListComponent implements OnInit {
  universityImages: UniversityImage[] = [];
  universities: University[] = [];
  universityName: string = '';
  filter1: string = '';

  componentTitle = 'University Images';

  constructor(
    private toastrService: ToastrService,
    private universityImageService: UniversityImageService,
    private universityService: UniversityService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getUniversityImages();
    this.getUniversities();

    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getUniversityImages();
      }
    });
  }

  getUniversityImages() {
    this.universityImageService.getDeletedAll().subscribe(
      (response) => {
        this.universityImages = response.data;
        this.universityName = this.getUniversityNameByUniversityId(
          response.data[0]?.universityId || ''
        );
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  getUniversities() {
    this.universityService.getAll().subscribe(
      (response) => {
        this.universities = response.data;
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  getUniversityNameByUniversityId(universityId: string): string {
    const universityName = this.universities.find((u) => u.id === universityId);
    return universityName ? universityName.universityName : 'No Image';
  }

  unDelete(universityImage: UniversityImage) {
    this.universityImageService.update(universityImage).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile geri alındı');
        this.ngOnInit();
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  unDeleteAll() {
    this.universityImages.forEach((universityImage) => {
      this.universityImageService.update(universityImage).subscribe(
        (response) => {},
        (responseError) => this.toastrService.error(responseError.error.message)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  terminate(universityImage: UniversityImage) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.universityImageService.terminate(universityImage).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile kalıcı olarak silindi');
        this.ngOnInit();
      },
      (responseError) => console.log(responseError)
    );
  }

  terminateAll() {
    if (!confirm('Tümünü Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.universityImages.forEach((universityImage) => {
      this.universityImageService.terminate(universityImage).subscribe(
        (response) => {},
        (responseError) => this.toastrService.error(responseError.error.message)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile kalıcı olarak silindi');
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

  clear1Input1() {
    this.filter1 = null;
    this.getUniversityImages();
  }
}
