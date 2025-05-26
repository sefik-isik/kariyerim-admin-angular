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
import { PersonelUserService } from '../../../services/personelUser.service';
import { PersonelUserDTO } from '../../../models/personelUserDTO';
import { UserDTO } from '../../../models/userDTO';
import { UserService } from '../../../services/user.service';
import { PersonelUserImageService } from '../../../services/personelUserImage.service';
import { PersonelUserImage } from '../../../models/personelUserImage';
import { LocalStorageService } from '../../../services/localStorage.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-personelUserImageAdd',
  templateUrl: './personelUserImageAdd.component.html',
  styleUrls: ['./personelUserImageAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class PersonelUserImageAddComponent implements OnInit {
  addForm: FormGroup;
  componentTitle = 'Personel User Image Add Form';
  selectedImage: File | null = null;
  imagePath: string | null = null;
  imageName: string | null = null;
  imageOwnName: string | null = null;
  personelUserDTOs: PersonelUserDTO[] = [];
  personelUserId: number;
  userId: number;
  userDTOs: UserDTO[] = [];
  isAdmin: boolean;

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
    this.createAddForm();
    this.getAdminValues();
  }

  createAddForm() {
    this.addForm = this.formBuilder.group({
      userEmail: ['', [Validators.required, Validators.minLength(3)]],
      image: ['', [Validators.required, Validators.minLength(3)]],
      imageOwnName: ['', [Validators.required, Validators.minLength(3)]],
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
    if (!this.selectedImage) {
      this.toastrService.error(
        'Please select a image to upload',
        'No image selected'
      );
      return;
    }

    if (!this.addForm.valid) {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
      return;
    }

    this.personelUserId = this.getPersonelUserId(this.addForm.value.userEmail);

    const formData = new FormData();
    formData.append('image', this.selectedImage, this.selectedImage.name);
    formData.append('personelUserId', this.personelUserId.toString());

    this.personelUserImageService
      .uploadImage(formData, this.personelUserId)
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
        (error) => {
          console.error;
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
      (error) => {
        this.toastrService.error(error.error.message);
      }
    );
  }

  getModel(): PersonelUserImage {
    return Object.assign({
      personelUserId: this.getPersonelUserId(this.addForm.value.userEmail),
      imagePath: this.imagePath,
      imageName: this.imageName,
      imageOwnName: this.addForm.value.imageOwnName,
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  getAdminValues() {
    const id = parseInt(this.localStorageService.getFromLocalStorage('id'));
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.getAllPersonelUsers(response);
        this.getPersonelUsers(response);
      },
      (error) => console.error
    );
  }

  getAllPersonelUsers(adminModel: AdminModel) {
    this.userService.getAllPersonelUserDTO(adminModel).subscribe(
      (response) => {
        this.userDTOs = response.data;
      },
      (error) => console.error
    );
  }

  getPersonelUsers(adminModel: AdminModel) {
    const userId = this.getUserId(this.addForm.value.userEmail);
    this.personelUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.personelUserDTOs = response.data.filter(
          (f) => f.userId === userId
        );
      },
      (error) => console.error
    );
  }

  getUserId(userEmail: string): number {
    const userId = this.userDTOs.filter((c) => c.email === userEmail)[0]?.id;

    return userId;
  }

  getPersonelUserId(userEmail: string): number {
    const personelUserId = this.personelUserDTOs.filter(
      (c) => c.email === userEmail
    )[0]?.id;

    return personelUserId;
  }

  clearInput1() {
    let value = this.addForm.get('userEmail');
    value.reset();
    this.getAdminValues();
  }

  clearInput2() {
    let value = this.addForm.get('personelUserName');
    value.reset();
    this.getAdminValues();
  }

  clearInput3() {
    let value = this.addForm.get('image');
    value.reset();
  }

  clearInput4() {
    let value = this.addForm.get('imageOwnName');
    value.reset();
  }
}
