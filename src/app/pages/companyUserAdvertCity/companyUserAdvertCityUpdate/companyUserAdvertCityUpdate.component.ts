import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { City } from '../../../models/component/city';
import { CompanyUserAdvert } from '../../../models/component/companyUserAdvert';
import { CompanyUserAdvertCity } from '../../../models/component/companyUserAdvertCity';
import { CompanyUserAdvertCityDTO } from '../../../models/dto/companyUserAdvertCityDTO';
import { CityService } from '../../../services/city.service';
import { CompanyUserAdvertCityService } from '../../../services/companyUserAdvertCity.service';
import { ValidationService } from '../../../services/validation.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-companyUserAdvertCityUpdate',
  templateUrl: './companyUserAdvertCityUpdate.component.html',
  styleUrls: ['./companyUserAdvertCityUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class CompanyUserAdvertCityUpdateComponent implements OnInit {
  companyUserAdvertCityDTO: CompanyUserAdvertCityDTO =
    {} as CompanyUserAdvertCityDTO;
  companyUserAdverts: CompanyUserAdvert[] = [];
  workCities: City[] = [];
  admin: boolean = false;
  componentTitle = 'Company Advert City Update Form';

  constructor(
    private companyUserAdvertCityService: CompanyUserAdvertCityService,
    private workCitieService: CityService,
    private toastrService: ToastrService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getWorkCities();
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.companyUserAdvertCityService.update(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/companyuseradvertcity/companyuseradvertcitylisttab',
          ]);
        },
        (responseError) => {
          console.log(responseError);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): CompanyUserAdvertCity {
    return Object.assign({
      id: this.companyUserAdvertCityDTO.id,
      userId: this.companyUserAdvertCityDTO.userId,
      companyUserId: this.companyUserAdvertCityDTO.companyUserId,
      advertId: this.companyUserAdvertCityDTO.advertId,
      workCityId: this.getWorkCityId(
        this.companyUserAdvertCityDTO.workCityName.trim()
      ),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  getWorkCities() {
    this.workCitieService.getAll().subscribe(
      (response) => {
        this.workCities = response.data;
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  getWorkCityId(workCityName: string): string {
    const workCityId = this.workCities.filter(
      (w) => w.cityName === workCityName
    )[0]?.id;

    return workCityId;
  }

  workCityNameClear() {
    this.companyUserAdvertCityDTO.workCityName = '';
  }
}
