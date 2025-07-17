import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ToastrService } from 'ngx-toastr';
import { University } from '../../../models/component/university';
import { UniversityImage } from '../../../models/component/universityImage';
import { FilterUniversityImagePipe } from '../../../pipes/filterUniversityImage.pipe';
import { UniversityImageService } from '../../../services/universityImage.service';
import { UniversityService } from '../../../services/university.service';

@Component({
  selector: 'app-universityImageSlide',
  templateUrl: './universityImageSlide.component.html',
  styleUrls: ['./universityImageSlide.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    FilterUniversityImagePipe,
    CarouselModule,
  ],
})
export class UniversityImageSlideComponent implements OnInit {
  universityImages: UniversityImage[] = [];
  universities: University[] = [];
  filter1: string = '';
  componentTitle = 'University Images';

  constructor(
    private toastrService: ToastrService,
    private universityImageService: UniversityImageService,
    private universityService: UniversityService
  ) {}

  ngOnInit() {
    this.getUniversityImages();
    this.getUniversities();
  }

  getUniversityImages() {
    this.universityImageService.getAll().subscribe(
      (response) => {
        this.universityImages = response.data;
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

  delete(universityImage: UniversityImage) {
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.universityImageService.delete(universityImage).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile silindi');
      },
      (responseError) => {
        this.toastrService.error(responseError.error.message);
        if (responseError.error) {
          this.toastrService.error(responseError.error.message);
        } else {
          this.toastrService.error('Silme işlemi başarısız oldu');
        }
      }
    );
  }

  clearInput1() {
    this.filter1 = null;
    this.getUniversityImages();
  }
}
