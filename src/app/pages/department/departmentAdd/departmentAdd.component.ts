import { CaseService } from './../../../services/case.service';
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
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DepartmentService } from '../../../services/department.service';
import { Department } from '../../../models/department';

@Component({
  selector: 'app-departmentAdd',
  templateUrl: './departmentAdd.component.html',
  styleUrls: ['./departmentAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class DepartmentAddComponent implements OnInit {
  addForm1: FormGroup;
  componentTitle = 'Department Add Form';

  constructor(
    private formBuilder: FormBuilder,
    private departmentService: DepartmentService,
    private toastrService: ToastrService,
    private caseService: CaseService,
    private router: Router,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.createAddForm();
  }

  createAddForm() {
    this.addForm1 = this.formBuilder.group({
      departmentName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  add() {
    if (this.addForm1.valid) {
      this.departmentService.add(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/department/departmentlisttab']);
        },
        (error) => {
          this.toastrService.error(error.error.message);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): Department {
    return Object.assign({
      departmentName: this.caseService.capitalizeFirstLetter(
        this.addForm1.value.departmentName
      ),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  clearInput1() {
    let value = this.addForm1.get('departmentName');
    value.reset();
  }
}
