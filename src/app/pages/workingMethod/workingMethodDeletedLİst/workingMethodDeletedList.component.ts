import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WorkingMethod } from '../../../models/workingMethod';
import { WorkingMethodService } from '../../../services/workingMethod.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WorkingMethodUpdateComponent } from '../workingMethodUpdate/workingMethodUpdate.component';
import { WorkingMethodDetailComponent } from '../workingMethodDetail/workingMethodDetail.component';

@Component({
  selector: 'app-workingMethodDeletedList',
  templateUrl: './workingMethodDeletedList.component.html',
  styleUrls: ['./workingMethodDeletedList.component.css'],
  imports: [CommonModule, FormsModule],
})
export class WorkingMethodDeletedListComponent implements OnInit {
  workingMethods: WorkingMethod[] = [];

  componentTitle = 'Working Methods Deleted List';
  filter1: string;

  constructor(
    private toastrService: ToastrService,
    private workingMethodService: WorkingMethodService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getWorkingMethods();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getWorkingMethods();
      }
    });
  }

  getWorkingMethods() {
    this.workingMethodService.getDeletedAll().subscribe(
      (response) => {
        this.workingMethods = response.data;
      },
      (error) => console.error
    );
  }

  unDelete(workingMethod: WorkingMethod) {
    this.workingMethodService.update(workingMethod).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (error) => console.error
    );
  }

  unDeleteAll() {
    this.workingMethods.forEach((workingMethod) => {
      this.workingMethodService.update(workingMethod).subscribe(
        (response) => {},
        (error) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  open(workingMethod: WorkingMethod) {
    const modalRef = this.modalService.open(WorkingMethodUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.workingMethod = workingMethod;
  }

  openDetail(workingMethod: WorkingMethod) {
    const modalRef = this.modalService.open(WorkingMethodDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.workingMethod = workingMethod;
  }

  clearInput1() {
    this.filter1 = null;
    this.getWorkingMethods();
  }
}
