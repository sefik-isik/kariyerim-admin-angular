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
import { ModelMenuService } from '../../../services/modelMenu.service';
import { ModelMenu } from '../../../models/modelMenu';

@Component({
  selector: 'app-modelMenuUpdate',
  templateUrl: './modelMenuUpdate.component.html',
  styleUrls: ['./modelMenuUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class ModelMenuUpdateComponent implements OnInit {
  uptadeForm: FormGroup;
  modelMenuId: number;
  componentTitle = 'Model Menu Update';

  constructor(
    private modelMenuService: ModelMenuService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createUpdateForm();
    this.activatedRoute.params.subscribe((params) => {
      this.getById(params['modelmenuId']);
    });
  }

  createUpdateForm() {
    this.uptadeForm = this.formBuilder.group({
      modelName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  getById(id: number) {
    this.modelMenuService.getById(id).subscribe(
      (response) => {
        this.uptadeForm.patchValue({
          modelName: response.data.modelName,
        });
        this.modelMenuId = id;
      },
      (error) => console.error
    );
  }

  update() {
    if (this.uptadeForm.valid) {
      this.modelMenuService.update(this.getModel()).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/modelmenulists']);
        },
        (error) => {
          this.toastrService.error(error.error.message);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): ModelMenu {
    return Object.assign({
      id: this.modelMenuId,
      modelName: this.uptadeForm.value.modelName,
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  clearInput1() {
    let value = this.uptadeForm.get('modelName');
    value.reset();
  }
}
