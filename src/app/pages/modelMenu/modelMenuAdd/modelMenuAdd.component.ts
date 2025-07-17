import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
  NgForm,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ModelMenuService } from '../../../services/modelMenu.service';
import { ModelMenu } from '../../../models/component/modelMenu';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-modelMenuAdd',
  templateUrl: './modelMenuAdd.component.html',
  styleUrls: ['./modelMenuAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class ModelMenuAddComponent implements OnInit {
  modelMenuModel: ModelMenu = {} as ModelMenu;
  componentTitle = 'Add Model Menu Form';

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private modelMenuService: ModelMenuService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {}

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.modelMenuService.add(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/modelmenu/modelmenulisttab']);
        },
        (responseError) => {
          this.toastrService.error(responseError.error.message);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): ModelMenu {
    return Object.assign({
      id: '',
      modelName: this.modelMenuModel.modelName.trim(),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  modelNameClear() {
    this.modelMenuModel.modelName = '';
  }
}
