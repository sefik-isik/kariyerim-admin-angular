import { CommonModule } from '@angular/common';
import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { University } from '../../../models/component/university';
import { UniversityImage } from '../../../models/component/universityImage';
import { UserDTO } from '../../../models/dto/userDTO';
import { UniversityService } from '../../../services/university.service';
import { UniversityImageService } from '../../../services/universityImage.service';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-universityImageAdd',
  templateUrl: './universityImageAdd.component.html',
  styleUrls: ['./universityImageAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class UniversityImageAddComponent implements OnInit {
  universityImageModel: UniversityImage = {} as UniversityImage;
  selectedImage: File | null = null;
  imagePath: string | null = null;
  imageName: string | null = null;
  imageOwnName: string | null = null;
  universities: University[] = [];
  userDTOs: UserDTO[] = [];
  componentTitle = 'University Image Add Form';

  constructor(
    private toastrService: ToastrService,
    private universityImageService: UniversityImageService,
    private router: Router,
    private universityService: UniversityService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}
  ngOnInit() {
    this.getUniversities();
  }

  onImageSelected(event: any) {
    this.selectedImage = <File>event.target.files[0];

    const allowedImageTypes = ['image/png', 'image/jpeg', 'image/gif'];

    if (!allowedImageTypes.includes(this.selectedImage.type)) {
      this.toastrService.error(
        'Please select a image with .png, .jpeg, or .gif extension',
        'Invalid image type'
      );
    } else if (this.selectedImage.size > 5 * 1024 * 1024) {
      this.toastrService.error(
        'Image size exceeds 5 MB. Please select a smaller image',
        'Image too large'
      );
    } else if (this.selectedImage.size < 1024) {
      this.toastrService.error(
        'Image size is too small. Please select a larger image',
        'Image too small'
      );
    } else {
      this.toastrService.success('File selected successfully', 'Success');
      this.imageName = this.selectedImage.name;
    }
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (!this.selectedImage) {
      this.toastrService.error(
        'Please select a image to upload',
        'No image selected'
      );
      return;
    }

    if (!form.valid) {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedImage, this.selectedImage.name);

    this.universityImageService
      .uploadImage(
        formData,
        this.getUniversityId(this.universityImageModel.universityName)
      )
      .subscribe(
        (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round(event.loaded / (event.total * 100));
            console.log(`Image is ${percentDone}% uploaded.`);
          } else if (event.type === HttpEventType.Response) {
            this.imageName = event.body.name;
            this.imagePath = event.body.type;

            this.add();

            this.toastrService.success(
              'Company User Image Added Successfully',
              'Success'
            );
          }
        },
        (responseError) => {
          this.toastrService.error(responseError.error.message);
        }
      );
  }

  add() {
    this.universityImageService.add(this.getModel()).subscribe(
      (response) => {
        this.activeModal.close();
        this.router.navigate([
          '/dashboard/universityimage/universityimagelisttab',
        ]);
      },
      (responseError) => {
        this.toastrService.error(responseError.error.message);
      }
    );
  }

  getModel(): UniversityImage {
    return Object.assign({
      id: '',
      universityId: this.getUniversityId(
        this.universityImageModel.universityName.trim()
      ),
      imagePath: this.imagePath.trim(),
      imageName: this.imageName.trim(),
      imageOwnName: this.universityImageModel.imageOwnName.trim(),
      createDate: new Date(Date.now()).toJSON(),
    });
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

  getUserId(userEmail: string): string {
    const userId = this.userDTOs.filter((c) => c.email === userEmail)[0]?.id;

    return userId;
  }

  getUniversityId(universityName: string): string {
    const companyId = this.universities.filter(
      (c) => c.universityName === universityName
    )[0]?.id;

    return companyId;
  }

  universityNameClear() {
    this.universityImageModel.universityName = '';
  }

  imageOwnNameClear() {
    this.universityImageModel.imageOwnName = '';
  }

  imageNameClear() {
    this.universityImageModel.imageName = '';
  }
}
