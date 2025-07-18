import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PersonelUserCvSummaryDTO } from '../../../models/dto/personelUserCvSummaryDTO';
import { PersonelUserCvSummaryService } from '../../../services/personelUserCvSummary.service';
import { ValidationService } from '../../../services/validation.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-personelUserCvSummaryUpdate',
  templateUrl: './personelUserCvSummaryUpdate.component.html',
  styleUrls: ['./personelUserCvSummaryUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class PersonelUserCvSummaryUpdateComponent implements OnInit {
  @Input() personelUserCvSummaryDTO: PersonelUserCvSummaryDTO;
  detailCount: number;
  admin: boolean = false;
  componentTitle = 'Personel User Cv Summary Update Form';

  constructor(
    private personelUserCvSummaryService: PersonelUserCvSummaryService,
    private toastrService: ToastrService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.personelUserCvSummaryService.update(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/personelusercvsummary/personelusercvsummarylisttab',
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

  getModel(): PersonelUserCvSummaryDTO {
    return Object.assign({
      id: this.personelUserCvSummaryDTO.id,
      userId: this.personelUserCvSummaryDTO.userId,
      personelUserId: this.personelUserCvSummaryDTO.personelUserId,
      cvId: this.personelUserCvSummaryDTO.cvId,
      cvSummaryTitle: this.personelUserCvSummaryDTO.cvSummaryTitle.trim(),
      cvSummaryDescription:
        this.personelUserCvSummaryDTO.cvSummaryDescription.trim(),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  count(text: string) {
    return text.length;
  }

  cvNameClear() {
    this.personelUserCvSummaryDTO.cvName = '';
  }

  cvSummaryTitleClear() {
    this.personelUserCvSummaryDTO.cvSummaryTitle = '';
  }

  cvSummaryDescriptionClear() {
    this.personelUserCvSummaryDTO.cvSummaryDescription = '';
  }
}
