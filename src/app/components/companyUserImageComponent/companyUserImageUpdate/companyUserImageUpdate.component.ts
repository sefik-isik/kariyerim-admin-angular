import { CompanyUserService } from './../../../services/companyUser.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
import { LocalStorageService } from '../../../services/localStorage.service';
import { CompanyUserDTO } from '../../../models/companyUserDTO';
import { UserDTO } from '../../../models/userDTO';
import { UserService } from '../../../services/user.service';
import { HttpEventType } from '@angular/common/http';

import { CompanyUserImageService } from '../../../services/companyUserImage.service';
import { CompanyUserImage } from '../../../models/companyUserImage';
import { CompanyUserCode } from '../../../models/userCodes';

@Component({
  selector: 'app-companyUserImageUpdate',
  templateUrl: './companyUserImageUpdate.component.html',
  styleUrls: ['./companyUserImageUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class CompanyUserImageUpdateComponent implements OnInit {
  updateForm: FormGroup;
  componentTitle = 'Company User Image Update Form';
  selectedImage: File | null = null;
  imagePath: string | null = null;
  imageName: string | null = null;
  users: UserDTO[] = [];
  companyUsers: CompanyUserDTO[] = [];
  companyUserId: number;
  companyUserName: string;
  userEmail: string;
  userId: number;
  id: number;
  result: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private companyUserImageService: CompanyUserImageService,
    private router: Router,
    private companyUserService: CompanyUserService,
    private localStorageService: LocalStorageService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getUsers();
    this.getCompanyUsers();
    this.createcUpdateForm();

    this.activatedRoute.params.subscribe((params) => {
      this.getById(params['companyuserimageId']);
    });

    //setTimeout(() => {}, 500);
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
    });
  }

  getById(id: number) {
    this.result = false;
    this.companyUserImageService.getById(id).subscribe(
      (response) => {
        this.id = response.data.id;
        this.userId = response.data.userId;
        this.userEmail = this.getEmailByUserId(response.data.userId);
        this.companyUserId = response.data.companyUserId;
        this.companyUserName = this.getCompanyUserById(this.companyUserId);
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
    this.companyUserImageService.deleteImage(this.getModel()).subscribe(
      (response) => {
        this.result = false;
      },
      (error) => console.log(error)
    );
  }

  onUpload() {
    if (this.selectedImage) {
      const formData = new FormData();
      formData.append('image', this.selectedImage, this.selectedImage.name);
      formData.append('companyUserId', this.companyUserId.toString());
      formData.append('userId', this.userId.toString());

      this.companyUserImageService
        .uploadImage(formData, this.companyUserId)
        .subscribe(
          (event) => {
            if (event.type === HttpEventType.UploadProgress) {
              const percentDone = Math.round(
                event.loaded / (event.total * 100)
              );
              console.log(`File is ${percentDone}% uploaded.`);
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
          (error) => {
            console.log(error);
            this.toastrService.error('Error uploading image', error);
          }
        );
    } else {
      this.toastrService.error(
        'Please select a image to upload',
        'No image selected'
      );
    }
  }

  add() {
    this.companyUserImageService.update(this.getModel()).subscribe(
      (response) => {
        this.router.navigate(['/dashboard/companyuserimages']);
      },
      (error) => {
        this.toastrService.error(error.error.message);
      }
    );
  }

  getModel(): CompanyUserImage {
    return Object.assign({
      id: this.id,
      userId: this.userId,
      companyUserId: this.companyUserId,
      imagePath: this.imagePath,
      imageName: this.imageName,
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  getUsers() {
    this.userId = parseInt(this.localStorageService.getFromLocalStorage('id'));

    this.userService.getAllDTO(this.userId).subscribe(
      (response) => {
        this.users = response.data.filter((f) => f.code == CompanyUserCode);
      },
      (error) => console.error
    );
  }

  getCompanyUsers() {
    this.companyUserService.getAllDTO(this.userId).subscribe(
      (response) => {
        this.companyUsers = response.data.filter(
          (f) => f.code == CompanyUserCode
        );
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

  getCompanyUserById(companyUserId: number): string {
    return this.companyUsers.find((c) => c.id == companyUserId)
      ?.companyUserName;
  }

  clearInput1() {
    let value = this.updateForm.get('image');
    value.reset();
  }
}
