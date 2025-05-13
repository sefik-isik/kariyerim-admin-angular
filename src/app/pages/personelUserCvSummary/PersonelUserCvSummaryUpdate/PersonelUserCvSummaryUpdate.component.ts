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
import { UserDTO } from '../../../models/userDTO';
import { PersonelUserDTO } from '../../../models/personelUserDTO';
import { LocalStorageService } from '../../../services/localStorage.service';
import { AdminModel } from '../../../models/adminModel';
import { PersonelUserCvService } from '../../../services/personelUserCv.service';
import { PersonelUserCv } from '../../../models/personelUserCv';
import { UserService } from '../../../services/user.service';
import { PersonelUserService } from '../../../services/personelUser.service';
import { AdminService } from '../../../services/admin.service';
import { PersonelUserCvSummaryService } from '../../../services/personelUserCvSummary.service';
import { PersonelUserCvSummaryDTO } from '../../../models/personelUserCvSummaryDTO';

@Component({
  selector: 'app-PersonelUserCvSummaryUpdate',
  templateUrl: './PersonelUserCvSummaryUpdate.component.html',
  styleUrls: ['./PersonelUserCvSummaryUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class PersonelUserCvSummaryUpdateComponent implements OnInit {
  updateForm: FormGroup;
  personelUserDTOs: PersonelUserDTO[] = [];
  users: UserDTO[] = [];
  personelUserCvs: PersonelUserCv[] = [];
  id: number;
  personelUserId: number;
  personelUserName: string;
  userEmail: string;
  detailText: string;
  detailCount: number;
  userDTOs: UserDTO[] = [];
  componentTitle = 'Personel User Cv Summary Update';

  constructor(
    private personelUserCvSummaryService: PersonelUserCvSummaryService,
    private userService: UserService,
    private personelUserService: PersonelUserService,
    private personelUserCvService: PersonelUserCvService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.createUpdateForm();
    this.getAdminValues();

    setTimeout(() => {
      this.activatedRoute.params.subscribe((params) => {
        this.getUserValues(params['personelusercvsummaryId']);
      });
    }, 500);
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      cvName: ['', [Validators.required, Validators.minLength(3)]],
      cvSummaryTitle: ['', [Validators.required, Validators.minLength(3)]],
      cvSummaryDescription: [
        '',
        [Validators.required, Validators.minLength(3)],
      ],
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
    this.personelUserCvSummaryService.getById(adminModel).subscribe(
      (response) => {
        this.id = response.data.id;
        this.personelUserId = response.data.personelUserId;
        this.userEmail = this.getUserEmailById(this.personelUserId);
        this.updateForm.patchValue({
          cvName: this.getCvNameById(response.data.cvId),
          cvSummaryTitle: response.data.cvSummaryTitle,
          cvSummaryDescription: response.data.cvSummaryDescription,
        });
      },
      (error) => console.error
    );
  }

  update() {
    if (
      this.updateForm.valid &&
      this.getModel().id > 0 &&
      this.getModel().personelUserId > 0
    ) {
      this.personelUserCvSummaryService.update(this.getModel()).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/personelusercvsummaries']);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): PersonelUserCvSummaryDTO {
    return Object.assign({
      id: this.id,
      personelUserId: this.getPersonelUserId(this.userEmail),
      cvId: this.getPersonelUserCvId(this.updateForm.value.cvName),
      cvSummaryTitle: this.updateForm.value.cvSummaryTitle,
      cvSummaryDescription: this.updateForm.value.cvSummaryDescription,
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  count(text: string) {
    return text.length;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getAdminValues() {
    const id = parseInt(this.localStorageService.getFromLocalStorage('id'));
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.getAllPersonelUsers(response);
        this.getPersonelUsers(response);
        this.getPersonelUserCvs(response);
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
    this.personelUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.personelUserDTOs = response.data;
        this.getPersonelUserCvs(adminModel);
      },
      (error) => console.error
    );
  }

  getPersonelUserCvs(adminModel: AdminModel) {
    this.personelUserCvService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.personelUserCvs = response.data;
      },
      (error) => console.error
    );
  }

  getUserEmailById(personelUserId: number) {
    const userEmail = this.userDTOs.filter((c) => c.id === personelUserId)[0]
      ?.email;

    return userEmail;
  }

  getCvNameById(cvId: number) {
    const cvName = this.personelUserCvs.filter((c) => c.id === cvId)[0]?.cvName;

    return cvName;
  }

  getPersonelUserCvId(cvName: string): number {
    const personelUserId = this.personelUserCvs.filter(
      (c) => c.cvName === cvName
    )[0]?.id;

    return personelUserId;
  }

  getPersonelUserId(email: string): number {
    const personelUserId = this.userDTOs.filter((c) => c.email === email)[0]
      ?.id;

    return personelUserId;
  }

  clearInput1() {
    let value = this.updateForm.get('cvName');
    value.reset();
  }

  clearInput2() {
    let value = this.updateForm.get('cvSummaryTitle');
    value.reset();
  }

  clearInput3() {
    let value = this.updateForm.get('cvSummaryDescription');
    value.reset();
  }
}
