import { AdminModel } from './../../../models/adminModel';
import { Sector } from '../../../models/sector';
import { City } from './../../../models/city';
import { Component, Input, OnInit } from '@angular/core';
import { CityService } from '../../../services/city.service';
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
import { CompanyUser } from '../../../models/companyUser';
import { CompanyUserService } from '../../../services/companyUser.service';
import { SectorService } from '../../../services/sectorService';
import { TaxOffice } from '../../../models/taxOffice';
import { TaxOfficeService } from '../../../services/taxOffice.service';
import { UserDTO } from '../../../models/userDTO';
import { UserService } from '../../../services/user.service';
import { CompanyUserDTO } from '../../../models/companyUserDTO';
import { CaseService } from '../../../services/case.service';
import { AdminService } from '../../../services/admin.service';
import { LocalStorageService } from '../../../services/localStorage.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-companyUserUpdate',
  templateUrl: './companyUserUpdate.component.html',
  styleUrls: ['./companyUserUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class CompanyUserUpdateComponent implements OnInit {
  updateForm: FormGroup;
  @Input() companyUserDTO: CompanyUserDTO;
  companyUserDTOs: CompanyUserDTO[];
  sectors: Sector[];
  cities: City[];
  taxOffices: TaxOffice[];
  userDTOs: UserDTO[] = [];
  id: number;
  sectorId: number;
  taxCityId: number;
  taxOfficeId: number;
  componentTitle = 'Company User Update';
  userEmail: string;
  userName: string;
  userId: number;
  isAdmin: boolean = false;

  constructor(
    private companyUserService: CompanyUserService,
    private sectorService: SectorService,
    private cityService: CityService,
    private taxOfficeService: TaxOfficeService,
    private userService: UserService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private adminService: AdminService,
    private caseService: CaseService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.getAdminValues();

    this.getSectors();
    this.getCities();
    this.createUpdateForm();
    this.getTaxOffices();

    setTimeout(() => {
      this.getUserValues(this.companyUserDTO.id);
    }, 200);
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      companyUserName: ['', [Validators.required, Validators.minLength(3)]],
      sectorName: ['', [Validators.required, Validators.minLength(3)]],
      cityName: ['', [Validators.required, Validators.minLength(3)]],
      taxOfficeName: ['', [Validators.required, Validators.minLength(3)]],
      taxNumber: ['', [Validators.required, Validators.minLength(3)]],
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
    this.companyUserService.getById(adminModel).subscribe(
      (response) => {
        this.id = response.data.id;
        this.userId = response.data.userId;
        this.userEmail = this.getUserEmailById(this.userId);
        this.sectorId = response.data.sectorId;
        this.taxCityId = response.data.taxCityId;
        this.taxOfficeId = response.data.taxOfficeId;

        this.updateForm.patchValue({
          userEmail: this.userEmail,
          companyUserName: response.data.companyUserName,
          sectorName: this.getSectorNameById(this.sectorId),
          cityName: this.getCityById(this.taxCityId),
          taxOfficeName: this.getTaxOfficeById(this.taxOfficeId),
          taxNumber: response.data.taxNumber,
        });
      },
      (error) => console.error
    );
  }

  update() {
    if (
      this.updateForm.valid &&
      this.getModel().id > 0 &&
      this.getModel().userId > 0 &&
      this.getModel().sectorId > 0 &&
      this.getModel().taxCityId > 0 &&
      this.getModel().taxOfficeId > 0
    ) {
      this.companyUserService.update(this.getModel()).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.activeModal.close();
          this.router.navigate(['/dashboard/companyusers']);
        },
        (error) => {
          this.toastrService.error(error.error.message);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): CompanyUser {
    return Object.assign({
      id: this.id,
      userId: this.userId,
      companyUserName: this.caseService.capitalizeFirstLetter(
        this.updateForm.value.companyUserName
      ),
      sectorId: this.getsectorId(this.updateForm.value.sectorName),
      taxCityId: this.getCityId(this.updateForm.value.cityName),
      taxOfficeId: this.getTaxOfficeId(this.updateForm.value.taxOfficeName),
      taxNumber: this.updateForm.value.taxNumber,
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  getAdminValues() {
    this.adminService.getAdminValues(this.id).subscribe(
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
    this.companyUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.companyUserDTOs = response.data;
      },
      (error) => console.error
    );
  }

  getCities() {
    this.cityService.getAll().subscribe(
      (response) => {
        this.cities = response.data;
      },
      (error) => console.error
    );
  }

  getSectors() {
    this.sectorService.getAll().subscribe(
      (response) => {
        this.sectors = response.data;
      },
      (error) => console.error
    );
  }

  getTaxOffices() {
    this.taxOfficeService.getAll().subscribe(
      (response) => {
        if (this.updateForm.value.cityName) {
          this.taxOffices = response.data.filter(
            (f) => f.cityId === this.getCityId(this.updateForm.value.cityName)
          );
        } else {
          this.taxOffices = response.data;
        }
      },
      (error) => console.error
    );
  }

  getUserEmailById(userId: number): string {
    return this.userDTOs.find((c) => c.id == userId)?.email;
  }

  getSectorNameById(sectorId: number): string {
    return this.sectors.find((c) => c.id == sectorId)?.sectorName;
  }

  getCityById(cityId: number): string {
    return this.cities.find((c) => c.id == cityId)?.cityName;
  }

  getTaxOfficeById(taxOfficeId: number): string {
    return this.taxOffices.find((c) => c.id == taxOfficeId)?.taxOfficeName;
  }

  getUserId(email: string): number {
    return this.userDTOs.find(
      (c) => c.email.toLocaleLowerCase() == email.toLocaleLowerCase()
    )?.id;
  }

  getsectorId(sectorName: string): number {
    return this.sectors.find(
      (c) => c.sectorName.toLocaleLowerCase() == sectorName.toLocaleLowerCase()
    )?.id;
  }

  getCityId(cityName: string): number {
    return this.cities.find(
      (c) => c.cityName.toLocaleLowerCase() == cityName.toLocaleLowerCase()
    )?.id;
  }

  getTaxOfficeId(taxOfficeName: string): number {
    return this.taxOffices.find(
      (c) =>
        c.taxOfficeName.toLocaleLowerCase() == taxOfficeName.toLocaleLowerCase()
    )?.id;
  }

  clearInput1() {
    let value = this.updateForm.get('companyUserName');
    value.reset();
  }

  clearInput2() {
    let value = this.updateForm.get('sectorName');
    value.reset();
    this.getSectors();
  }

  clearInput3() {
    let value = this.updateForm.get('cityName');
    value.reset();
    this.getCities();
  }

  clearInput4() {
    let value = this.updateForm.get('taxOfficeName');
    value.reset();
    this.getTaxOffices();
  }

  clearInput5() {
    let value = this.updateForm.get('taxNumber');
    value.reset();
  }
}
