import { City } from '../../../models/component/city';
import { Country } from '../../../models/component/country';
import { Component, Input, OnInit } from '@angular/core';
import { CityService } from '../../../services/city.service';
import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
  NgForm,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CountryService } from '../../../services/country.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CaseService } from '../../../services/helperServices/case.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CityDTO } from '../../../models/dto/cityDTO';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-cityUpdate',
  templateUrl: './cityUpdate.component.html',
  styleUrls: ['./cityUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class CityUpdateComponent implements OnInit {
  @Input() cityDTO: CityDTO;
  countries: Country[];
  cities: City[];
  cityId: string;
  countryId: string;
  componentTitle = 'City Update Form';

  constructor(
    private cityService: CityService,
    private formBuilder: FormBuilder,
    private countryService: CountryService,
    private toastrService: ToastrService,
    private router: Router,
    private caseService: CaseService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.getCountries();

    setTimeout(() => {
      this.getById(this.cityDTO.id);
    }, 200);
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  getById(id: string) {
    this.cityService.getById(id).subscribe(
      (response) => {
        this.cityDTO.cityName = response.data.cityName;
        this.cityDTO.cityCode = response.data.cityCode;
        this.cityDTO.countryName = this.getCountryById(response.data.countryId);
      },
      (responseError) => console.error
    );
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.cityService.update(this.getModel()).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');

          this.router.navigate(['dashboard/city/citylisttab']);
          this.activeModal.close();
        },
        (responseError) => {
          console.log(responseError);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): City {
    return Object.assign({
      id: this.cityDTO.id,
      countryId: this.getCountryId(this.cityDTO.countryName),
      cityName: this.caseService.capitalizeFirstLetter(this.cityDTO.cityName),
      cityCode: this.cityDTO.cityCode,
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  getCountries() {
    this.countryService.getAll().subscribe(
      (response) => {
        this.countries = response.data;
      },
      (responseError) => console.error
    );
  }

  getCountryById(countryId: string): string {
    return this.countries.find((c) => c.id == countryId)?.countryName;
  }

  getCountryId(countryName: string): string {
    return this.countries.find((c) => c.countryName == countryName)?.id;
  }

  countryNameClear() {
    this.cityDTO.countryName = '';
  }

  cityNameClear() {
    this.cityDTO.cityName = '';
  }

  cityCodeClear() {
    this.cityDTO.cityCode = '';
  }
}
