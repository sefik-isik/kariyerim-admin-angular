import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ModelMenuService } from '../../../services/modelMenu.service';
import { ModelMenu } from '../../../models/component/modelMenu';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-modelMenuUpdate',
  templateUrl: './modelMenuUpdate.component.html',
  styleUrls: ['./modelMenuUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class ModelMenuUpdateComponent implements OnInit {
  @Input() modelMenu: ModelMenu;
  componentTitle = 'Model Menu Update Form';

  constructor(
    private modelMenuService: ModelMenuService,
    private toastrService: ToastrService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {}

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.modelMenuService.update(this.getModel()).subscribe(
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
      id: this.modelMenu.id,
      modelName: this.modelMenu.modelName.trim(),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  modelNameClear() {
    this.modelMenu.modelName = '';
  }
}
