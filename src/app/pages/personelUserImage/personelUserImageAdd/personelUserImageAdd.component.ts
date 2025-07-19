import { CommonModule } from '@angular/common';
import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminModel } from '../../../models/auth/adminModel';
import { PersonelUser } from '../../../models/component/personelUser';
import { PersonelUserImage } from '../../../models/component/personelUserImage';
import { PersonelUserImageDTO } from '../../../models/dto/personelUserImageDTO';
import { UserDTO } from '../../../models/dto/userDTO';
import { AuthService } from '../../../services/auth.service';
import { AdminService } from '../../../services/helperServices/admin.service';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { PersonelUserService } from '../../../services/personelUser.service';
import { PersonelUserImageService } from '../../../services/personelUserImage.service';
import { UserService } from '../../../services/user.service';
import { ValidationService } from '../../../services/validation.service';

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
  personelUsers: PersonelUser[] = [];
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
        this.validationService.handleSuccesses(response);
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
        this.validationService.handleSuccesses(response);
        this.getAllPersonelUsers(response);
        this.getPersonelUsers(response);
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getAllPersonelUsers(adminModel: AdminModel) {
    this.userService.getAllPersonelUserDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        if (this.admin) {
          this.userDTOs = response.data;
        } else {
          this.personelUserImageModel.email = adminModel.email;
          this.personelUserImageModel.userId = adminModel.id;
        }
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getPersonelUsers(adminModel: AdminModel) {
    const userId = this.getUserId(this.personelUserImageModel.email);
    this.personelUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.personelUsers = response.data;
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
    const personelUserId = this.personelUsers.filter(
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
