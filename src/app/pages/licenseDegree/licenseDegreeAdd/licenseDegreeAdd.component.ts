import { LicenseDegree } from '../../../models/component/licenseDegree';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CaseService } from '../../../services/helperServices/case.service';
import { LicenseDegreeService } from '../../../services/licenseDegree.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-licenseDegreeAdd',
  templateUrl: './licenseDegreeAdd.component.html',
  styleUrls: ['./licenseDegreeAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class LicenseDegreeAddComponent implements OnInit {
  licenseDegreeModel: LicenseDegree = {} as LicenseDegree;
  componentTitle = 'License Degree Add Form';

  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private licenseDegreeService: LicenseDegreeService,
    private caseService: CaseService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {}

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.licenseDegreeService.add(this.getModel()).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/licensedegree/licensedegreelisttab',
          ]);
        },
        (responseError) => this.validationService.handleErrors(responseError)
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): LicenseDegree {
    return Object.assign({
      id: '',
      licenseDegreeName: this.caseService.capitalizeFirstLetter(
        this.licenseDegreeModel.licenseDegreeName.trim()
      ),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  licenseDegreeNameClear() {
    this.licenseDegreeModel.licenseDegreeName = '';
  }
}
