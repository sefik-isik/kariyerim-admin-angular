import { City } from '../../../models/city';
import { Country } from '../../../models/country';
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
import { CountryService } from '../../../services/country.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CaseService } from '../../../services/case.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cityUpdate',
  templateUrl: './cityUpdate.component.html',
  styleUrls: ['./cityUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class CityUpdateComponent implements OnInit {
  updateForm: FormGroup;
  @Input() city: City;
  countries: Country[];
  cities: City[];
  cityId: number;
  countryId: number;

  componentTitle = 'City Update';

  constructor(
    private cityService: CityService,
    private formBuilder: FormBuilder,
    private countryService: CountryService,
    private toastrService: ToastrService,
    private router: Router,
    private caseService: CaseService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.getCountries();
    this.createUpdateForm();

    setTimeout(() => {
      this.getById(this.city.id);
    }, 200);

    // setTimeout(() => {
    //   this.activatedRoute.params.subscribe((params) => {
    //     this.getById(params['cityId']);
    //   });
    // }, 500);
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      cityName: ['', [Validators.required, Validators.minLength(3)]],
      countryName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  getById(id: number) {
    this.cityService.getById(id).subscribe(
      (response) => {
        this.updateForm.patchValue({
          cityName: response.data.cityName,
          countryName: this.getCountryById(response.data.countryId),
        });
        this.cityId = response.data.id;
        this.countryId = response.data.countryId;
      },
      (error) => console.error
    );
  }

  update() {
    if (this.updateForm.valid && this.getModel().countryId > 0) {
      this.cityService.update(this.getModel()).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');

          this.router.navigate(['dashboard/cities/citylisttab']);
          this.activeModal.close();
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
      id: this.cityId,
      countryId: this.getCountryId(this.updateForm.value.countryName),
      cityName: this.caseService.capitalizeFirstLetter(
        this.updateForm.value.cityName
      ),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
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

  getCountryById(countryId: number): string {
    return this.countries.find((c) => c.id == countryId)?.countryName;
  }

  getCountryId(countryName: string): number {
    return this.countries.find((c) => c.countryName == countryName)?.id;
  }

  clearInput1() {
    let countryName = this.updateForm.get('countryName');
    countryName.reset();
    this.getCountries();
  }

  clearInput2() {
    let cityName = this.updateForm.get('cityName');
    cityName.reset();
  }
}
