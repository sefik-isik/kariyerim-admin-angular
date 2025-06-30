import { City } from '../../../models/component/city';
import { Component, Input, OnInit } from '@angular/core';

import { CityService } from '../../../services/city.service';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Region } from '../../../models/component/region';
import { RegionService } from '../../../services/region.service';
import { CaseService } from '../../../services/helperServices/case.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RegionDTO } from '../../../models/dto/regionDTO';
import { ValidationService } from '../../../services/validation.service';
import { CountryService } from '../../../services/country.service';
import { Country } from '../../../models/component/country';

@Component({
  selector: 'app-regionUpdate',
  templateUrl: './regionUpdate.component.html',
  styleUrls: ['./regionUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class RegionUpdateComponent implements OnInit {
  @Input() regionDTO: RegionDTO;
  regions: Region[];
  cities: City[];
  countries: Country[];
  componentTitle = 'Region Update Form';

  constructor(
    private countryService: CountryService,
    private cityService: CityService,
    private regionService: RegionService,
    private toastrService: ToastrService,
    private router: Router,
    private caseService: CaseService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.getCountries();
    this.getCities();
    setTimeout(() => {
      this.getById(this.regionDTO.id);
    }, 200);
  }

  getById(id: string) {
    this.regionService.getById(id).subscribe(
      (response) => {
        this.regionDTO.id = response.data.id;
        this.regionDTO.cityId = response.data.cityId;
        this.getRegions();
      },
      (responseError) => console.error
    );
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.regionService.update(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/region/regionlisttab']);
        },
        (responseError) => console.error
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): Region {
    return Object.assign({
      id: this.regionDTO.id,
      countryId: this.getCountryId(this.regionDTO.countryName),
      cityId: this.getCityId(this.regionDTO.cityName),
      regionName: this.caseService.capitalizeFirstLetter(
        this.regionDTO.regionName
      ),
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

  getCities() {
    this.cityService.getAll().subscribe(
      (response) => {
        this.cities = response.data;
      },
      (responseError) => console.error
    );
  }

  getRegions() {
    this.regionService.getAll().subscribe(
      (response) => {
        if (this.regionDTO.cityId) {
          this.regions = response.data.filter(
            (f) => f.cityId == this.regionDTO.cityId
          );
        }
      },
      (responseError) => console.error
    );
  }

  getCountryId(countryName: string): string {
    const countryId = this.countries.filter(
      (c) => c.countryName === countryName
    )[0]?.id;

    return countryId;
  }

  getCityById(cityId: string): string {
    return this.cities.find((c) => c.id == cityId)?.cityName;
  }

  getCityId(cityName: string): string {
    return this.cities.find((c) => c.cityName == cityName)?.id;
  }

  countryNameClear() {
    this.regionDTO.countryName = '';
  }

  cityNameClear() {
    this.regionDTO.cityName = '';
  }

  regionNameClear() {
    this.regionDTO.regionName = '';
  }
}
