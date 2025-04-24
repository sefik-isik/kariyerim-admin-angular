import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
import { CountryService } from '../../../services/country.service';
import { Country } from '../../../models/country';

@Component({
  selector: 'app-countryUpdate',
  templateUrl: './countryUpdate.component.html',
  styleUrls: ['./countryUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class CountryUpdateComponent implements OnInit {
  uptadeForm: FormGroup;
  countryId: number;
  componentTitle = 'Country Update';

  constructor(
    private countryService: CountryService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createUpdateForm();
    this.activatedRoute.params.subscribe((params) => {
      this.getById(params['countryId']);
    });
  }

  createUpdateForm() {
    this.uptadeForm = this.formBuilder.group({
      countryName: ['', [Validators.required, Validators.minLength(3)]],
      countryIso: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  getById(countryId: number) {
    this.countryService.getById(countryId).subscribe(
      (response) => {
        this.uptadeForm.patchValue({
          countryName: response.data.countryName,
          countryIso: response.data.countryIso,
        });
        this.countryId = countryId;
      },
      (error) => console.error
    );
  }

  update() {
    if (this.uptadeForm.valid) {
      this.countryService.update(this.getModel()).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/countries']);
        },
        (error) => {
          this.toastrService.error(error.error.message);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): Country {
    return Object.assign({
      id: this.countryId,
      countryName: this.uptadeForm.value.countryName,
      countryIso: this.uptadeForm.value.countryIso,
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  clearInput1() {
    let value = this.uptadeForm.get('countryName');
    value.reset();
  }

  clearInput2() {
    let value = this.uptadeForm.get('countryIso');
    value.reset();
  }
}
