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
import { CaseService } from '../../../services/case.service';

@Component({
  selector: 'app-countryUpdate',
  templateUrl: './countryUpdate.component.html',
  styleUrls: ['./countryUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class CountryUpdateComponent implements OnInit {
  updateForm: FormGroup;
  countryId: number;
  componentTitle = 'Country Update';

  constructor(
    private countryService: CountryService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private caseService: CaseService
  ) {}

  ngOnInit() {
    this.createUpdateForm();
    this.activatedRoute.params.subscribe((params) => {
      this.getById(params['countryId']);
    });
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      countryName: ['', [Validators.required, Validators.minLength(3)]],
      countryIso: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  getById(countryId: number) {
    this.countryService.getById(countryId).subscribe(
      (response) => {
        this.updateForm.patchValue({
          countryName: response.data.countryName,
          countryIso: response.data.countryIso,
        });
        this.countryId = countryId;
      },
      (error) => console.error
    );
  }

  update() {
    if (this.updateForm.valid) {
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
      countryName: this.caseService.capitalizeFirstLetter(
        this.updateForm.value.countryName
      ),
      countryIso: this.updateForm.value.countryIso,
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  clearInput1() {
    let value = this.updateForm.get('countryName');
    value.reset();
  }

  clearInput2() {
    let value = this.updateForm.get('countryIso');
    value.reset();
  }
}
