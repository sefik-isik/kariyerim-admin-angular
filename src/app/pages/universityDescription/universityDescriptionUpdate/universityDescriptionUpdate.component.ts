import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UniversityDescription } from '../../../models/component/universityDescription';
import { UniversityDescriptionDTO } from '../../../models/dto/universityDescriptionDTO';
import { UniversityDescriptionService } from '../../../services/universityDescription.service';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-universityDescriptionUpdate',
  templateUrl: './universityDescriptionUpdate.component.html',
  styleUrls: ['./universityDescriptionUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class UniversityDescriptionUpdateComponent implements OnInit {
  @Input() universityDescriptionDTO: UniversityDescriptionDTO;
  universityDescriptionDTOs: UniversityDescriptionDTO[];
  descriptionCount: number;
  componentTitle = 'University Description Update Form';

  constructor(
    private universityDescriptionService: UniversityDescriptionService,
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
      this.universityDescriptionService.update(this.getModel()).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/universitydescription/universitydescriptionlisttab',
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

  getModel(): UniversityDescription {
    return Object.assign({
      id: this.universityDescriptionDTO.id,
      universityId: this.universityDescriptionDTO.universityId,
      title: this.universityDescriptionDTO.title.trim(),
      description: this.universityDescriptionDTO.description.trim(),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  countDescription() {
    this.descriptionCount = this.universityDescriptionDTO.description.length;
  }

  titleClear() {
    this.universityDescriptionDTO.title = '';
  }

  descriptionClear() {
    this.universityDescriptionDTO.description = '';
  }
}
