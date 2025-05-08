import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Country } from '../../../models/country';
import { CountryService } from '../../../services/country.service';
import { FilterCountryPipe } from '../../../pipes/filterCountry.pipe';

@Component({
  selector: 'app-countryOfDeleted',
  templateUrl: './countryOfDeleted.component.html',
  styleUrls: ['./countryOfDeleted.component.css'],
  imports: [CommonModule, FormsModule, RouterLink, FilterCountryPipe],
})
export class CountryOfDeletedComponent implements OnInit {
  countries: Country[] = [];

  componentTitle = 'Countries Of Deleted';
  filter1: string;

  constructor(
    private toastrService: ToastrService,
    private countryService: CountryService
  ) {}

  ngOnInit() {
    this.getCountries();
  }

  getCountries() {
    this.countryService.getDeletedAll().subscribe(
      (response) => {
        this.countries = response.data;
      },
      (error) => console.error
    );
  }

  unDelete(country: Country) {
    this.countryService.update(country).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (error) => console.error
    );
  }

  unDeleteAll() {
    this.countries.forEach((country) => {
      this.countryService.update(country).subscribe(
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
    this.getCountries();
  }
}
