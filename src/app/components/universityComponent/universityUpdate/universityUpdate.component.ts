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
import { UniversityService } from '../../../services/university.service';
import { University } from '../../../models/university';
import { CaseService } from '../../../services/case.service';

@Component({
  selector: 'app-universityUpdate',
  templateUrl: './universityUpdate.component.html',
  styleUrls: ['./universityUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class UniversityUpdateComponent implements OnInit {
  updateForm: FormGroup;
  universityId: number;
  componentTitle = 'University Update';

  constructor(
    private universityService: UniversityService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private caseService: CaseService
  ) {}

  ngOnInit() {
    this.createUpdateForm();
    this.activatedRoute.params.subscribe((params) => {
      this.getById(params['universityId']);
    });
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      universityName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  getById(id: number) {
    this.universityService.getById(id).subscribe(
      (response) => {
        this.updateForm.patchValue({
          universityName: response.data.universityName,
        });
        this.universityId = id;
      },
      (error) => console.error
    );
  }

  update() {
    if (this.updateForm.valid) {
      this.universityService.update(this.getModel()).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/universities']);
        },
        (error) => {
          this.toastrService.error(error.error.message);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): University {
    return Object.assign({
      id: this.universityId,
      universityName: this.caseService.capitalizeFirstLetter(
        this.updateForm.value.universityName
      ),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  clearInput1() {
    let value = this.updateForm.get('universityName');
    value.reset();
  }
}
