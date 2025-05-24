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
import { ModelMenuService } from '../../../services/modelMenu.service';
import { ModelMenu } from '../../../models/modelMenu';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modelMenuAdd',
  templateUrl: './modelMenuAdd.component.html',
  styleUrls: ['./modelMenuAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class ModelMenuAddComponent implements OnInit {
  addForm: FormGroup;

  componentTitle = 'Add Model Menu Form';

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private modelMenuService: ModelMenuService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.createAddForm();
  }

  createAddForm() {
    this.addForm = this.formBuilder.group({
      modelName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  add() {
    if (this.addForm.valid && this.getModel()) {
      this.modelMenuService.add(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/modelmenulist/modelmenulistlisttab',
          ]);
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
      modelName: this.addForm.value.modelName,

      createDate: new Date(Date.now()).toJSON(),
    });
  }

  clearInput1() {
    let value = this.addForm.get('modelName');
    value.reset();
  }
}
