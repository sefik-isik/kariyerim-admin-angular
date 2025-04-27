import { CountryService } from './../../../services/country.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CityService } from '../../../services/city.service';
import { FilterCityPipe } from '../../../pipes/filterCity.pipe';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CityDTO } from '../../../models/cityDTO';
import { FilterCityByCountryPipe } from '../../../pipes/filterCityByCountry.pipe';
import { Country } from '../../../models/country';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    FilterCityPipe,
    FilterCityByCountryPipe,
    RouterLink,
  ],
})
export class CityComponent implements OnInit {
  cityDTOs: CityDTO[] = [];
  countries: Country[] = [];
  filter1 = '';
  filter2 = '';
  componentTitle = 'Cities';
  constructor(
    private cityService: CityService,
    private toastrService: ToastrService,
    private countryService: CountryService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getCities();
    this.getCountries();
  }

  getCountries() {
    this.countryService.getAll().subscribe(
      (response) => {
        this.countries = response.data.filter((f) => f.deletedDate == null);
      },
      (error) => console.error
    );
  }

  getCities() {
    this.cityService.getAllDTO().subscribe(
      (response) => {
        this.cityDTOs = response.data.filter((f) => f.deletedDate == null);
      },
      (error) => console.error
    );
  }

  delete(city: CityDTO) {
    if (!this.authService.isAdmin('status')) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.cityService.delete(city).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile silindi');
        this.ngOnInit();
      },
      (error) => console.error
    );
  }

  deleteAll() {
    if (!this.authService.isAdmin('status')) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Tümünü Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.cityDTOs.forEach((city) => {
      this.cityService.delete(city).subscribe(
        (response) => {},
        (error) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
    }, 500);
  }

  getCountryId(countryName: string): number {
    return this.countries.find(
      (f) => f.countryName.toLowerCase() == countryName.toLowerCase()
    )?.id;
  }

  clearInput1() {
    this.filter1 = null;
    this.getCountries();
  }

  clearInput2() {
    this.filter2 = null;
    this.getCities();
  }
}
