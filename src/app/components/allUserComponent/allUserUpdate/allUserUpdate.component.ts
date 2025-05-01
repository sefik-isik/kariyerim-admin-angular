import { AuthService } from './../../../services/auth.service';

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
import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../models/userDTO';
import { CompanyUserCode, PersonelUserCode } from '../../../models/userCodes';
import { Status } from '../../../models/status';

@Component({
  selector: 'app-allUserUpdate',
  templateUrl: './allUserUpdate.component.html',
  styleUrls: ['./allUserUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class AllUserUpdateComponent implements OnInit {
  updateForm: FormGroup;
  userId: number;
  componentTitle = 'User Update';
  codes: string[] = ['Personel User', 'Company User', 'Unknown User'];
  statuses: string[] = ['Admin', 'User'];

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,

    private authService: AuthService
  ) {}

  ngOnInit() {
    this.createUpdateForm();
    this.activatedRoute.params.subscribe((params) => {
      this.getById(params['alluserId']);
    });
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(3)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(3)]],
      code: ['', [Validators.required, Validators.minLength(3)]],
      status: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  getById(id: number) {
    this.userService.getById(id).subscribe(
      (response) => {
        this.updateForm.patchValue({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          phoneNumber: response.data.phoneNumber,
          code: this.checkCode(response.data.code),
          status: this.checkStatus(response.data.status),
        });
        this.userId = id;
      },
      (error) => console.error
    );
  }

  checkCode(code: string): string {
    if (code === PersonelUserCode) {
      return 'Personel User';
    } else if (code === CompanyUserCode) {
      return 'Company User';
    } else {
      return 'Unknown User';
    }
  }

  checkStatus(status: string): string {
    if (status === Status) {
      return 'Admin';
    } else {
      return 'User';
    }
  }

  update() {
    if (this.updateForm.valid) {
      this.authService.updateUser(this.getModel()).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/allusers']);
        },
        (error) => console.log(error)
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): UserDTO {
    return Object.assign({
      id: this.userId,
      firstName: this.updateForm.value.firstName,
      lastName: this.updateForm.value.lastName,
      email: this.updateForm.value.email,
      phoneNumber: this.updateForm.value.phoneNumber,
      code: this.getCode(this.updateForm.value.code),
      status: this.getStatus(this.updateForm.value.status),
      passwordHash: '',
      passwordSalt: '',
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  getCode(code: string): string {
    let userCode = '';
    if (code == 'Personel User') {
      userCode = PersonelUserCode;
    } else if (code == 'Company User') {
      userCode = CompanyUserCode;
    } else {
      userCode =
        'VmaWsgScWeSUsiLCJhdWQiOiJzZWZpa2lzaWtAZ21haWwuY29tIn0.E53sJM4VSvSVE93feNe-XjwI5tmy2YntPeXTD_wavFn5mD6Vsk8';
    }
    return userCode;
  }

  getStatus(status: string): string {
    let userStatus = '';
    if (status == 'Admin') {
      userStatus = Status;
    } else {
      userStatus =
        'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9';
    }

    return userStatus;
  }

  clearInput1() {
    let value = this.updateForm.get('firstName');
    value.reset();
  }

  clearInput2() {
    let value = this.updateForm.get('lastName');
    value.reset();
  }
  clearInput3() {
    let value = this.updateForm.get('email');
    value.reset();
  }
  clearInput4() {
    let value = this.updateForm.get('phoneNumber');
    value.reset();
  }
  clearInput5() {
    let value = this.updateForm.get('code');
    value.reset();
  }
  clearInput6() {
    let value = this.updateForm.get('status');
    value.reset();
  }
}
