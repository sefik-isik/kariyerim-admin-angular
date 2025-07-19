import { UtulityService } from './../../../services/utulity.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Country } from '../../../models/component/country';
import { CityDTO } from '../../../models/dto/cityDTO';
import { FilterCityPipe } from '../../../pipes/filterCity.pipe';
import { FilterCityByCountryPipe } from '../../../pipes/filterCityByCountry.pipe';
import { AuthService } from '../../../services/auth.service';
import { CityService } from '../../../services/city.service';
import { CountryService } from '../../../services/country.service';
import { CityDetailComponent } from '../cityDetail/cityDetail.component';
import { CityUpdateComponent } from '../cityUpdate/cityUpdate.component';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-cityList',
  templateUrl: './cityList.component.html',
  styleUrls: ['./cityList.component.css'],
  imports: [CommonModule, FormsModule, FilterCityPipe, FilterCityByCountryPipe],
})
export class CityListComponent implements OnInit {
  componentTitle = 'Cities';
  cityDTOs: CityDTO[] = [];
  countries: Country[] = [];
  filter1 = '';
  filter2 = '';
  admin: boolean = false;

  constructor(
    private cityService: CityService,
    private toastrService: ToastrService,
    private countryService: CountryService,
    private authService: AuthService,
    private modalService: NgbModal,
    private validationService: ValidationService
  ) // private utulityService: UtulityService<CityService, CountryService, CityDTO>
  {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();

    this.getCities();
    this.getCountries();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getCities();
      }
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

  // get() {
  //   this.utulityService.getEntities();
  // }

  getCities() {
    this.cityService.getAllDTO().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);

        this.cityDTOs = response.data.filter((f) => f.cityName != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getCountryId(countryName: string): string {
    return this.countries.find((f) => f.countryName == countryName)?.id;
  }

  delete(city: CityDTO) {
    if (!this.admin) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.cityService.delete(city).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.toastrService.success('Başarı ile silindi');
        this.ngOnInit();
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  deleteAll() {
    if (!this.admin) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Tümünü Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.cityDTOs.forEach((city) => {
      this.cityService.delete(city).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
        },
        (responseError) => this.validationService.handleErrors(responseError)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
    }, 500);
  }

  open(cityDTO: CityDTO) {
    if (!this.admin) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }

    const modalRef = this.modalService.open(CityUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.cityDTO = cityDTO;
  }

  openDetail(cityDTO: CityDTO) {
    if (!this.admin) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    const modalRef = this.modalService.open(CityDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
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
