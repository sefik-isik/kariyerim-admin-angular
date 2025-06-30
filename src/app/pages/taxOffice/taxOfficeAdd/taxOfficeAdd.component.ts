import { TaxOfficeService } from './../../../services/taxOffice.service';
import { RegionService } from './../../../services/region.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { CityService } from '../../../services/city.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { City } from '../../../models/component/city';
import { Region } from '../../../models/component/region';
import { TaxOffice } from '../../../models/component/taxOffice';
import { CaseService } from '../../../services/helperServices/case.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../../services/validation.service';
import { TaxOfficeDTO } from '../../../models/dto/taxOfficeDTO';

@Component({
  selector: 'app-taxOfficeAdd',
  templateUrl: './taxOfficeAdd.component.html',
  styleUrls: ['./taxOfficeAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class TaxOfficeAddComponent implements OnInit {
  taxOfficeModel: TaxOfficeDTO = {} as TaxOfficeDTO;
  cities: City[];
  regions: Region[];
  componentTitle = 'Tax Office Add Form';

  constructor(
    private regionService: RegionService,
    private cityService: CityService,
    private taxOfficeService: TaxOfficeService,
    private toastrService: ToastrService,
    private router: Router,
    private caseService: CaseService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.getCities();
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.taxOfficeService.add(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/taxoffice/taxofficelisttab']);
        },
        (responseError) => console.error
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): TaxOffice {
    return Object.assign({
      id: '',
      regionName: this.caseService.capitalizeFirstLetter(
        this.taxOfficeModel.regionName
      ),
      cityId: this.getCityId(this.taxOfficeModel.cityName),
      taxOfficeCode: this.taxOfficeModel.taxOfficeCode,
      taxOfficeName: this.caseService.capitalizeFirstLetter(
        this.taxOfficeModel.taxOfficeName
      ),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  getCities() {
    this.cityService.getAll().subscribe(
      (response) => {
        this.cities = response.data;
      },
      (responseError) => console.error
    );
  }

  getRegions(cityName: string) {
    this.regionService.getAll().subscribe(
      (response) => {
        if (this.taxOfficeModel.cityName) {
          const cityId = this.getCityId(cityName);
          this.regions = response.data.filter((f) => f.cityId == cityId);
        }
      },
      (responseError) => console.error
    );
  }

  getCityId(cityName: string): string {
    const cityId = this.cities.filter((c) => c.cityName === cityName)[0]?.id;

    return cityId;
  }

  cityNameClear() {
    this.taxOfficeModel.cityName = '';
  }

  regionNameClear() {
    this.taxOfficeModel.regionName = '';
  }

  taxOfficeCodeClear() {
    this.taxOfficeModel.taxOfficeCode = '';
  }

  taxOfficeNameClear() {
    this.taxOfficeModel.taxOfficeName = '';
  }
}
