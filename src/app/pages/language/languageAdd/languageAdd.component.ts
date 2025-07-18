import { Component, numberAttribute, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LanguageService } from '../../../services/language.service';
import { Language } from '../../../models/component/language';
import { CaseService } from '../../../services/helperServices/case.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-languageAdd',
  templateUrl: './languageAdd.component.html',
  styleUrls: ['./languageAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class LanguageAddComponent implements OnInit {
  languageModel: Language = {} as Language;
  componentTitle = 'Language Add Form';

  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private languageService: LanguageService,
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
      this.languageService.add(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/language/languagelisttab']);
        },
        (responseError) => {
          this.validationService.handleErrors(responseError);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): Language {
    return Object.assign({
      id: '',
      languageName: this.caseService.capitalizeFirstLetter(
        this.languageModel.languageName.trim()
      ),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  languageNameClear() {
    this.languageModel.languageName = '';
  }
}
