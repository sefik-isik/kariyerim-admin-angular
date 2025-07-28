import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../../services/validation.service';
import { Experience } from '../../../models/component/experience';
import { ExperienceService } from '../../../services/experience.service';

@Component({
  selector: 'app-experienceAdd',
  templateUrl: './experienceAdd.component.html',
  styleUrls: ['./experienceAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class ExperienceAddComponent implements OnInit {
  experienceModel: Experience = {} as Experience;
  componentTitle = 'Experience Add Form';

  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private experienceService: ExperienceService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {}

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.experienceService.add(this.getModel()).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/experience/experiencelisttab']);
        },
        (responseError) => {
          this.validationService.handleErrors(responseError);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): Experience {
    return Object.assign({
      id: '',
      experienceName: this.experienceModel.experienceName.trim(),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  experienceNameClear() {
    this.experienceModel.experienceName = '';
  }
}
