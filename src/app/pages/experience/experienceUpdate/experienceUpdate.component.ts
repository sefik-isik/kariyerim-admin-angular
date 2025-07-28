import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Experience } from '../../../models/component/experience';
import { ExperienceService } from '../../../services/experience.service';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-experienceUpdate',
  templateUrl: './experienceUpdate.component.html',
  styleUrls: ['./experienceUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class ExperienceUpdateComponent implements OnInit {
  @Input() experience: Experience;
  componentTitle = 'Experience Update Form';

  constructor(
    private experienceService: ExperienceService,
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
      this.experienceService.update(this.getModel()).subscribe(
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
      id: this.experience.id,
      experienceName: this.experience.experienceName.trim(),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  experienceNameClear() {
    this.experience.experienceName = '';
  }
}
