import { AdminModel } from './../../../models/adminModel';
import { AdminService } from './../../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { CompanyUserService } from '../../../services/companyUser.service';
import { CompanyUserDTO } from '../../../models/companyUserDTO';
import { UserDTO } from '../../../models/userDTO';
import { UserService } from '../../../services/user.service';
import { CompanyUserImageService } from '../../../services/companyUserImage.service';
import { CompanyUserImage } from '../../../models/companyUserImage';
import { LocalStorageService } from '../../../services/localStorage.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-companyUserImageAdd',
  templateUrl: './companyUserImageAdd.component.html',
  styleUrls: ['./companyUserImageAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class CompanyUserImageAddComponent implements OnInit {
  addForm: FormGroup;
  componentTitle = 'Company User Image Add Form';
  selectedImage: File | null = null;
  imagePath: string | null = null;
  imageName: string | null = null;
  companyUserDTOs: CompanyUserDTO[] = [];
  companyUserId: number;
  userId: number;
  userDTOs: UserDTO[] = [];
  isAdmin: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private companyUserImageService: CompanyUserImageService,
    private router: Router,
    private companyUserService: CompanyUserService,
    private adminService: AdminService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    public activeModal: NgbActiveModal
  ) {}
  ngOnInit() {
    this.createAddForm();
    this.getAdminValues();
  }

  createAddForm() {
    this.addForm = this.formBuilder.group({
      userEmail: ['', [Validators.required, Validators.minLength(3)]],
      image: ['', [Validators.required, Validators.minLength(3)]],
      companyUserName: ['', [Validators.required, Validators.minLength(3)]],
    });
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

  onUpload() {
    if (this.selectedImage && this.addForm.valid) {
      this.companyUserId = this.getCompanyUserId(
        this.addForm.value.companyUserName
      );

      const formData = new FormData();
      formData.append('image', this.selectedImage, this.selectedImage.name);
      formData.append('companyUserId', this.companyUserId.toString());

      this.companyUserImageService
        .uploadImage(formData, this.companyUserId)
        .subscribe(
          (event) => {
            if (event.type === HttpEventType.UploadProgress) {
              const percentDone = Math.round(
                event.loaded / (event.total * 100)
              );
              console.log(`Image is ${percentDone}% uploaded.`);
            } else if (event.type === HttpEventType.Response) {
              this.imageName = event.body.name;
              this.imagePath = event.body.type;

              this.add(this.imagePath, this.imageName);

              this.toastrService.success(
                'Company User Image Added Successfully',
                'Success'
              );
            }
          },
          (error) => {
            console.error;
          }
        );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  add(imagePath: string | null, imageName: string | null) {
    this.companyUserImageService
      .add(this.getModel(this.imagePath, this.imageName))
      .subscribe(
        (response) => {
          this.activeModal.close();
          this.router.navigate([
            '/dashboard/companyuserimage/companyuserimagelisttab',
          ]);
        },
        (error) => {
          this.toastrService.error(error.error.message);
        }
      );
  }

  getModel(
    imagePath: string | null,
    imageName: string | null
  ): CompanyUserImage {
    return Object.assign({
      companyUserId: this.getCompanyUserId(this.addForm.value.companyUserName),
      imagePath: imagePath,
      imageName: imageName,
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  getAdminValues() {
    const id = parseInt(this.localStorageService.getFromLocalStorage('id'));
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.getAllCompanyUsers(response);
        this.getCompanyUsers(response);
      },
      (error) => console.error
    );
  }

  getAllCompanyUsers(adminModel: AdminModel) {
    this.userService.getAllCompanyUserDTO(adminModel).subscribe(
      (response) => {
        this.userDTOs = response.data;
      },
      (error) => console.error
    );
  }

  getCompanyUsers(adminModel: AdminModel) {
    const userId = this.getUserId(this.addForm.value.userEmail);
    this.companyUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.companyUserDTOs = response.data.filter((f) => f.userId === userId);
      },
      (error) => console.error
    );
  }

  getUserId(userEmail: string): number {
    const userId = this.userDTOs.filter((c) => c.email === userEmail)[0]?.id;

    return userId;
  }

  getCompanyUserId(companyUserName: string): number {
    const companyId = this.companyUserDTOs.filter(
      (c) => c.companyUserName === companyUserName
    )[0]?.id;

    return companyId;
  }

  clearInput1() {
    let value = this.addForm.get('userEmail');
    value.reset();
    this.getAdminValues();
  }

  clearInput2() {
    let value = this.addForm.get('companyUserName');
    value.reset();
    this.getAdminValues();
  }

  clearInput3() {
    let value = this.addForm.get('image');
    value.reset();
  }
}
