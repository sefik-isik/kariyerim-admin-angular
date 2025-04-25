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
import { FacultyService } from '../../../services/faculty.service';
import { Faculty } from '../../../models/faculty';

@Component({
  selector: 'app-facultyUpdate',
  templateUrl: './facultyUpdate.component.html',
  styleUrls: ['./facultyUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class FacultyUpdateComponent implements OnInit {
  updateForm: FormGroup;
  facultyId: number;
  componentTitle = 'Faculty Update';

  constructor(
    private facultyService: FacultyService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createUpdateForm();
    this.activatedRoute.params.subscribe((params) => {
      this.getById(params['facultyId']);
    });
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
      facultyName: this.capitalizeFirstLetter(
        this.updateForm.value.facultyName
      ),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  capitalizeFirstLetter(str: string) {
    let strs: string[] = str.split(' ');
    let strText: string = '';

    strs.forEach((str) => {
      str = str.toLowerCase();
      str = str[0].toUpperCase() + str.slice(1);
      strText = strText + ' ' + str;
      strText = strText.trim();
    });
    return strText;
  }

  clearInput1() {
    let value = this.updateForm.get('facultyName');
    value.reset();
  }
}
