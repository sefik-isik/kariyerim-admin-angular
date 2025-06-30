import { Component, Input, OnInit } from '@angular/core';

import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LanguageLevelService } from '../../../services/languageLevel.service';
import { LanguageLevel } from '../../../models/component/languageLevel';
import { CaseService } from '../../../services/helperServices/case.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-languageLevelUpdate',
  templateUrl: './languageLevelUpdate.component.html',
  styleUrls: ['./languageLevelUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class LanguageLevelUpdateComponent implements OnInit {
  @Input() languageLevel: LanguageLevel;
  componentTitle = 'Language Level Update Form';

  constructor(
    private languageLevelService: LanguageLevelService,
    private toastrService: ToastrService,
    private router: Router,
    private caseService: CaseService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.getById(this.languageLevel.id);
    }, 200);
  }

  getById(id: string) {
    this.languageLevelService.getById(id).subscribe(
      (response) => {
        this.languageLevel.id = id;
        this.languageLevel.level = response.data.level;
        this.languageLevel.levelTitle = response.data.levelTitle;
        this.languageLevel.levelDescription = response.data.levelDescription;
      },
      (responseError) => console.error
    );
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.languageLevelService.update(this.getLModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/languagelevel/languagelevellisttab',
          ]);
        },
        (responseError) => {
          this.toastrService.error(responseError.error.message);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getLModel(): LanguageLevel {
    return Object.assign({
      id: this.languageLevel.id,
      level: this.languageLevel.level,
      levelTitle: this.caseService.capitalizeFirstLetter(
        this.languageLevel.levelTitle
      ),
      levelDescription: this.caseService.capitalizeFirstLetter(
        this.languageLevel.levelDescription
      ),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  levelClear() {
    this.languageLevel.level = 0;
  }

  levelTitleClear() {
    this.languageLevel.levelTitle = '';
  }

  levelDescriptionClear() {
    this.languageLevel.levelDescription = '';
  }
}
