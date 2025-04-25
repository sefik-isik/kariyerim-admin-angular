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

@Component({
  selector: 'app-regionUpdate',
  templateUrl: './regionUpdate.component.html',
  styleUrls: ['./regionUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class RegionUpdateComponent implements OnInit {
  uptadeForm: FormGroup;
  regions: Region[];
  cities: City[];
  cityId: number;
  regionId: number;
  componentTitle = 'Region Update';

  constructor(
    private cityService: CityService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private regionService: RegionService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCities();

    this.createUpdateForm();

    setTimeout(() => {
      this.activatedRoute.params.subscribe((params) => {
        this.getById(params['regionId']);
      });
    }, 500);
  }

  createUpdateForm() {
    this.uptadeForm = this.formBuilder.group({
      cityName: ['', [Validators.required, Validators.minLength(3)]],
      regionName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  getById(id: number) {
    this.regionService.getById(id).subscribe(
      (response) => {
        this.uptadeForm.patchValue({
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
    if (this.uptadeForm.valid && this.getModel().cityId > 0) {
      this.regionService.update(this.getModel()).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/regions']);
        },
        (error) => console.log(error)
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): Region {
    return Object.assign({
      id: this.regionId,
      cityId: this.getCityId(this.uptadeForm.value.cityName),
      regionName: this.capitalizeFirstLetter(this.uptadeForm.value.regionName),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  capitalizeFirstLetter(str: string) {
    let strs: string[] = str.split(' ');
    let strText: string = '';

    strs.forEach((str) => {
      str = str.toLowerCase();
      str = str[0].toUpperCase() + str.slice(1);
      strText = strText + ' ' + str;
      strText = strText.trim();
    });
    return strText;
  }

  getCities() {
    this.cityService.getAll().subscribe(
      (response) => {
        this.cities = response.data.filter((f) => f.deletedDate == null);
      },
      (error) => console.error
    );
  }

  getRegions() {
    this.regionService.getAll().subscribe(
      (response) => {
        if (this.cityId) {
          this.regions = response.data
            .filter((f) => f.deletedDate == null)
            .filter((f) => f.cityId == this.cityId);
        }
      },
      (error) => console.error
    );
  }

  getCityById(cityId: number): string {
    return this.cities.find((c) => c.id == cityId)?.cityName;
  }

  getCityId(cityName: string): number {
    return this.cities.find(
      (c) => c.cityName.toLowerCase() == cityName.toLowerCase()
    )?.id;
  }

  clearInput1() {
    let value = this.uptadeForm.get('cityName');
    value.reset();
    this.getCities();
  }

  clearInput2() {
    let value = this.uptadeForm.get('regionName');
    value.reset();
  }
}
