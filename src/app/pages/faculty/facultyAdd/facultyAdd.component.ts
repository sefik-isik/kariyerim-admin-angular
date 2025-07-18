import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FacultyService } from '../../../services/faculty.service';
import { Faculty } from '../../../models/component/faculty';
import { CaseService } from '../../../services/helperServices/case.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-facultyAdd',
  templateUrl: './facultyAdd.component.html',
  styleUrls: ['./facultyAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class FacultyAddComponent implements OnInit {
  facultModel: Faculty = {} as Faculty;
  componentTitle = 'Faculty Add Form';

  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private facultyService: FacultyService,
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
      this.facultyService.add(this.getModel()).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/faculty/facultylisttab']);
        },
        (responseError) => {
          this.validationService.handleErrors(responseError);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): Faculty {
    return Object.assign({
      id: '',
      facultyName: this.caseService.capitalizeFirstLetter(
        this.facultModel.facultyName.trim()
      ),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  facultyNameClear() {
    this.facultModel.facultyName = '';
  }
}
