import { City } from './../../../models/city';
import { Component, Input, OnInit } from '@angular/core';

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
import { CaseService } from '../../../services/case.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-regionUpdate',
  templateUrl: './regionUpdate.component.html',
  styleUrls: ['./regionUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class RegionUpdateComponent implements OnInit {
  updateForm: FormGroup;
  @Input() region: Region;
  regions: Region[];
  cities: City[];
  cityId: number;
  regionId: number;

  componentTitle = 'Region Update Form';

  constructor(
    private cityService: CityService,

    private formBuilder: FormBuilder,
    private regionService: RegionService,
    private toastrService: ToastrService,
    private router: Router,
    private caseService: CaseService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.getCities();

    this.createUpdateForm();

    setTimeout(() => {
      this.getById(this.region.id);
    }, 200);
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      cityName: ['', [Validators.required, Validators.minLength(3)]],
      regionName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  getById(id: number) {
    this.regionService.getById(id).subscribe(
      (response) => {
        this.updateForm.patchValue({
          regionName: response.data.regionName,
          cityName: this.getCityById(response.data.cityId),
        });
        this.regionId = response.data.id;
        this.cityId = response.data.cityId;
        this.getRegions();
      },
      (error) => console.error
    );
  }

  update() {
    if (this.updateForm.valid && this.getModel().cityId > 0) {
      this.regionService.update(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/regions']);
        },
        (error) => console.error
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): Region {
    return Object.assign({
      id: this.regionId,
      cityId: this.getCityId(this.updateForm.value.cityName),
      regionName: this.caseService.capitalizeFirstLetter(
        this.updateForm.value.regionName
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
}
