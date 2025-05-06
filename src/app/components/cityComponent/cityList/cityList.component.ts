import { CountryService } from './../../../services/country.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CityService } from '../../../services/city.service';
import { FilterCityPipe } from '../../../pipes/filterCity.pipe';
import { ToastrService } from 'ngx-toastr';
import { FilterCityByCountryPipe } from '../../../pipes/filterCityByCountry.pipe';
import { Country } from '../../../models/country';
import { AuthService } from '../../../services/auth.service';
import { CityDTO } from '../../../models/cityDTO';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { City } from '../../../models/city';
import { CityUpdateComponent } from '../cityUpdate/cityUpdate.component';
import { CityDetailComponent } from '../cityDetail/cityDetail.component';

@Component({
  selector: 'app-cityList',
  templateUrl: './cityList.component.html',
  styleUrls: ['./cityList.component.css'],
  imports: [CommonModule, FormsModule, FilterCityPipe, FilterCityByCountryPipe],
})
export class CityListComponent implements OnInit {
  cityDTOs: CityDTO[] = [];
  countries: Country[] = [];
  filter1 = '';
  filter2 = '';
  componentTitle = 'Cities';
  constructor(
    private cityService: CityService,
    private toastrService: ToastrService,
    private countryService: CountryService,
    private authService: AuthService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getCities();
    this.getCountries();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getCities();
      }
    });
  }

  //UMAF3IDUH1WGX3FR

  getCountries() {
    this.countryService.getAll().subscribe(
      (response) => {
        this.countries = response.data;
      },
      (error) => console.error
    );
  }

  getCities() {
    this.cityService.getAllDTO().subscribe(
      (response) => {
        this.cityDTOs = response.data;
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
    return this.countries.find((f) => f.countryName == countryName)?.id;
  }

  open(city: City) {
    const modalRef = this.modalService.open(CityUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.city = city;
  }

  openDetail(cityDTO: CityDTO) {
    const modalRef = this.modalService.open(CityDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.cityDTO = cityDTO;
  }

  clearInput1() {
    this.filter1 = null;
  }

  clearInput2() {
    this.filter2 = null;
  }
}
