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
import { FacultyService } from '../../../services/faculty.service';
import { Faculty } from '../../../models/faculty';
import { CaseService } from '../../../services/case.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-facultyUpdate',
  templateUrl: './facultyUpdate.component.html',
  styleUrls: ['./facultyUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class FacultyUpdateComponent implements OnInit {
  updateForm: FormGroup;
  @Input() faculty: Faculty;
  facultyId: number;

  componentTitle = 'Faculty Update Form';

  constructor(
    private facultyService: FacultyService,

    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private caseService: CaseService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.createUpdateForm();

    setTimeout(() => {
      this.getById(this.faculty.id);
    }, 200);
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      facultyName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  getById(facultyId: number) {
    this.facultyService.getById(facultyId).subscribe(
      (response) => {
        this.updateForm.patchValue({
          facultyName: response.data.facultyName,
        });
        this.facultyId = facultyId;
      },
      (error) => console.error
    );
  }

  update() {
    if (this.updateForm.valid) {
      this.facultyService.update(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/faculties']);
        },
        (error) => {
          this.toastrService.error(error.error.message);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): Faculty {
    return Object.assign({
      id: this.facultyId,
      facultyName: this.caseService.capitalizeFirstLetter(
        this.updateForm.value.facultyName
      ),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  clearInput1() {
    let value = this.updateForm.get('facultyName');
    value.reset();
  }
}
