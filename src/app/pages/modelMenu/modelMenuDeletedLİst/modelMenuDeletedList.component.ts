import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { ModelMenu } from '../../../models/component/modelMenu';
import { ModelMenuService } from '../../../services/modelMenu.service';
import { FilterModelMenuPipe } from '../../../pipes/filterModelMenu.pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModelMenuUpdateComponent } from '../modelMenuUpdate/modelMenuUpdate.component';
import { ModelMenuDetailComponent } from '../modelMenuDetail/modelMenuDetail.component';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-modelMenuDeletedList',
  templateUrl: './modelMenuDeletedList.component.html',
  styleUrls: ['./modelMenuDeletedList.component.css'],
  imports: [CommonModule, FormsModule, FilterModelMenuPipe],
})
export class ModelMenuDeletedListComponent implements OnInit {
  modelMenus: ModelMenu[] = [];

  componentTitle = 'Model Menus Deleted List';
  filter1: string;

  constructor(
    private toastrService: ToastrService,
    private modelMenuService: ModelMenuService,
    private modalService: NgbModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.getModelMenus();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getModelMenus();
      }
    });
  }

  getModelMenus() {
    this.modelMenuService.getDeletedAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.modelMenus = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDelete(modelMenu: ModelMenu) {
    this.modelMenuService.update(modelMenu).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDeleteAll() {
    this.modelMenus.forEach((modelMenu) => {
      this.modelMenuService.update(modelMenu).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
        },
        (responseError) => this.validationService.handleErrors(responseError)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  terminate(modelMenu: ModelMenu) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.modelMenuService.terminate(modelMenu).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.toastrService.success('Başarı ile kalıcı olarak silindi');
        this.ngOnInit();
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  terminateAll() {
    if (!confirm('Tümünü Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.modelMenus.forEach((modelMenu) => {
      this.modelMenuService.terminate(modelMenu).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
        },
        (responseError) => this.validationService.handleErrors(responseError)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile kalıcı olarak silindi');
    }, 500);
  }

  open(modelMenu: ModelMenu) {
    const modalRef = this.modalService.open(ModelMenuUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.modelMenu = modelMenu;
  }

  openDetail(modelMenu: ModelMenu) {
    const modalRef = this.modalService.open(ModelMenuDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.modelMenu = modelMenu;
  }

  clearInput1() {
    this.filter1 = null;
    this.getModelMenus();
  }
}
