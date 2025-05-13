import { TaxOfficeService } from './../../../services/taxOffice.service';
import { City } from './../../../models/city';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CityService } from '../../../services/city.service';
import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Region } from '../../../models/region';
import { RegionService } from '../../../services/region.service';
import { TaxOffice } from '../../../models/taxOffice';
import { TaxOfficeDTO } from '../../../models/taxOfficeDTO';
import { CaseService } from '../../../services/case.service';

@Component({
  selector: 'app-taxOfficeUpdate',
  templateUrl: './taxOfficeUpdate.component.html',
  styleUrls: ['./taxOfficeUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class TaxOfficeUpdateComponent implements OnInit {
  updateForm: FormGroup;
  taxOfficeDTOs: TaxOfficeDTO[];
  regions: Region[];
  cities: City[];
  cityId: number;
  regionId: number;
  taxOfficeId: number;

  componentTitle = 'Tax Office Update';

  constructor(
    private cityService: CityService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private regionService: RegionService,
    private taxOfficeService: TaxOfficeService,
    private toastrService: ToastrService,
    private router: Router,
    private caseService: CaseService
  ) {}

  ngOnInit() {
    this.getCities();

    this.createUpdateForm();

    setTimeout(() => {
      this.activatedRoute.params.subscribe((params) => {
        this.getById(params['taxofficeId']);
      });
    }, 500);
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      cityName: ['', [Validators.required, Validators.minLength(3)]],
      regionName: ['', [Validators.required, Validators.minLength(3)]],
      taxOfficeCode: [
        '',
        [Validators.required, Validators.minLength(4), Validators.minLength(5)],
      ],
      taxOfficeName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  getById(id: number) {
    this.taxOfficeService.getById(id).subscribe(
      (response) => {
        this.updateForm.patchValue({
          regionName: response.data.regionName,
          cityName: this.getCityById(response.data.cityId),
          taxOfficeCode: response.data.taxOfficeCode,
          taxOfficeName: response.data.taxOfficeName,
        });
        this.taxOfficeId = response.data.id;
        this.cityId = response.data.cityId;
        this.getRegions();
      },
      (error) => console.error
    );
  }

  update() {
    if (this.updateForm.valid && this.getModel().cityId > 0) {
      this.taxOfficeService.update(this.getModel()).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/taxoffices']);
        },
        (error) => console.error
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): TaxOffice {
    return Object.assign({
      id: this.taxOfficeId,
      cityId: this.getCityId(this.updateForm.value.cityName),
      regionName: this.caseService.capitalizeFirstLetter(
        this.updateForm.value.regionName
      ),
      taxOfficeCode: this.updateForm.value.taxOfficeCode,
      taxOfficeName: this.caseService.capitalizeFirstLetter(
        this.updateForm.value.taxOfficeName
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
      (error) => console.error
    );
  }

  getRegions() {
    this.regionService.getAll().subscribe(
      (response) => {
        if (this.cityId) {
          this.regions = response.data.filter((f) => f.cityId == this.cityId);
        }
      },
      (error) => console.error
    );
  }

  getCityById(cityId: number): string {
    return this.cities.find((c) => c.id == cityId)?.cityName;
  }

  getCityId(cityName: string): number {
    return this.cities.find((c) => c.cityName == cityName)?.id;
  }

  clearInput1() {
    let value = this.updateForm.get('cityName');
    value.reset();
    this.getCities();
  }

  clearInput2() {
    let value = this.updateForm.get('regionName');
    value.reset();
  }

  clearInput3() {
    let value = this.updateForm.get('taxOfficeCode');
    value.reset();
  }

  clearInput4() {
    let value = this.updateForm.get('taxOfficeName');
    value.reset();
  }
}
