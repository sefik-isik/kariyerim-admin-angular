import { CaseService } from './../../../services/case.service';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { CountryService } from '../../../services/country.service';
import { Country } from '../../../models/country';
import { CityService } from '../../../services/city.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { City } from '../../../models/city';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cityAdd',
  templateUrl: './cityAdd.component.html',
  styleUrls: ['./cityAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class CityAddComponent implements OnInit {
  addForm1: FormGroup;
  countries: Country[];
  componentTitle = 'City Add Form';

  constructor(
    private formBuilder: FormBuilder,
    private countryService: CountryService,
    private cityService: CityService,
    private toastrService: ToastrService,
    private router: Router,
    private caseService: CaseService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.createAddForm();
    this.getCountries();
  }

  createAddForm() {
    this.addForm1 = this.formBuilder.group({
      cityName: ['', [Validators.required, Validators.minLength(3)]],
      countryName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  add() {
    if (this.addForm1.valid && this.getModel().countryId > 0) {
      this.cityService.add(this.getModel()).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/cities']);
        },
        (error) => {
          this.toastrService.error(error.error.message);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): City {
    return Object.assign({
      cityName: this.caseService.capitalizeFirstLetter(
        this.addForm1.value.cityName
      ),
      countryId: this.getCountryId(this.addForm1.value.countryName),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  getCountries() {
    this.countryService.getAll().subscribe(
      (response) => {
        this.countries = response.data.filter((f) => f.deletedDate == null);
      },
      (error) => console.error
    );
  }

  getCountryId(countryName: string): number {
    const countryId = this.countries.filter(
      (c) => c.countryName.toLowerCase() === countryName.toLowerCase()
    )[0]?.id;

    return countryId;
  }

  clearInput1() {
    let countryName = this.addForm1.get('countryName');
    countryName.reset();
    this.getCountries();
  }

  clearInput2() {
    let cityName = this.addForm1.get('cityName');
    cityName.reset();
  }
}
