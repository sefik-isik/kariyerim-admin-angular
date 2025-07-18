import { CommonModule } from '@angular/common';
import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UniversityImage } from '../../../models/component/universityImage';
import { UniversityImageService } from '../../../services/universityImage.service';
import { ValidationService } from '../../../services/validation.service';
import { UniversityService } from './../../../services/university.service';

@Component({
  selector: 'app-universityImageUpdate',
  templateUrl: './universityImageUpdate.component.html',
  styleUrls: ['./universityImageUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class UniversityImageUpdateComponent implements OnInit {
  @Input() universityImage: UniversityImage;
  selectedImage: File | null = null;
  result: boolean = true;
  universityName: string;
  componentTitle = 'University Image Update Form';

  constructor(
    private toastrService: ToastrService,
    private universityImageService: UniversityImageService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService,
    private universityService: UniversityService
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.getById(this.universityImage.id);
    }, 200);
  }

  checkImage() {
    if (this.universityImage.imageName == 'noImage.jpg') {
      this.result = false;
    } else {
      this.result = true;
    }
  }

  getById(id: string) {
    this.universityImageService.getById(id).subscribe(
      (response) => {
        this.universityImage.universityId = response.data.universityId;
        this.getUniversityName(this.universityImage.universityId);
        this.universityImage.imagePath = response.data.imagePath;
        this.universityImage.imageName = response.data.imageName;
        this.checkImage();
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getUniversityName(universityId: string) {
    return this.universityService.getById(universityId).subscribe(
      (response) => {
        this.universityName = response.data.universityName;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  onImageSelected(event: any) {
    this.selectedImage = <File>event.target.files[0];

    const allowedImageTypes = ['image/png', 'image/jpeg', 'image/gif'];

    if (!allowedImageTypes.includes(this.selectedImage.type)) {
      this.toastrService.error(
        'Please select a Image with .png, .jpeg, gif extension',
        'Invalid Image type'
      );
    } else if (this.selectedImage.size > 5 * 1024 * 1024) {
      this.toastrService.error(
        'Image size exceeds 5 MB. Please select a smaller Image',
        'Image too large'
      );
    } else if (this.selectedImage.size < 1024) {
      this.toastrService.error(
        'Image size is too small. Please select a larger image',
        'Image too small'
      );
    } else {
      this.toastrService.success('Image selected successfully', 'Success');
      this.universityImage.imageOwnName = this.selectedImage.name;
    }
  }

  deleteImage() {
    this.universityImageService.deleteImage(this.getModel()).subscribe(
      (response) => {
        this.result = false;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
      return;
    }

    if (!this.selectedImage) {
      this.toastrService.error(
        'Please select a image to upload',
        'No image selected'
      );
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedImage, this.selectedImage.name);

    this.universityImageService
      .uploadImage(formData, this.universityImage.universityId)
      .subscribe(
        (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round(event.loaded / (event.total * 100));
            console.log(`File is ${percentDone}% uploaded.`);
          } else if (event.type === HttpEventType.Response) {
            this.universityImage.imageName = event.body.name;
            this.universityImage.imagePath = event.body.type;

            this.update();

            this.toastrService.success(
              'Company User Image Added Successfully',
              'Success'
            );
          }
        },
        (responseError) => {
          this.validationService.handleErrors(responseError);
          this.toastrService.error('Error uploading image', responseError);
        }
      );
  }

  update() {
    this.universityImageService.update(this.getModel()).subscribe(
      (response) => {
        this.activeModal.close();
        this.router.navigate([
          '/dashboard/universityimage/universityimagelisttab',
        ]);
      },
      (responseError) => {
        this.validationService.handleErrors(responseError);
      }
    );
  }

  getModel(): UniversityImage {
    return Object.assign({
      id: this.universityImage.id,
      universityId: this.universityImage.universityId,
      imagePath: this.universityImage.imagePath.trim(),
      imageName: this.universityImage.imageName.trim(),
      imageOwnName: this.universityImage.imageOwnName.trim(),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  imageNameClear() {
    this.universityImage.imageName = '';
  }

  imageOwnNameClear() {
    this.universityImage.imageOwnName = '';
  }
}
