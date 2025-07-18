import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Count } from '../../../models/component/count';
import { CountService } from '../../../services/count.service';
import { CaseService } from '../../../services/helperServices/case.service';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-countAdd',
  templateUrl: './countAdd.component.html',
  styleUrls: ['./countAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class CountAddComponent implements OnInit {
  countModel: Count = {} as Count;
  componentTitle = 'Count Add Form';

  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private countService: CountService,
    private caseService: CaseService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {}

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.countService.add(this.getModel()).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/count/countlisttab']);
        },
        (responseError) => this.validationService.handleErrors(responseError)
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): Count {
    return Object.assign({
      id: '',
      countValue: this.countModel.countValue.trim(),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  countValueClear() {
    this.countModel.countValue = '';
  }
}
