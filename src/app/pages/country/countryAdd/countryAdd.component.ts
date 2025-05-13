import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { CountryService } from '../../../services/country.service';
import { Country } from '../../../models/country';
import { CaseService } from '../../../services/case.service';

@Component({
  selector: 'app-countryAdd',
  templateUrl: './countryAdd.component.html',
  styleUrls: ['./countryAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class CountryAddComponent implements OnInit {
  addForm: FormGroup;

  componentTitle = 'Add Country Form';

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private countryService: CountryService,
    private caseService: CaseService
  ) {}

  ngOnInit() {
    this.createAddForm();
  }

  createAddForm() {
    this.addForm = this.formBuilder.group({
      countryName: ['', [Validators.required, Validators.minLength(3)]],
      countryIso: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  add() {
    if (this.addForm.valid && this.getModel()) {
      this.countryService.add(this.getModel()).subscribe(
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
      countryName: this.caseService.capitalizeFirstLetter(
        this.addForm.value.countryName
      ),
      countryIso: this.caseService.capitalizeFirstLetter(
        this.addForm.value.countryIso
      ),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  clearInput1() {
    let value = this.addForm.get('countryName');
    value.reset();
  }

  clearInput2() {
    let value = this.addForm.get('countryIso');
    value.reset();
  }
}
