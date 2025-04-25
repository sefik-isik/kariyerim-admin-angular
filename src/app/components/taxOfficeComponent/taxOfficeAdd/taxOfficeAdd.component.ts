import { TaxOfficeService } from './../../../services/taxOffice.service';
import { RegionService } from './../../../services/region.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { CityService } from '../../../services/city.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { City } from '../../../models/city';
import { Region } from '../../../models/region';
import { TaxOffice } from '../../../models/taxOffice';

@Component({
  selector: 'app-taxOfficeAdd',
  templateUrl: './taxOfficeAdd.component.html',
  styleUrls: ['./taxOfficeAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class TaxOfficeAddComponent implements OnInit {
  addForm1: FormGroup;
  cities: City[];
  regions: Region[];
  componentTitle = 'Tax Office Add Form';

  constructor(
    private formBuilder: FormBuilder,
    private regionService: RegionService,
    private cityService: CityService,
    private taxOfficeService: TaxOfficeService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createAddForm();
    this.getCities();
  }

  createAddForm() {
    this.addForm1 = this.formBuilder.group({
      cityName: ['', [Validators.required, Validators.minLength(3)]],
      regionName: ['', [Validators.required, Validators.minLength(3)]],
      taxOfficeCode: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(5)],
      ],
      taxOfficeName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  add() {
    if (this.addForm1.valid && this.getModel().cityId > 0) {
      this.taxOfficeService.add(this.getModel()).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/taxoffices']);
        },
        (error) => console.log(error)
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): TaxOffice {
    return Object.assign({
      regionName: this.capitalizeFirstLetter(this.addForm1.value.regionName),
      cityId: this.getCityId(this.addForm1.value.cityName),
      taxOfficeCode: this.addForm1.value.taxOfficeCode,
      taxOfficeName: this.capitalizeFirstLetter(
        this.addForm1.value.taxOfficeName
      ),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  getCities() {
    this.cityService.getAll().subscribe(
      (response) => {
        this.cities = response.data.filter((f) => f.deletedDate == null);
      },
      (error) => console.error
    );
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

  getRegions() {
    this.regionService.getAll().subscribe(
      (response) => {
        if (this.addForm1.value.cityName) {
          const cityId = this.getCityId(this.addForm1.value.cityName);

          this.regions = response.data
            .filter((f) => f.deletedDate == null)
            .filter((f) => f.cityId == cityId);
        }
      },
      (error) => console.error
    );
  }

  getCityId(cityName: string): number {
    const cityId = this.cities.filter(
      (c) => c.cityName.toLowerCase() === cityName.toLowerCase()
    )[0]?.id;

    return cityId;
  }

  clearInput1() {
    let value = this.addForm1.get('cityName');
    value.reset();
    this.getCities();
  }

  clearInput2() {
    let value = this.addForm1.get('regionName');
    value.reset();
  }

  clearInput3() {
    let value = this.addForm1.get('taxOfficeCode');
    value.reset();
  }

  clearInput4() {
    let value = this.addForm1.get('taxOfficeName');
    value.reset();
  }
}
