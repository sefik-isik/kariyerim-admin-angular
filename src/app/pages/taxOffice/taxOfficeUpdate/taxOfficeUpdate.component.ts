import { TaxOfficeService } from './../../../services/taxOffice.service';
import { City } from '../../../models/component/city';
import { Component, Input, OnInit } from '@angular/core';
import { CityService } from '../../../services/city.service';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Region } from '../../../models/component/region';
import { RegionService } from '../../../services/region.service';
import { TaxOffice } from '../../../models/component/taxOffice';
import { TaxOfficeDTO } from '../../../models/dto/taxOfficeDTO';
import { CaseService } from '../../../services/helperServices/case.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-taxOfficeUpdate',
  templateUrl: './taxOfficeUpdate.component.html',
  styleUrls: ['./taxOfficeUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class TaxOfficeUpdateComponent implements OnInit {
  @Input() taxOfficeDTO: TaxOfficeDTO;
  taxOfficeDTOs: TaxOfficeDTO[];
  regions: Region[];
  cities: City[];
  componentTitle = 'Tax Office Update Form';

  constructor(
    private cityService: CityService,
    private regionService: RegionService,
    private taxOfficeService: TaxOfficeService,
    private toastrService: ToastrService,
    private router: Router,
    private caseService: CaseService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.getCities();

    setTimeout(() => {
      this.getById(this.taxOfficeDTO.id);
    }, 200);
  }

  getById(id: string) {
    this.taxOfficeService.getById(id).subscribe(
      (response) => {
        this.taxOfficeDTO.id = response.data.id;
        this.taxOfficeDTO.cityId = response.data.cityId;
      },
      (responseError) => console.error
    );
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.taxOfficeService.update(this.getModel()).subscribe(
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
      id: this.taxOfficeDTO.id,
      cityId: this.getCityId(this.taxOfficeDTO.cityName),
      regionName: this.caseService.capitalizeFirstLetter(
        this.taxOfficeDTO.regionName
      ),
      taxOfficeCode: this.taxOfficeDTO.taxOfficeCode,
      taxOfficeName: this.caseService.capitalizeFirstLetter(
        this.taxOfficeDTO.taxOfficeName
      ),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
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
        if (this.taxOfficeDTO.cityName) {
          const cityId = this.getCityId(cityName);
          this.regions = response.data.filter((f) => f.cityId == cityId);
        }
      },
      (responseError) => console.error
    );
  }

  getCityById(cityId: string): string {
    return this.cities.find((c) => c.id == cityId)?.cityName;
  }

  getCityId(cityName: string): string {
    return this.cities.find((c) => c.cityName == cityName)?.id;
  }

  cityNameClear() {
    this.taxOfficeDTO.cityName = '';
  }

  regionNameClear() {
    this.taxOfficeDTO.regionName = '';
  }

  taxOfficeCodeClear() {
    this.taxOfficeDTO.taxOfficeCode = '';
  }

  taxOfficeNameClear() {
    this.taxOfficeDTO.taxOfficeName = '';
  }
}
