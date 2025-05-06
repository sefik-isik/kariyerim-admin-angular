import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CityService } from '../../../services/city.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { City } from '../../../models/city';
import { TaxOfficeDTO } from '../../../models/taxOfficeDTO';
import { TaxOfficeService } from '../../../services/taxOffice.service';
import { FilterTaxOfficePipe } from '../../../pipes/filterTaxOffice.pipe';
import { FilterTaxOfficeByCityPipe } from '../../../pipes/filterTaxOfficeByCity.pipe';

@Component({
  selector: 'app-taxOfficeOfDeleted',
  templateUrl: './taxOfficeOfDeleted.component.html',
  styleUrls: ['./taxOfficeOfDeleted.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    FilterTaxOfficePipe,
    FilterTaxOfficeByCityPipe,
  ],
})
export class TaxOfficeOfDeletedComponent implements OnInit {
  taxOfficeDTOs: TaxOfficeDTO[] = [];
  cities: City[] = [];
  filter1 = '';
  filter2 = '';
  componentTitle = 'Deleted Tax Offices';
  constructor(
    private cityService: CityService,
    private toastrService: ToastrService,
    private taxOfficeService: TaxOfficeService
  ) {}

  ngOnInit() {
    this.getCities();
    this.getTaxOffices();
  }

  getCities() {
    this.cityService.getAllDeletedDTO().subscribe(
      (response) => {
        this.cities = response.data;
      },
      (error) => console.error
    );
  }

  getTaxOffices() {
    this.taxOfficeService.getAllDTO().subscribe(
      (response) => {
        this.taxOfficeDTOs = response.data;
      },
      (error) => console.error
    );
  }

  unDelete(taxOffice: TaxOfficeDTO) {
    this.taxOfficeService.update(taxOffice).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (error) => console.error
    );
  }

  unDeleteAll() {
    this.taxOfficeDTOs.forEach((taxOfficeDTO) => {
      this.taxOfficeService.update(taxOfficeDTO).subscribe(
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
    this.getTaxOffices();
  }

  clearInput2() {
    this.filter2 = null;
    this.getCities();
  }
}
