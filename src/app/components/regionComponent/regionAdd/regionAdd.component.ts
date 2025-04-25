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

@Component({
  selector: 'app-regionAdd',
  templateUrl: './regionAdd.component.html',
  styleUrls: ['./regionAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class RegionAddComponent implements OnInit {
  addForm1: FormGroup;
  cities: City[];
  componentTitle = 'Region Add Form';

  constructor(
    private formBuilder: FormBuilder,
    private regionService: RegionService,
    private cityService: CityService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createAddForm();
    this.getCities();
  }

  createAddForm() {
    this.addForm1 = this.formBuilder.group({
      regionName: ['', [Validators.required, Validators.minLength(3)]],
      cityName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  add() {
    if (this.addForm1.valid && this.getModel().cityId > 0) {
      this.regionService.add(this.getModel()).subscribe(
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
      regionName: this.capitalizeFirstLetter(this.addForm1.value.regionName),
      cityId: this.getCityId(this.addForm1.value.cityName),
      createDate: new Date(Date.now()).toJSON(),
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
}
