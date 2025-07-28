import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UniversityFaculty } from '../../../models/component/universityFaculty';
import { UniversityFacultyService } from '../../../services/universityFaculty.service';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-universityFacultyAdd',
  templateUrl: './universityFacultyAdd.component.html',
  styleUrls: ['./universityFacultyAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class UniversityFacultyAddComponent implements OnInit {
  universityFacultyModel: UniversityFaculty = {} as UniversityFaculty;
  componentTitle = 'Position Add Form';

  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private universityFacultyService: UniversityFacultyService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {}

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.universityFacultyService.add(this.getModel()).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/universityfaculty/universityfacultylisttab',
          ]);
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
      id: '',
      universityFacultyName: this.universityFacultyModel.facultyName.trim(),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  facultyNameClear() {
    this.universityFacultyModel.facultyName = '';
  }
}
