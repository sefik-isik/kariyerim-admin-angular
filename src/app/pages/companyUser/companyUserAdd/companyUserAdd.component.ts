import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserDTO } from '../../../models/userDTO';
import { TaxOffice } from './../../../models/taxOffice';
import { CompanyUserService } from './../../../services/companyUser.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SectorService } from '../../../services/sectorService';
import { CompanyUser } from '../../../models/companyUser';
import { Sector } from '../../../models/sector';
import { CityService } from '../../../services/city.service';
import { City } from '../../../models/city';
import { TaxOfficeService } from '../../../services/taxOffice.service';
import { UserService } from '../../../services/user.service';
import { CaseService } from '../../../services/case.service';
import { AdminService } from '../../../services/admin.service';
import { AdminModel } from '../../../models/adminModel';
import { LocalStorageService } from '../../../services/localStorage.service';

@Component({
  selector: 'app-companyUserAdd',
  templateUrl: './companyUserAdd.component.html',
  styleUrls: ['./companyUserAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class CompanyUserAddComponent implements OnInit {
  componentTitle = 'Company User Add Form';
  companyUserSectors: Sector[] = [];
  cities: City[] = [];
  taxOffices: TaxOffice[] = [];
  userDTOs: UserDTO[] = [];
  addForm: FormGroup;
  userId: number;
  isAdmin: boolean = false;

  constructor(
    private sectorService: SectorService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private companyUserService: CompanyUserService,
    private cityService: CityService,
    private taxOfficeService: TaxOfficeService,
    private userService: UserService,
    private adminService: AdminService,
    private caseService: CaseService,
    private localStorageService: LocalStorageService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.createAddForm();
    this.getSectors();
    this.getCities();
    this.getAdminValues();
  }

  createAddForm() {
    this.addForm = this.formBuilder.group({
      userEmail: [
        '',
        [Validators.required, Validators.minLength(3), Validators.email],
      ],
      companyUserName: ['', [Validators.required, Validators.minLength(3)]],
      sectorName: ['', [Validators.required, Validators.minLength(2)]],
      taxOfficeName: ['', [Validators.required, Validators.minLength(3)]],
      cityName: ['', [Validators.required, Validators.minLength(3)]],
      taxNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
    });
  }

  add() {
    if (
      this.addForm.valid &&
      this.getModel().userId > 0 &&
      this.getModel().sectorId > 0 &&
      this.getModel().taxCityId > 0 &&
      this.getModel().taxOfficeId > 0
    ) {
      this.companyUserService.add(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
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
      companyUserName: this.caseService.capitalizeFirstLetter(
        this.addForm.value.companyUserName
      ),
      userId: this.getUserId(this.addForm.value.userEmail),
      sectorId: this.getSectorId(this.addForm.value.sectorName),
      taxOfficeId: this.getTaxOfficeId(this.addForm.value.taxOfficeName),
      taxCityId: this.getCityId(this.addForm.value.cityName),
      taxNumber: this.addForm.value.taxNumber,
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  getAdminValues() {
    const id = parseInt(this.localStorageService.getFromLocalStorage('id'));
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.getAllCompanyUsers(response);
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

  getSectors() {
    this.sectorService.getAll().subscribe(
      (response) => {
        this.companyUserSectors = response.data;
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

  getTaxOffices() {
    if (this.addForm.value.cityName == null) {
      return;
    }
    this.taxOfficeService.getAll().subscribe(
      (response) => {
        this.taxOffices = response.data.filter(
          (f) => f.cityId === this.getCityId(this.addForm.value.cityName)
        );
      },
      (error) => console.error
    );
  }

  getUserId(userEmail: string): number {
    const userId = this.userDTOs.filter((c) => c.email === userEmail)[0]?.id;

    return userId;
  }

  getSectorId(sectorName: string): number {
    const companyUserSectorId = this.companyUserSectors.filter(
      (c) => c.sectorName === sectorName
    )[0]?.id;

    return companyUserSectorId;
  }

  getCityId(cityName: string): number {
    const cityId = this.cities.filter((c) => c.cityName === cityName)[0]?.id;
    return cityId;
  }

  getTaxOfficeId(taxOfficeName: string): number {
    const taxOfficeId = this.taxOffices.filter(
      (c) => c.taxOfficeName === taxOfficeName
    )[0]?.id;

    return taxOfficeId;
  }

  clearInput1() {
    let value = this.addForm.get('userEmail');
    value.reset();
    this.getAdminValues();
  }

  clearInput2() {
    let value = this.addForm.get('companyUserName');
    value.reset();
  }

  clearInput3() {
    let value = this.addForm.get('sectorName');
    value.reset();
    this.getSectors();
  }

  clearInput4() {
    let value = this.addForm.get('cityName');
    value.reset();
    this.getCities();
  }

  clearInput5() {
    let value = this.addForm.get('taxOfficeName');
    value.reset();
    this.getTaxOffices();
  }

  clearInput6() {
    let value = this.addForm.get('taxNumber');
    value.reset();
  }
}
