import { AdminModel } from '../../../models/auth/adminModel';
import { AdminService } from '../../../services/helperServices/admin.service';
import { PersonelUserService } from './../../../services/personelUser.service';
import { Component, Input, OnInit } from '@angular/core';

import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
  NgForm,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PersonelUserDTO } from '../../../models/dto/personelUserDTO';
import { UserDTO } from '../../../models/dto/userDTO';
import { UserService } from '../../../services/user.service';
import { HttpEventType } from '@angular/common/http';
import { PersonelUserImageService } from '../../../services/personelUserImage.service';
import { PersonelUserImage } from '../../../models/component/personelUserImage';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { PersonelUserImageDTO } from '../../../models/dto/personelUserImageDTO';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-personelUserImageUpdate',
  templateUrl: './personelUserImageUpdate.component.html',
  styleUrls: ['./personelUserImageUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class PersonelUserImageUpdateComponent implements OnInit {
  @Input() personelUserImageDTO: PersonelUserImageDTO;
  selectedImage: File | null = null;
  result: boolean = true;
  users: UserDTO[] = [];
  personelUsers: PersonelUserDTO[] = [];
  componentTitle = 'Personel User Image Update Form';

  constructor(
    private toastrService: ToastrService,
    private personelUserImageService: PersonelUserImageService,
    private router: Router,
    private personelUserService: PersonelUserService,
    private adminService: AdminService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.getAdminValues();

    setTimeout(() => {
      this.getUserValues(this.personelUserImageDTO.id);
    }, 200);
  }

  checkImage() {
    if (this.personelUserImageDTO.imageName == 'noImage.jpg') {
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
    this.result = false;
    this.personelUserImageService.getById(adminModel).subscribe(
      (response) => {
        this.personelUserImageDTO.id = response.data.id;
        this.personelUserImageDTO.userId = response.data.userId;
        this.personelUserImageDTO.personelUserId = response.data.personelUserId;
        this.personelUserImageDTO.imagePath = response.data.imagePath;
        this.personelUserImageDTO.imageName = response.data.imageName;

        this.result = true;

        this.checkImage();
      },
      (responseError) => console.error
    );
  }

  onImageSelected(event: any) {
    this.selectedImage = <File>event.target.files[0];

    const allowedImageTypes = ['image/png', 'image/jpeg', 'image/gif'];

    if (!allowedImageTypes.includes(this.selectedImage.type)) {
      this.toastrService.error(
        'Please select a file with .doc, .docx, rar, zip or .pdf extension',
        'Invalid file type'
      );
    } else if (this.selectedImage.size > 5 * 1024 * 1024) {
      this.toastrService.error(
        'File size exceeds 5 MB. Please select a smaller file',
        'File too large'
      );
    } else if (this.selectedImage.size < 1024) {
      this.toastrService.error(
        'File size is too small. Please select a larger file',
        'File too small'
      );
    } else {
      this.toastrService.success('File selected successfully', 'Success');
      this.personelUserImageDTO.imageOwnName = this.selectedImage.name;
    }
  }

  deleteImage() {
    this.personelUserImageService.deleteImage(this.getModel()).subscribe(
      (response) => {
        this.result = false;
      },
      (responseError) => console.error
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

    this.personelUserImageService
      .uploadImage(formData, this.personelUserImageDTO.personelUserId)
      .subscribe(
        (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round(event.loaded / (event.total * 100));
            console.log(`File is ${percentDone}% uploaded.`);
          } else if (event.type === HttpEventType.Response) {
            this.personelUserImageDTO.imageName = event.body.name;
            this.personelUserImageDTO.imagePath = event.body.type;

            this.update();

            this.toastrService.success(
              'Personel User Image Added Successfully',
              'Success'
            );
          }
        },
        (responseError) => {
          console.error;
          this.toastrService.error('Error uploading image', responseError);
        }
      );
  }

  update() {
    this.personelUserImageService.update(this.getModel()).subscribe(
      (response) => {
        this.activeModal.close();
        this.router.navigate([
          '/dashboard/personeluserimage/personeluserimagelisttab',
        ]);
      },
      (responseError) => {
        this.toastrService.error(responseError.error.message);
      }
    );
  }

  getModel(): PersonelUserImage {
    return Object.assign({
      id: this.personelUserImageDTO.id,
      userId: this.personelUserImageDTO.userId,
      personelUserId: this.personelUserImageDTO.personelUserId,
      imagePath: this.personelUserImageDTO.imagePath,
      imageName: this.personelUserImageDTO.imageName,
      imageOwnName: this.personelUserImageDTO.imageOwnName,
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  getAdminValues() {
    this.adminService.getAdminValues(this.personelUserImageDTO.id).subscribe(
      (response) => {
        this.getUsers(response);
        this.getPersonelUsers(response);
      },
      (responseError) => console.error
    );
  }

  getUsers(adminModel: AdminModel) {
    this.userService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.users = response.data;
      },
      (responseError) => console.error
    );
  }

  getPersonelUsers(adminModel: AdminModel) {
    this.personelUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.personelUsers = response.data;
      },
      (responseError) => console.error
    );
  }

  getUserId(userEmail: string): string {
    const userId = this.users.filter((c) => c.email === userEmail)[0]?.id;

    return userId;
  }

  imageOwnNameClear() {
    this.personelUserImageDTO.imageOwnName = '';
  }

  imageNameClear() {
    this.personelUserImageDTO.imageName = '';
  }
}
