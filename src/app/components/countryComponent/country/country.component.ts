import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { Country } from '../../../models/country';
import { CountryService } from '../../../services/country.service';
import { FilterCountryPipe } from '../../../pipes/filterCountry.pipe';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
  imports: [CommonModule, FormsModule, RouterLink, FilterCountryPipe],
})
export class CountryComponent implements OnInit {
  countries: Country[] = [];

  componentTitle = 'Countries';
  filter1: string;

  constructor(
    private toastrService: ToastrService,
    private authService: AuthService,
    private countryService: CountryService
  ) {}

  ngOnInit() {
    this.getCountries();
  }

  getCountries() {
    this.countryService.getAll().subscribe(
      (response) => {
        this.countries = response.data;
      },
      (error) => console.error
    );
  }

  delete(country: Country) {
    if (!this.authService.isAdmin('status')) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.countryService.delete(country).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile silindi');
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
    this.countries.forEach((country) => {
      this.countryService.delete(country).subscribe(
        (response) => {},
        (error) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
    }, 500);
  }

  clearInput1() {
    this.filter1 = null;
    this.getCountries();
  }
}
