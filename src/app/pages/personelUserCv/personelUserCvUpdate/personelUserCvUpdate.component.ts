import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Language } from '../../../models/component/language';
import { LanguageLevel } from '../../../models/component/languageLevel';
import { PersonelUserCvDTO } from '../../../models/dto/personelUserCvDTO';
import { PersonelUserCvService } from '../../../services/personelUserCv.service';
import { ValidationService } from '../../../services/validation.service';
import { LanguageService } from './../../../services/language.service';
import { LanguageLevelService } from './../../../services/languageLevel.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-personelUserCvUpdate',
  templateUrl: './personelUserCvUpdate.component.html',
  styleUrls: ['./personelUserCvUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class PersonelUserCvUpdateComponent implements OnInit {
  @Input() personelUserCvDTO: PersonelUserCvDTO;
  languages: Language[] = [];
  languageLevels: LanguageLevel[] = [];
  addressDetailText: string;
  admin: boolean = false;
  componentTitle = 'Personel User Cv Update Form';

  constructor(
    private personelUserCvService: PersonelUserCvService,
    private languageService: LanguageService,
    private languageLevelService: LanguageLevelService,
    private toastrService: ToastrService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getLanguages();
    this.getLanguageLevels();
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.personelUserCvService.update(this.getModel()).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/personelusercv/personelusercvlisttab',
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

  getModel(): PersonelUserCvDTO {
    return Object.assign({
      id: this.personelUserCvDTO.id,
      userId: this.personelUserCvDTO.userId,
      personelUserId: this.personelUserCvDTO.personelUserId,
      cvName: this.personelUserCvDTO.cvName.trim(),
      languageId: this.getLanguageId(this.personelUserCvDTO.languageName),
      languageLevelId: this.getLanguageLevelId(
        this.personelUserCvDTO.levelTitle
      ),
      isPrivate: this.personelUserCvDTO.isPrivate,
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  getLanguages() {
    this.languageService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.languages = response.data.filter((f) => f.languageName != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getLanguageLevels() {
    this.languageLevelService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.languageLevels = response.data.filter((f) => f.levelTitle != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getLanguageNameById(languageId: string) {
    return this.languages.find((u) => u.id == languageId)?.languageName;
  }

  getLanguageId(languageName: string): string {
    if (languageName == null || languageName == '') {
      languageName = '-';
    }

    const languageId = this.languages.filter(
      (c) => c.languageName === languageName
    )[0]?.id;

    return languageId;
  }

  getLanguageLevelId(levelTitle: string): string {
    if (levelTitle == null || levelTitle == '') {
      levelTitle = '-';
    }

    const cityId = this.languageLevels.filter(
      (c) => c.levelTitle === levelTitle
    )[0]?.id;

    return cityId;
  }

  cvNameClear() {
    this.personelUserCvDTO.cvName = '';
  }

  languageNameClear() {
    this.personelUserCvDTO.languageName = '';
  }

  levelTitleClear() {
    this.personelUserCvDTO.levelTitle = '';
  }
}
