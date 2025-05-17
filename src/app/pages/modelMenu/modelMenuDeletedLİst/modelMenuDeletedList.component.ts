import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { ModelMenu } from '../../../models/modelMenu';
import { ModelMenuService } from '../../../services/modelMenu.service';
import { FilterModelMenuPipe } from '../../../pipes/filterModelMenu.pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModelMenuUpdateComponent } from '../modelMenuUpdate/modelMenuUpdate.component';
import { ModelMenuDetailComponent } from '../modelMenuDetail/modelMenuDetail.component';

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
    this.modelMenuService.getDeletedAll().subscribe(
      (response) => {
        this.modelMenus = response.data;
      },
      (error) => console.error
    );
  }

  unDelete(modelMenu: ModelMenu) {
    this.modelMenuService.update(modelMenu).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (error) => console.error
    );
  }

  unDeleteAll() {
    this.modelMenus.forEach((modelMenu) => {
      this.modelMenuService.update(modelMenu).subscribe(
        (response) => {},
        (error) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
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
