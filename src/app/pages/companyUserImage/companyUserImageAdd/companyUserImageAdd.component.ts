import { AdminModel } from '../../../models/auth/adminModel';
import { AdminService } from '../../../services/helperServices/admin.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { CompanyUserService } from '../../../services/companyUser.service';
import { CompanyUserDTO } from '../../../models/dto/companyUserDTO';
import { UserDTO } from '../../../models/dto/userDTO';
import { UserService } from '../../../services/user.service';
import { CompanyUserImageService } from '../../../services/companyUserImage.service';
import { CompanyUserImage } from '../../../models/component/companyUserImage';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyUserImageDTO } from '../../../models/dto/companyUserImageDTO';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-companyUserImageAdd',
  templateUrl: './companyUserImageAdd.component.html',
  styleUrls: ['./companyUserImageAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class CompanyUserImageAddComponent implements OnInit {
  companyUserImageModel: CompanyUserImageDTO = {} as CompanyUserImageDTO;
  selectedImage: File | null = null;
  imagePath: string | null = null;
  imageName: string | null = null;
  imageOwnName: string | null = null;
  companyUsers: CompanyUserDTO[] = [];
  userDTOs: UserDTO[] = [];
  componentTitle = 'Company User Image Add Form';

  constructor(
    private toastrService: ToastrService,
    private companyUserImageService: CompanyUserImageService,
    private router: Router,
    private companyUserService: CompanyUserService,
    private adminService: AdminService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}
  ngOnInit() {
    this.getAdminValues();
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

    this.companyUserImageService
      .uploadImage(
        formData,
        this.getCompanyUserId(this.companyUserImageModel.companyUserName)
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
          console.error;
        }
      );
  }

  add() {
    this.companyUserImageService.add(this.getModel()).subscribe(
      (response) => {
        this.activeModal.close();
        this.router.navigate([
          '/dashboard/companyuserimage/companyuserimagelisttab',
        ]);
      },
      (responseError) => {
        console.log(responseError);
      }
    );
  }

  getModel(): CompanyUserImage {
    return Object.assign({
      id: '',
      userId: this.getUserId(this.companyUserImageModel.email),
      companyUserId: this.getCompanyUserId(
        this.companyUserImageModel.companyUserName
      ),
      imagePath: this.imagePath,
      imageName: this.imageName,
      imageOwnName: this.companyUserImageModel.imageOwnName,
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  getAdminValues() {
    const id = this.localStorageService.getFromLocalStorage('id');
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.getAllCompanyUsers(response);
        this.getCompanyUsers(response);
      },
      (responseError) => console.error
    );
  }

  getAllCompanyUsers(adminModel: AdminModel) {
    this.userService.getAllCompanyUserDTO(adminModel).subscribe(
      (response) => {
        this.userDTOs = response.data;
      },
      (responseError) => console.error
    );
  }

  getCompanyUsers(adminModel: AdminModel) {
    const userId = this.getUserId(this.companyUserImageModel.email);
    this.companyUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.companyUsers = response.data;
      },
      (responseError) => console.error
    );
  }

  getUserId(userEmail: string): string {
    const userId = this.userDTOs.filter((c) => c.email === userEmail)[0]?.id;

    return userId;
  }

  getCompanyUserId(companyUserName: string): string {
    const companyId = this.companyUsers.filter(
      (c) => c.companyUserName === companyUserName
    )[0]?.id;

    return companyId;
  }

  emailClear() {
    this.companyUserImageModel.email = '';
  }

  companyUserNameClear() {
    this.companyUserImageModel.companyUserName = '';
  }

  imageOwnNameClear() {
    this.companyUserImageModel.imageOwnName = '';
  }

  imageNameClear() {
    this.companyUserImageModel.imageName = '';
  }
}
