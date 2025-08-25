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
import { AuthService } from '../../../services/auth.service';

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
  admin: boolean = false;
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
    private validationService: ValidationService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getAdminValues();
    this.companyUserImageModel.imageOwnName = 'Logo';
  }

  onImageSelected(event: any) {
    this.selectedImage = <File>event.target.files[0];
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
      this.imageNameClear();
      return;
    }

    const allowedImageTypes = [
      'image/png',
      'image/jpeg',
      'image/gif',
      'image/webp',
    ];

    if (!allowedImageTypes.includes(this.selectedImage.type)) {
      this.toastrService.error(
        'Please select a image with .png, .jpeg, webp or .gif extension',
        'Invalid image type'
      );

      this.imageNameClear();
      return;
    }

    if (this.selectedImage.size > 5 * 1024 * 1024) {
      this.toastrService.error(
        'Image size exceeds 5 MB. Please select a smaller image',
        'Image too large'
      );

      this.imageNameClear();
      return;
    }
    if (this.selectedImage.size < 1024) {
      this.toastrService.error(
        'Image size is too small. Please select a larger image',
        'Image too small'
      );

      this.imageNameClear();
      return;
    }

    this.toastrService.success('File selected successfully', 'Success');
    this.imageName = this.selectedImage.name;

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
          this.validationService.handleErrors(responseError);
        }
      );
  }

  add() {
    this.companyUserImageService.add(this.getModel()).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.activeModal.close();
        this.router.navigate([
          '/dashboard/companyuserimage/companyuserimagelisttab',
        ]);
      },
      (responseError) => {
        this.validationService.handleErrors(responseError);
      }
    );
  }

  getModel(): CompanyUserImage {
    return Object.assign({
      id: '',
      userId: this.getUserId(this.companyUserImageModel.email.trim()),
      companyUserId: this.getCompanyUserId(
        this.companyUserImageModel.companyUserName.trim()
      ),
      imagePath: this.imagePath.trim(),
      imageName: this.imageName.trim(),
      imageOwnName: this.companyUserImageModel.imageOwnName.trim(),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  getAdminValues() {
    const id = this.localStorageService.getFromLocalStorage('id');
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.getAllCompanyUsers(response);
        this.getCompanyUsers(response);
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getAllCompanyUsers(adminModel: AdminModel) {
    this.userService.getAllCompanyUserDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        if (this.admin) {
          this.userDTOs = response.data;
        } else {
          this.companyUserImageModel.email = adminModel.email;
          this.companyUserImageModel.userId = adminModel.id;
        }
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getCompanyUsers(adminModel: AdminModel) {
    this.companyUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);

        this.companyUsers = response.data.filter(
          (f) => f.email == this.companyUserImageModel.email
        );
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  setCompanyUserMail(email: string) {
    this.companyUserImageModel.email = email;

    this.getAdminValues();
  }

  getUserId(userEmail: string): string {
    let userId;

    if (this.admin) {
      userId = this.userDTOs.filter((c) => c.email === userEmail)[0]?.id;
    } else {
      userId = this.companyUserImageModel.userId;
    }

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
