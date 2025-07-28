import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CountryService } from '../../../services/country.service';
import { Country } from '../../../models/component/country';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-countryAdd',
  templateUrl: './countryAdd.component.html',
  styleUrls: ['./countryAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class CountryAddComponent implements OnInit {
  componentTitle = 'Add Country Form';
  countryModel: Country = {} as Country;

  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private countryService: CountryService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {}

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.countryService.add(this.getModel()).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/country/countrylisttab']);
        },
        (responseError) => {
          this.validationService.handleErrors(responseError);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): Country {
    return Object.assign({
      id: '',
      countryName: this.countryModel.countryName.trim(),
      countryIso: this.countryModel.countryIso.trim(),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  countryNameClear() {
    this.countryModel.countryName = '';
  }

  countryIsoClear() {
    this.countryModel.countryIso = '';
  }
}
