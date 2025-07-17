import { RegionService } from './../../../services/region.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { CityService } from '../../../services/city.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { City } from '../../../models/component/city';
import { Region } from '../../../models/component/region';
import { CaseService } from '../../../services/helperServices/case.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../../services/validation.service';
import { RegionDTO } from '../../../models/dto/regionDTO';
import { CountryService } from '../../../services/country.service';
import { Country } from '../../../models/component/country';

@Component({
  selector: 'app-regionAdd',
  templateUrl: './regionAdd.component.html',
  styleUrls: ['./regionAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class RegionAddComponent implements OnInit {
  regionModel: RegionDTO = {} as RegionDTO;
  countries: Country[];
  cities: City[];
  componentTitle = 'Region Add Form';

  constructor(
    private regionService: RegionService,
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
    this.getCities();
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.regionService.add(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/region/regionlisttab']);
        },
        (responseError) => this.toastrService.error(responseError.error.message)
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): Region {
    return Object.assign({
      id: '',
      regionName: this.caseService.capitalizeFirstLetter(
        this.regionModel.regionName.trim()
      ),
      countryId: this.getCountryId(this.regionModel.countryName.trim()),
      cityId: this.getCityId(this.regionModel.cityName.trim()),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  getCountries() {
    this.countryService.getAll().subscribe(
      (response) => {
        this.countries = response.data;
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  getCities() {
    this.cityService.getAll().subscribe(
      (response) => {
        this.cities = response.data;
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  getCountryId(countryName: string): string {
    const countryId = this.countries.filter(
      (c) => c.countryName === countryName
    )[0]?.id;

    return countryId;
  }

  getCityId(cityName: string): string {
    const cityId = this.cities.filter((c) => c.cityName === cityName)[0]?.id;

    return cityId;
  }

  countryNameClear() {
    this.regionModel.countryName = '';
  }

  cityNameClear() {
    this.regionModel.cityName = '';
  }

  regionNameClear() {
    this.regionModel.regionName = '';
  }
}
