import { AdminModel } from '../../../models/auth/adminModel';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import { CompanyUserImageService } from '../../../services/companyUserImage.service';
import { CompanyUserImage } from '../../../models/component/companyUserImage';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { CompanyUserImageDTO } from '../../../models/dto/companyUserImageDTO';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../../services/validation.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-companyUserImageUpdate',
  templateUrl: './companyUserImageUpdate.component.html',
  styleUrls: ['./companyUserImageUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class CompanyUserImageUpdateComponent implements OnInit {
  @Input() companyUserImageDTO: CompanyUserImageDTO;
  selectedImage: File | null = null;
  result: boolean = true;
  admin: boolean = false;
  componentTitle = 'Company User Image Update Form';

  constructor(
    private toastrService: ToastrService,
    private companyUserImageService: CompanyUserImageService,
    private router: Router,
    private localStorageService: LocalStorageService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    setTimeout(() => {
      this.getUserValues(this.companyUserImageDTO.id);
    }, 200);
  }

  checkImage() {
    if (this.companyUserImageDTO.imageName == 'noImage.jpg') {
      this.result = false;
    } else {
      this.result = true;
    }
  }

  getUserValues(id: string) {
    const adminModel = {
      id: id,
      email: this.localStorageService.getFromLocalStorage('email'),
      userId: this.localStorageService.getFromLocalStorage('id'),
      status: this.localStorageService.getFromLocalStorage('status'),
    };

    this.getById(adminModel);
  }

  getById(adminModel: AdminModel) {
    this.companyUserImageService.getById(adminModel).subscribe(
      (response) => {
        this.companyUserImageDTO.imagePath = response.data.imagePath;
        this.companyUserImageDTO.imageName = response.data.imageName;
        this.checkImage();
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  onImageSelected(event: any) {
    this.selectedImage = <File>event.target.files[0];

    const allowedImageTypes = [
      'image/png',
      'image/jpeg',
      'image/gif',
      'image/webp',
    ];

    if (!allowedImageTypes.includes(this.selectedImage.type)) {
      this.toastrService.error(
        'Please select a Image with .png, .jpeg, webp or gif extension',
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
      this.companyUserImageDTO.imageOwnName = this.selectedImage.name;
    }
  }

  deleteImage() {
    this.companyUserImageService.deleteImage(this.getModel()).subscribe(
      (response) => {
        this.result = false;
      },
      (responseError) => this.toastrService.error(responseError.error.message)
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

    this.companyUserImageService
      .uploadImage(formData, this.companyUserImageDTO.companyUserId)
      .subscribe(
        (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round(event.loaded / (event.total * 100));
            console.log(`File is ${percentDone}% uploaded.`);
          } else if (event.type === HttpEventType.Response) {
            this.companyUserImageDTO.imageName = event.body.name;
            this.companyUserImageDTO.imagePath = event.body.type;

            this.update();

            this.toastrService.success(
              'Company User Image Added Successfully',
              'Success'
            );
          }
        },
        (responseError) => {
          this.toastrService.error(responseError.error.message);
          this.toastrService.error('Error uploading image', responseError);
        }
      );
  }

  update() {
    this.companyUserImageService.update(this.getModel()).subscribe(
      (response) => {
        this.activeModal.close();
        this.router.navigate([
          '/dashboard/companyuserimage/companyuserimagelisttab',
        ]);
      },
      (responseError) => {
        this.toastrService.error(responseError.error.message);
      }
    );
  }

  getModel(): CompanyUserImage {
    return Object.assign({
      id: this.companyUserImageDTO.id,
      userId: this.companyUserImageDTO.userId,
      companyUserId: this.companyUserImageDTO.companyUserId,
      imagePath: this.companyUserImageDTO.imagePath,
      imageName: this.companyUserImageDTO.imageName,
      imageOwnName: this.companyUserImageDTO.imageOwnName,
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  imageNameClear() {
    this.companyUserImageDTO.imageName = '';
  }

  imageOwnNameClear() {
    this.companyUserImageDTO.imageOwnName = '';
  }
}
