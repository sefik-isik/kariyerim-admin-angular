import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../models/dto/userDTO';
import { AdminStatus, UserStatus } from '../../../models/concrete/status';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminModel } from '../../../models/auth/adminModel';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-allUserUpdate',
  templateUrl: './allUserUpdate.component.html',
  styleUrls: ['./allUserUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class AllUserUpdateComponent implements OnInit {
  @Input() userDTO: UserDTO;
  statuses: string[] = ['Admin', 'User'];
  componentTitle = 'All User Update Form';

  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private localStorageService: LocalStorageService,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.getUserValues(this.userDTO.id);
    }, 200);
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  getUserValues(id: string) {
    const adminModel = {
      id: id,
      userId: this.localStorageService.getFromLocalStorage('id'),
      email: this.localStorageService.getFromLocalStorage('email'),
      status: this.localStorageService.getFromLocalStorage('status'),
    };
    this.getById(adminModel);
  }

  getById(adminModel: AdminModel) {
    this.userService.getById(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.userDTO.id = response.data.id;
        this.userDTO.status = this.setStatus(response.data.status.trim());
        this.userDTO.firstName = response.data.firstName.trim();
        this.userDTO.lastName = response.data.lastName.trim();
        this.userDTO.email = response.data.email.trim();
        this.userDTO.phoneNumber = response.data.phoneNumber.trim();
        this.userDTO.code = response.data.code.trim();
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  setStatus(status: string): string {
    if (status === AdminStatus) {
      return 'Admin';
    } else if (status === UserStatus) {
      return 'User';
    } else {
      return 'Unknown User';
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const userModel: UserDTO = Object.assign(
        {
          id: this.userDTO.id,
          status: this.userDTO.status,
          code: this.userDTO.code,
          passwordHash: '',
          passwordSalt: '',
          createdDate: new Date(Date.now()).toJSON(),
          updatedDate: new Date(Date.now()).toJSON(),
          deletedDate: new Date(Date.now()).toJSON(),
        },
        form.value
      );

      this.userService.update(userModel).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/alluser/alluserlisttab']);
          this.activeModal.close();
        },
        (responseError) => this.validationService.handleErrors(responseError)
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  firstNameClear() {
    this.userDTO.firstName = '';
  }
  lastNameClear() {
    this.userDTO.lastName = '';
  }
  emailClear() {
    this.userDTO.email = '';
  }
  phoneNumberClear() {
    this.userDTO.phoneNumber = '';
  }
}
