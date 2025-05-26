import { AdminModel } from './../../../models/adminModel';
import { AdminService } from './../../../services/admin.service';
import { PersonelUserService } from './../../../services/personelUser.service';
import { Component, Input, OnInit } from '@angular/core';

import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PersonelUserDTO } from '../../../models/personelUserDTO';
import { UserDTO } from '../../../models/userDTO';
import { UserService } from '../../../services/user.service';
import { HttpEventType } from '@angular/common/http';
import { PersonelUserImageService } from '../../../services/personelUserImage.service';
import { PersonelUserImage } from '../../../models/personelUserImage';
import { LocalStorageService } from '../../../services/localStorage.service';
import { PersonelUserImageDTO } from '../../../models/personelUserImageDTO';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-personelUserImageUpdate',
  templateUrl: './personelUserImageUpdate.component.html',
  styleUrls: ['./personelUserImageUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class PersonelUserImageUpdateComponent implements OnInit {
  updateForm: FormGroup;
  @Input() personelUserImageDTO: PersonelUserImageDTO;
  componentTitle = 'Personel User Image Update Form';
  selectedImage: File | null = null;
  imagePath: string | null = null;
  imageName: string | null = null;
  imageOwnName: string | null = null;
  users: UserDTO[] = [];
  personelUserDTOs: PersonelUserDTO[] = [];
  personelUserId: number;
  personelUserName: string;
  userEmail: string;
  userId: number;
  id: number;
  result: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,

    private personelUserImageService: PersonelUserImageService,
    private router: Router,
    private personelUserService: PersonelUserService,
    private adminService: AdminService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.getAdminValues();
    this.createcUpdateForm();

    setTimeout(() => {
      this.getUserValues(this.personelUserImageDTO.id);
    }, 200);
  }

  checkImage(imageName: string) {
    if (this.imageName == 'noImage.jpg') {
      this.result = false;
    } else {
      this.result = true;
    }
  }

  createcUpdateForm() {
    this.updateForm = this.formBuilder.group({
      image: ['', [Validators.required, Validators.minLength(3)]],
      imageOwnName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  getUserValues(id: number) {
    const adminModel = {
      id: id,
      email: this.localStorageService.getFromLocalStorage('email'),
      userId: parseInt(this.localStorageService.getFromLocalStorage('id')),
      status: this.localStorageService.getFromLocalStorage('status'),
    };
    this.getById(adminModel);
  }

  getById(adminModel: AdminModel) {
    this.result = false;
    this.personelUserImageService.getById(adminModel).subscribe(
      (response) => {
        this.id = response.data.id;
        this.userId = response.data.userId;
        this.userEmail = this.getEmailByUserId(response.data.userId);
        this.personelUserId = response.data.personelUserId;
        this.personelUserName = this.getPersonelUserById(this.personelUserId);
        this.imagePath = response.data.imagePath;
        this.imageName = response.data.imageName;

        this.result = true;

        this.checkImage(this.imageName);
      },
      (error) => console.error
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
      this.imageName = this.selectedImage.name;
    }
  }

  deleteImage() {
    this.personelUserImageService.deleteImage(this.getModel()).subscribe(
      (response) => {
        this.result = false;
      },
      (error) => console.error
    );
  }

  onUpload() {
    if (!this.selectedImage) {
      this.toastrService.error(
        'Please select a image to upload',
        'No image selected'
      );
      return;
    }

    if (!this.updateForm.valid) {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
      return;
    }
    const formData = new FormData();
    formData.append('image', this.selectedImage, this.selectedImage.name);
    formData.append('personelUserId', this.personelUserId.toString());

    this.personelUserImageService
      .uploadImage(formData, this.personelUserId)
      .subscribe(
        (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round(event.loaded / (event.total * 100));
            console.log(`File is ${percentDone}% uploaded.`);
          } else if (event.type === HttpEventType.Response) {
            this.imageName = event.body.name;
            this.imagePath = event.body.type;

            this.update();

            this.toastrService.success(
              'Personel User Image Added Successfully',
              'Success'
            );
          }
        },
        (error) => {
          console.error;
          this.toastrService.error('Error uploading image', error);
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
      (error) => {
        this.toastrService.error(error.error.message);
      }
    );
  }

  getModel(): PersonelUserImage {
    return Object.assign({
      id: this.id,
      personelUserId: this.personelUserId,
      imagePath: this.imagePath,
      imageName: this.imageName,
      imageOwnName: this.updateForm.value.imageOwnName,
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  getAdminValues() {
    this.adminService.getAdminValues(this.id).subscribe(
      (response) => {
        this.getUsers(response);
        this.getPersonelUsers(response);
      },
      (error) => console.error
    );
  }

  getUsers(adminModel: AdminModel) {
    this.userService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.users = response.data;
      },
      (error) => console.error
    );
  }

  getPersonelUsers(adminModel: AdminModel) {
    this.personelUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.personelUserDTOs = response.data;
      },
      (error) => console.error
    );
  }

  getUserId(userEmail: string): number {
    const userId = this.users.filter((c) => c.email === userEmail)[0]?.id;

    return userId;
  }

  getEmailByUserId(userId: number): string {
    return this.users.find((u) => u.id == userId)?.email;
  }

  getPersonelUserById(personelUserId: number): string {
    return this.personelUserDTOs.find((c) => c.id == personelUserId)?.email;
  }

  clearInput1() {
    let value = this.updateForm.get('image');
    value.reset();
  }

  clearInput2() {
    let value = this.updateForm.get('imageOwnName');
    value.reset();
  }
}
