import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CityService } from '../../../services/city.service';
import { ToastrService } from 'ngx-toastr';
import { FilterCityPipe } from '../../../pipes/filterCity.pipe';
import { FilterCityByCountryPipe } from '../../../pipes/filterCityByCountry.pipe';
import { CountryService } from '../../../services/country.service';
import { Country } from '../../../models/country';
import { CityDTO } from '../../../models/cityDTO';
import { City } from '../../../models/city';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CityUpdateComponent } from '../cityUpdate/cityUpdate.component';
import { CityDetailComponent } from '../cityDetail/cityDetail.component';

@Component({
  selector: 'app-cityDeletedList',
  templateUrl: './cityDeletedList.component.html',
  styleUrls: ['./cityDeletedList.component.css'],
  imports: [CommonModule, FormsModule, FilterCityPipe, FilterCityByCountryPipe],
})
export class CityDeletedListComponent implements OnInit {
  cityDTOs: CityDTO[] = [];
  countries: Country[];
  dataLoaded = false;
  filter1 = '';
  filter2 = '';

  componentTitle = 'Deleted Cities';
  constructor(
    private cityService: CityService,
    private toastrService: ToastrService,
    private countryService: CountryService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getCountries();
    this.getCities();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getCities();
      }
    });
  }

  getCountries() {
    this.countryService.getAll().subscribe(
      (response) => {
        this.countries = response.data;
      },
      (error) => console.error
    );
  }

  getCities() {
    this.cityService.getDeletedAllDTO().subscribe(
      (response) => {
        this.cityDTOs = response.data;
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

  open(cityDTO: CityDTO) {
    const modalRef = this.modalService.open(CityUpdateComponent, {
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
    this.getCities();
  }

  clearInput2() {
    this.filter2 = null;
    this.getCities();
  }
}
