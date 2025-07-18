import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FacultyService } from '../../../services/faculty.service';
import { Faculty } from '../../../models/component/faculty';
import { CaseService } from '../../../services/helperServices/case.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-facultyUpdate',
  templateUrl: './facultyUpdate.component.html',
  styleUrls: ['./facultyUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class FacultyUpdateComponent implements OnInit {
  @Input() faculty: Faculty;
  componentTitle = 'Faculty Update Form';

  constructor(
    private facultyService: FacultyService,
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
      this.facultyService.update(this.getModel()).subscribe(
        (response) => {
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
      id: this.faculty.id,
      facultyName: this.caseService.capitalizeFirstLetter(
        this.faculty.facultyName.trim()
      ),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  facultyNameClear() {
    this.faculty.facultyName = '';
  }
}
