import { CaseService } from '../../../services/helperServices/case.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LicenseDegree } from '../../../models/component/licenseDegree';
import { LicenseDegreeService } from '../../../services/licenseDegree.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-licenseDegreeUpdate',
  templateUrl: './licenseDegreeUpdate.component.html',
  styleUrls: ['./licenseDegreeUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class LicenseDegreeUpdateComponent implements OnInit {
  @Input() licenseDegree: LicenseDegree;
  componentTitle = 'License Degree Update Form';

  constructor(
    private licenseDegreeService: LicenseDegreeService,
    private toastrService: ToastrService,
    private router: Router,
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
      this.licenseDegreeService.update(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/licensedegree/licensedegreelisttab',
          ]);
        },
        (responseError) => {
          this.toastrService.error(responseError.error.message);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): LicenseDegree {
    return Object.assign({
      id: this.licenseDegree.id,
      licenseDegreeName: this.caseService.capitalizeFirstLetter(
        this.licenseDegree.licenseDegreeName.trim()
      ),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  licenseDegreeNameClear() {
    this.licenseDegree.licenseDegreeName = '';
  }
}
