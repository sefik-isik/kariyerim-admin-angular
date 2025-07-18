import { CaseService } from '../../../services/helperServices/case.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { CountryService } from '../../../services/country.service';
import { Country } from '../../../models/component/country';
import { CityService } from '../../../services/city.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { City } from '../../../models/component/city';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CityDTO } from '../../../models/dto/cityDTO';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-cityAdd',
  templateUrl: './cityAdd.component.html',
  styleUrls: ['./cityAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class CityAddComponent implements OnInit {
  cityModel: CityDTO = {} as CityDTO;
  countries: Country[];
  componentTitle = 'City Add Form';

  constructor(
    private countryService: CountryService,
    private cityService: CityService,
    private toastrService: ToastrService,
    private router: Router,
    private caseService: CaseService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.getCountries();
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.cityService.add(this.getModel()).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/city/citylisttab']);
        },
        (responseError) => {
          this.validationService.handleErrors(responseError);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): City {
    return Object.assign({
      id: '',
      cityName: this.caseService.capitalizeFirstLetter(
        this.cityModel.cityName.trim()
      ),
      cityCode: this.cityModel.cityCode.trim(),
      countryId: this.getCountryId(this.cityModel.countryName.trim()),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  getCountries() {
    this.countryService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.countries = response.data.filter((f) => f.countryName != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getCountryId(countryName: string): string {
    const countryId = this.countries.filter(
      (c) => c.countryName === countryName
    )[0]?.id;

    return countryId;
  }

  countryNameClear() {
    this.cityModel.countryName = '';
  }

  cityNameClear() {
    this.cityModel.cityName = '';
  }

  cityCodeClear() {
    this.cityModel.cityCode = '';
  }
}
