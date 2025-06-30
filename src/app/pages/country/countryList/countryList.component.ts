import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { Country } from '../../../models/component/country';
import { CountryService } from '../../../services/country.service';
import { FilterCountryPipe } from '../../../pipes/filterCountry.pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CountryUpdateComponent } from '../countryUpdate/countryUpdate.component';
import { CountryDetailComponent } from '../countryDetail/countryDetail.component';

@Component({
  selector: 'app-countryList',
  templateUrl: './countryList.component.html',
  styleUrls: ['./countryList.component.css'],
  imports: [CommonModule, FormsModule, FilterCountryPipe],
})
export class CountryListComponent implements OnInit {
  countries: Country[] = [];

  componentTitle = 'Countries';
  filter1: string;

  constructor(
    private toastrService: ToastrService,
    private authService: AuthService,
    private countryService: CountryService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getCountries();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getCountries();
      }
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
      (responseError) => console.error
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
        (responseError) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
    }, 500);
  }

  open(country: Country) {
    const modalRef = this.modalService.open(CountryUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.country = country;
  }

  openDetail(country: Country) {
    const modalRef = this.modalService.open(CountryDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.country = country;
  }

  clearInput1() {
    this.filter1 = null;
    this.getCountries();
  }
}
