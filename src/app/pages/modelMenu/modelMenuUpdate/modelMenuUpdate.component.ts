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
import { ModelMenuService } from '../../../services/modelMenu.service';
import { ModelMenu } from '../../../models/modelMenu';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modelMenuUpdate',
  templateUrl: './modelMenuUpdate.component.html',
  styleUrls: ['./modelMenuUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class ModelMenuUpdateComponent implements OnInit {
  updateForm: FormGroup;
  @Input() modelMenu: ModelMenu;
  modelMenuId: number;

  componentTitle = 'Model Menu Update Form';

  constructor(
    private modelMenuService: ModelMenuService,

    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.createUpdateForm();

    setTimeout(() => {
      this.getById(this.modelMenu.id);
    }, 200);
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      modelName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  getById(id: number) {
    this.modelMenuService.getById(id).subscribe(
      (response) => {
        this.updateForm.patchValue({
          modelName: response.data.modelName,
        });
        this.modelMenuId = id;
      },
      (error) => console.error
    );
  }

  update() {
    if (this.updateForm.valid) {
      this.modelMenuService.update(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
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
      modelName: this.updateForm.value.modelName,
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  clearInput1() {
    let value = this.updateForm.get('modelName');
    value.reset();
  }
}
