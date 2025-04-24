import { SectorService } from './../../../services/sectorService';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { LanguageLevelService } from '../../../services/languageLevel.service';
import { LanguageLevel } from '../../../models/languageLevel';

@Component({
  selector: 'app-languageLevelAdd',
  templateUrl: './languageLevelAdd.component.html',
  styleUrls: ['./languageLevelAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class LanguageLevelAddComponent implements OnInit {
  addForm: FormGroup;
  componentTitle = 'Language Level Add Form';

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private languageLevelService: LanguageLevelService
  ) {}

  ngOnInit() {
    this.createAddForm();
  }

  createAddForm() {
    this.addForm = this.formBuilder.group({
      level: ['', [Validators.required]],
      levelTitle: ['', [Validators.required, Validators.minLength(3)]],
      levelDescription: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  add() {
    if (this.addForm.valid && this.getModel()) {
      this.languageLevelService.add(this.getModel()).subscribe(
        (response) => {
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

  getModel(): LanguageLevel {
    return Object.assign({
      level: this.addForm.value.level,
      levelTitle: this.addForm.value.levelTitle,
      levelDescription: this.addForm.value.levelDescription,
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  clearInput1() {
    let value = this.addForm.get('level');
    value.reset();
  }

  clearInput2() {
    let value = this.addForm.get('levelTitle');
    value.reset();
  }

  clearInput3() {
    let value = this.addForm.get('levelDescription');
    value.reset();
  }
}
