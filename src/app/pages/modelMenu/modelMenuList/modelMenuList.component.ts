import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { ModelMenu } from '../../../models/component/modelMenu';
import { ModelMenuService } from '../../../services/modelMenu.service';
import { FilterModelMenuPipe } from '../../../pipes/filterModelMenu.pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModelMenuUpdateComponent } from '../modelMenuUpdate/modelMenuUpdate.component';
import { ModelMenuDetailComponent } from '../modelMenuDetail/modelMenuDetail.component';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-modelMenuList',
  templateUrl: './modelMenuList.component.html',
  styleUrls: ['./modelMenuList.component.css'],
  imports: [CommonModule, FormsModule, FilterModelMenuPipe],
})
export class ModelMenuListComponent implements OnInit {
  modelMenus: ModelMenu[] = [];
  admin: boolean = false;
  componentTitle = 'Model Menus';
  filter1: string;

  constructor(
    private toastrService: ToastrService,
    private authService: AuthService,
    private modelMenuService: ModelMenuService,
    private modalService: NgbModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getModelMenus();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getModelMenus();
      }
    });
  }

  getModelMenus() {
    this.modelMenuService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.modelMenus = response.data.filter((f) => f.modelName != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  delete(modelMenu: ModelMenu) {
    if (!this.authService.isAdmin()) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.modelMenuService.delete(modelMenu).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.ngOnInit();
        this.toastrService.success('Başarı ile silindi');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  deleteAll() {
    if (!this.authService.isAdmin()) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Tümünü Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.modelMenus.forEach((modelMenu) => {
      this.modelMenuService.delete(modelMenu).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
        },
        (responseError) => this.validationService.handleErrors(responseError)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
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
