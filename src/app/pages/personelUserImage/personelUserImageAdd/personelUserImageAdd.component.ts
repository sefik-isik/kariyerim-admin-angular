import { AdminModel } from '../../../models/auth/adminModel';
import { AdminService } from '../../../services/helperServices/admin.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  Validators,
  FormBuilder,
  NgForm,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { PersonelUserService } from '../../../services/personelUser.service';
import { PersonelUserDTO } from '../../../models/dto/personelUserDTO';
import { UserDTO } from '../../../models/dto/userDTO';
import { UserService } from '../../../services/user.service';
import { PersonelUserImageService } from '../../../services/personelUserImage.service';
import { PersonelUserImage } from '../../../models/component/personelUserImage';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonelUserImageDTO } from '../../../models/dto/personelUserImageDTO';
import { ValidationService } from '../../../services/validation.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-personelUserImageAdd',
  templateUrl: './personelUserImageAdd.component.html',
  styleUrls: ['./personelUserImageAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class PersonelUserImageAddComponent implements OnInit {
  personelUserImageModel: PersonelUserImageDTO = {} as PersonelUserImageDTO;
  selectedImage: File | null = null;
  imagePath: string | null = null;
  imageName: string | null = null;
  imageOwnName: string | null = null;
  personelUserDTOs: PersonelUserDTO[] = [];
  userDTOs: UserDTO[] = [];
  admin: boolean = false;
  componentTitle = 'Personel User Image Add Form';

  constructor(
    private toastrService: ToastrService,
    private personelUserImageService: PersonelUserImageService,
    private router: Router,
    private personelUserService: PersonelUserService,
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

    this.personelUserImageService
      .uploadImage(
        formData,
        this.getPersonelUserId(this.personelUserImageModel.email)
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
              'Personel User Image Added Successfully',
              'Success'
            );
          }
        },
        (responseError) => {
          this.validationService.handleErrors(responseError);
          this.toastrService.error('Error uploading file', responseError);
        }
      );
  }

  add() {
    this.personelUserImageService.add(this.getModel()).subscribe(
      (response) => {
        this.activeModal.close();
        this.router.navigate([
          '/dashboard/personeluserimage/personeluserimagelisttab',
        ]);
      },
      (responseError) => {
        this.validationService.handleErrors(responseError);
      }
    );
  }

  getModel(): PersonelUserImage {
    return Object.assign({
      id: '',
      userId: this.getUserId(this.personelUserImageModel.email.trim()),
      personelUserId: this.getPersonelUserId(
        this.personelUserImageModel.email.trim()
      ),
      imagePath: this.imagePath.trim(),
      imageName: this.imageName.trim(),
      imageOwnName: this.personelUserImageModel.imageOwnName.trim(),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  getAdminValues() {
    const id = this.localStorageService.getFromLocalStorage('id');
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.getAllPersonelUsers(response);
        this.getPersonelUsers(response);
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getAllPersonelUsers(adminModel: AdminModel) {
    this.userService.getAllPersonelUserDTO(adminModel).subscribe(
      (response) => {
        if (this.admin) {
          this.userDTOs = response.data;
        } else {
          this.personelUserImageModel.email =
            this.localStorageService.getFromLocalStorage('email');
          this.personelUserImageModel.userId =
            this.localStorageService.getFromLocalStorage('id');
        }
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getPersonelUsers(adminModel: AdminModel) {
    const userId = this.getUserId(this.personelUserImageModel.email);
    this.personelUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.personelUserDTOs = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getUserId(userEmail: string): string {
    let userId;

    if (this.admin) {
      userId = this.userDTOs.filter((c) => c.email === userEmail)[0]?.id;
    } else {
      userId = this.personelUserImageModel.userId;
    }

    return userId;
  }

  getPersonelUserId(userEmail: string): string {
    const personelUserId = this.personelUserDTOs.filter(
      (c) => c.email === userEmail
    )[0]?.id;

    return personelUserId;
  }

  emailClear() {
    this.personelUserImageModel.email = '';
  }

  firstNameClear() {
    this.personelUserImageModel.firstName = '';
  }

  imageOwnNameClear() {
    this.personelUserImageModel.imageOwnName = '';
  }

  imageNameClear() {
    this.personelUserImageModel.imageName = '';
  }
}
