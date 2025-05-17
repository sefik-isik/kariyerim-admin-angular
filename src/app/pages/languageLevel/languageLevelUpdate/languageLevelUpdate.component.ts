import { Component, Input, OnInit } from '@angular/core';

import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LanguageLevelService } from '../../../services/languageLevel.service';
import { LanguageLevel } from '../../../models/languageLevel';
import { CaseService } from '../../../services/case.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-languageLevelUpdate',
  templateUrl: './languageLevelUpdate.component.html',
  styleUrls: ['./languageLevelUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class LanguageLevelUpdateComponent implements OnInit {
  updateForm: FormGroup;
  @Input() languageLevel: LanguageLevel;
  languageLevelId: number;

  componentTitle = 'Language Level Update Form';

  constructor(
    private languageLevelService: LanguageLevelService,

    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private caseService: CaseService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.createUpdateForm();

    setTimeout(() => {
      this.getById(this.languageLevel.id);
    }, 200);
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      level: ['', [Validators.required]],
      levelTitle: ['', [Validators.required, Validators.minLength(3)]],
      levelDescription: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  getById(id: number) {
    this.languageLevelService.getById(id).subscribe(
      (response) => {
        this.updateForm.patchValue({
          level: response.data.level,
          levelTitle: response.data.levelTitle,
          levelDescription: response.data.levelDescription,
        });
        this.languageLevelId = id;
      },
      (error) => console.error
    );
  }

  update() {
    if (this.updateForm.valid) {
      this.languageLevelService.update(this.getLModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/languagelevels']);
        },
        (error) => {
          this.toastrService.error(error.error.message);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getLModel(): LanguageLevel {
    return Object.assign({
      id: this.languageLevelId,
      level: this.updateForm.value.level,
      levelTitle: this.caseService.capitalizeFirstLetter(
        this.updateForm.value.levelTitle
      ),
      levelDescription: this.caseService.capitalizeFirstLetter(
        this.updateForm.value.levelDescription
      ),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  clearInput1() {
    let value = this.updateForm.get('level');
    value.reset();
  }

  clearInput2() {
    let value = this.updateForm.get('levelTitle');
    value.reset();
  }

  clearInput3() {
    let value = this.updateForm.get('levelDescription');
    value.reset();
  }
}
