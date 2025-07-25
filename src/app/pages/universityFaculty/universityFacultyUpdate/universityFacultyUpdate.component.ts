import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UniversityFaculty } from '../../../models/component/universityFaculty';
import { UniversityFacultyService } from '../../../services/universityFaculty.service';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-universityFacultyUpdate',
  templateUrl: './universityFacultyUpdate.component.html',
  styleUrls: ['./universityFacultyUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class UniversityFacultyUpdateComponent implements OnInit {
  @Input() universityFaculty: UniversityFaculty;
  componentTitle = 'UniversityFaculty Update Form';

  constructor(
    private universityFacultyService: UniversityFacultyService,
    private toastrService: ToastrService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {}

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.universityFacultyService.update(this.getModel()).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/position/positionlisttab']);
        },
        (responseError) => {
          this.validationService.handleErrors(responseError);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): UniversityFaculty {
    return Object.assign({
      id: this.universityFaculty.id,
      facultyName: this.universityFaculty.facultyName.trim(),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  facultyNameClear() {
    this.universityFaculty.facultyName = '';
  }
}
