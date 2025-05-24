import { LocalStorageService } from './../../../services/localStorage.service';
import { AuthService } from './../../../services/auth.service';

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
import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../models/userDTO';
import { Status } from '../../../models/status';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminModel } from '../../../models/adminModel';

@Component({
  selector: 'app-allUserUpdate',
  templateUrl: './allUserUpdate.component.html',
  styleUrls: ['./allUserUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class AllUserUpdateComponent implements OnInit {
  updateForm: FormGroup;
  @Input() userDTO: UserDTO;
  userId: number;
  code: string;
  status: string;
  componentTitle = 'User Update';
  statuses: string[] = ['Admin', 'User'];

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.createUpdateForm();

    setTimeout(() => {
      this.getAdminValues(this.userDTO.id);
    }, 200);

    // this.activatedRoute.params.subscribe((params) => {
    //   this.getById(params['alluserId']);
    // });
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(3)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  getAdminValues(id: number) {
    const adminModel = {
      id: id,
      userId: parseInt(this.localStorageService.getFromLocalStorage('id')),
      email: this.localStorageService.getFromLocalStorage('email'),
      status: this.localStorageService.getFromLocalStorage('status'),
    };
    this.getById(adminModel);
  }

  getById(adminModel: AdminModel) {
    this.userService.getById(adminModel).subscribe(
      (response) => {
        this.code = response.data.code;
        this.status = response.data.status;
        this.updateForm.patchValue({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          phoneNumber: response.data.phoneNumber,
          status: this.checkStatus(response.data.status),
        });
        this.userId = response.data.id;
      },
      (error) => console.error
    );
  }

  checkStatus(status: string): string {
    if (status === Status) {
      return 'Admin';
    } else {
      return 'Normal User';
    }
  }

  update() {
    if (this.updateForm.valid) {
      this.authService.updateUser(this.getModel()).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/alluser/alluserlisttab']);
          this.activeModal.close();
        },
        (error) => console.error
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
      code: this.code,
      status: this.status,
      passwordHash: '',
      passwordSalt: '',
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
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
    let value = this.updateForm.get('status');
    value.reset();
  }
  clearInput6() {
    let value = this.updateForm.get('code');
    value.reset();
  }
}
