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

@Component({
  selector: 'app-modelMenuList',
  templateUrl: './modelMenuList.component.html',
  styleUrls: ['./modelMenuList.component.css'],
  imports: [CommonModule, FormsModule, FilterModelMenuPipe],
})
export class ModelMenuListComponent implements OnInit {
  modelMenus: ModelMenu[] = [];

  componentTitle = 'Model Menus';
  filter1: string;

  constructor(
    private toastrService: ToastrService,
    private authService: AuthService,
    private modelMenuService: ModelMenuService,
    private modalService: NgbModal
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
    this.modelMenuService.getAll().subscribe(
      (response) => {
        this.modelMenus = response.data;
      },
      (responseError) => console.error
    );
  }

  delete(modelMenu: ModelMenu) {
    if (!this.authService.isAdmin('status')) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.modelMenuService.delete(modelMenu).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile silindi');
      },
      (responseError) => console.error
    );
  }

  deleteAll() {
    if (!this.authService.isAdmin('status')) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Tümünü Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.modelMenus.forEach((modelMenu) => {
      this.modelMenuService.delete(modelMenu).subscribe(
        (response) => {},
        (responseError) => console.error
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
      keyboard: false,
      centered: true,
      scrollable: true,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.modelMenu = modelMenu;
  }

  openDetail(modelMenu: ModelMenu) {
    const modalRef = this.modalService.open(ModelMenuDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
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
