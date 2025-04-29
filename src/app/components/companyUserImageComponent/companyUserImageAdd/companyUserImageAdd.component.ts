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
import { Router, RouterLink } from '@angular/router';
import { CompanyUserService } from '../../../services/companyUser.service';
import { LocalStorageService } from '../../../services/localStorage.service';
import { CompanyUserDTO } from '../../../models/companyUserDTO';
import { UserDTO } from '../../../models/userDTO';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { CompanyUserImageService } from '../../../services/companyUserImage.service';
import { CompanyUserImage } from '../../../models/companyUserImage';
import { CompanyUserCode } from '../../../models/userCodes';

@Component({
  selector: 'app-companyUserImageAdd',
  templateUrl: './companyUserImageAdd.component.html',
  styleUrls: ['./companyUserImageAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class CompanyUserImageAddComponent implements OnInit {
  addForm: FormGroup;
  componentTitle = 'Company User Image Add Form';
  selectedImage: File | null = null;
  imagePath: string | null = null;
  imageName: string | null = null;
  companyUsers: CompanyUserDTO[] = [];
  companyUserId: number;
  userId: number;
  users: UserDTO[] = [];
  isAdmin: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private companyUserImageService: CompanyUserImageService,
    private router: Router,
    private companyUserService: CompanyUserService,
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.createAddForm();
    this.getUsers();
    this.checkAdmin();
  }

  createAddForm() {
    this.addForm = this.formBuilder.group({
      userEmail: ['', [Validators.required, Validators.minLength(3)]],
      image: ['', [Validators.required, Validators.minLength(3)]],
      companyUserName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  checkAdmin() {
    if (this.authService.isAdmin('status')) {
      this.isAdmin = true;
    }
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
      this.userId = this.getUserId(this.addForm.value.userEmail);

      const formData = new FormData();
      formData.append('image', this.selectedImage, this.selectedImage.name);

      formData.append('userId', this.userId.toString());

      this.companyUserImageService.uploadImage(formData, this.userId).subscribe(
        (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round(event.loaded / (event.total * 100));
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
          console.log(error);
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
          this.router.navigate(['/dashboard/companyuserimages']);
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
      userId: this.getUserId(this.addForm.value.userEmail),
      companyUserId: this.getCompanyUserId(this.addForm.value.companyUserName),
      imagePath: imagePath,
      imageName: imageName,
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  getUsers() {
    this.userId = parseInt(this.localStorageService.getFromLocalStorage('id'));

    this.userService.getAllDTO(this.userId).subscribe(
      (response) => {
        this.users = response.data
          .filter((f) => f.deletedDate == null)
          .filter((f) => f.code == CompanyUserCode);
      },
      (error) => console.error
    );
  }

  getCompanyUsers() {
    this.userId = parseInt(this.localStorageService.getFromLocalStorage('id'));

    const userId = this.getUserId(this.addForm.value.userEmail);

    this.companyUserService.getAllDTO(this.userId).subscribe(
      (response) => {
        this.companyUsers = response.data
          .filter((f) => f.companyUserId == userId)
          .filter((f) => f.deletedDate == null)
          .filter((f) => f.code == CompanyUserCode);
      },
      (error) => console.error
    );
  }

  getUserId(userEmail: string): number {
    const userId = this.users.filter(
      (c) => c.email.toLowerCase() === userEmail.toLowerCase()
    )[0]?.id;

    return userId;
  }

  getCompanyUserId(companyUserName: string): number {
    const companyId = this.companyUsers.filter(
      (c) => c.companyUserName.toLowerCase() === companyUserName.toLowerCase()
    )[0]?.id;

    return companyId;
  }

  clearInput1() {
    let value = this.addForm.get('userEmail');
    value.reset();
    this.getUsers();
  }

  clearInput2() {
    let value = this.addForm.get('companyUserName');
    value.reset();
    this.getCompanyUsers();
  }

  clearInput3() {
    let value = this.addForm.get('image');
    value.reset();
  }
}
