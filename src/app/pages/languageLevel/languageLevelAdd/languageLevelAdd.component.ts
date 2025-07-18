import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LanguageLevelService } from '../../../services/languageLevel.service';
import { LanguageLevel } from '../../../models/component/languageLevel';
import { CaseService } from '../../../services/helperServices/case.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-languageLevelAdd',
  templateUrl: './languageLevelAdd.component.html',
  styleUrls: ['./languageLevelAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class LanguageLevelAddComponent implements OnInit {
  languageLevelModel: LanguageLevel = {} as LanguageLevel;
  componentTitle = 'Language Level Add Form';

  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private languageLevelService: LanguageLevelService,
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
      this.languageLevelService.add(this.getModel()).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/languagelevel/languagelevellisttab',
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

  getModel(): LanguageLevel {
    return Object.assign({
      id: '',
      level: this.languageLevelModel.level,
      levelTitle: this.caseService.capitalizeFirstLetter(
        this.languageLevelModel.levelTitle.trim()
      ),
      levelDescription: this.caseService.capitalizeFirstLetter(
        this.languageLevelModel.levelDescription.trim()
      ),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  levelClear() {
    this.languageLevelModel.level = 0;
  }

  levelTitleClear() {
    this.languageLevelModel.levelTitle = '';
  }

  levelDescriptionClear() {
    this.languageLevelModel.levelDescription = '';
  }
}
