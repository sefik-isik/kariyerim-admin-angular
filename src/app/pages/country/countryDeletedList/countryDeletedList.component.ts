import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Country } from '../../../models/component/country';
import { CountryService } from '../../../services/country.service';
import { FilterCountryPipe } from '../../../pipes/filterCountry.pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CountryUpdateComponent } from '../countryUpdate/countryUpdate.component';
import { CountryDetailComponent } from '../countryDetail/countryDetail.component';

@Component({
  selector: 'app-countryDeletedList',
  templateUrl: './countryDeletedList.component.html',
  styleUrls: ['./countryDeletedList.component.css'],
  imports: [CommonModule, FormsModule, FilterCountryPipe],
})
export class CountryDeletedListComponent implements OnInit {
  countries: Country[] = [];

  componentTitle = 'Deleted Countries';
  filter1: string;

  constructor(
    private toastrService: ToastrService,
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
    this.countryService.getDeletedAll().subscribe(
      (response) => {
        this.countries = response.data;
      },
      (responseError) => console.error
    );
  }

  unDelete(country: Country) {
    this.countryService.update(country).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (responseError) => console.error
    );
  }

  unDeleteAll() {
    this.countries.forEach((country) => {
      this.countryService.update(country).subscribe(
        (response) => {},
        (responseError) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  terminate(country: Country) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.countryService.terminate(country).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile kalıcı olarak silindi');
        this.ngOnInit();
      },
      (responseError) => console.log(responseError)
    );
  }

  terminateAll() {
    if (!confirm('Tümünü Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.countries.forEach((country) => {
      this.countryService.terminate(country).subscribe(
        (response) => {},
        (responseError) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile kalıcı olarak silindi');
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
