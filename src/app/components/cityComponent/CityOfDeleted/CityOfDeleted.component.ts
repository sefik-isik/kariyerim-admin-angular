import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CityService } from '../../../services/city.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { CityDTO } from '../../../models/cityDTO';
import { FilterCityPipe } from '../../../pipes/filterCity.pipe';
import { FilterCityByCountryPipe } from '../../../pipes/filterCityByCountry.pipe';
import { CountryService } from '../../../services/country.service';
import { Country } from '../../../models/country';

@Component({
  selector: 'app-CityOfDeleted',
  templateUrl: './CityOfDeleted.component.html',
  styleUrls: ['./CityOfDeleted.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    FilterCityPipe,
    RouterLink,
    FilterCityByCountryPipe,
  ],
})
export class CityOfDeletedComponent implements OnInit {
  cityDTOs: CityDTO[] = [];
  countries: Country[];
  dataLoaded = false;
  filter1 = '';
  filter2 = '';
  componentTitle = 'Deleted Cities';
  constructor(
    private cityService: CityService,
    private toastrService: ToastrService,
    private countryService: CountryService
  ) {}

  ngOnInit() {
    this.getCountries();
    this.getCities();
  }

  getCountries() {
    this.countryService.getAll().subscribe(
      (response) => {
        this.countries = response.data.filter((f) => f.deletedDate == null);
        this.dataLoaded = true;
      },
      (error) => console.error
    );
  }

  getCities() {
    this.cityService.getAllDTO().subscribe(
      (response) => {
        this.cityDTOs = response.data.filter((f) => f.deletedDate != null);
      },
      (error) => console.error
    );
  }

  unDelete(city: CityDTO) {
    this.cityService.update(city).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (error) => console.error
    );
  }

  unDeleteAll() {
    this.cityDTOs.forEach((city) => {
      this.cityService.update(city).subscribe(
        (response) => {},
        (error) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  clearInput1() {
    this.filter1 = null;
    this.getCities();
  }

  clearInput2() {
    this.filter2 = null;
    this.getCities();
  }
}
