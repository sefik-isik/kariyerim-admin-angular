import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
import { LanguageService } from '../../../services/language.service';
import { Language } from '../../../models/language';
import { CaseService } from '../../../services/case.service';

@Component({
  selector: 'app-languageUpdate',
  templateUrl: './languageUpdate.component.html',
  styleUrls: ['./languageUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class LanguageUpdateComponent implements OnInit {
  updateForm: FormGroup;
  languageId: number;

  componentTitle = 'Language Update';

  constructor(
    private languageService: LanguageService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private caseService: CaseService
  ) {}

  ngOnInit() {
    this.createUpdateForm();
    this.activatedRoute.params.subscribe((params) => {
      this.getById(params['languageId']);
    });
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      languageName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  getById(id: number) {
    this.languageService.getById(id).subscribe(
      (response) => {
        this.updateForm.patchValue({
          languageName: response.data.languageName,
        });
        this.languageId = id;
      },
      (error) => console.error
    );
  }

  update() {
    if (this.updateForm.valid) {
      this.languageService.update(this.getModel()).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/languages']);
        },
        (error) => {
          this.toastrService.error(error.error.message);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): Language {
    return Object.assign({
      id: this.languageId,
      languageName: this.caseService.capitalizeFirstLetter(
        this.updateForm.value.languageName
      ),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  clearInput1() {
    let value = this.updateForm.get('languageName');
    value.reset();
  }
}
