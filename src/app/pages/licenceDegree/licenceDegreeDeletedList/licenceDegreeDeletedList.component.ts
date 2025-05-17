import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { LicenceDegree } from '../../../models/licenceDegree';
import { LicenceDegreeService } from '../../../services/licenseDegree.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LicenceDegreeUpdateComponent } from '../licenceDegreeUpdate/licenceDegreeUpdate.component';
import { LicenceDegreeDetailComponent } from '../licenceDegreeDetail/licenceDegreeDetail.component';

@Component({
  selector: 'app-licenceDegreeDeletedList',
  templateUrl: './licenceDegreeDeletedList.component.html',
  styleUrls: ['./licenceDegreeDeletedList.component.css'],
  imports: [CommonModule, FormsModule],
})
export class LicenceDegreeDeletedListComponent implements OnInit {
  licenceDegrees: LicenceDegree[] = [];

  componentTitle = 'Licence Degree Deleted List';
  filter1: string;

  constructor(
    private toastrService: ToastrService,
    private licenceDegreeService: LicenceDegreeService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getLicenceDegrees();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getLicenceDegrees();
      }
    });
  }

  getLicenceDegrees() {
    this.licenceDegreeService.getDeletedAll().subscribe(
      (response) => {
        this.licenceDegrees = response.data;
      },
      (error) => console.error
    );
  }

  unDelete(licenceDegree: LicenceDegree) {
    this.licenceDegreeService.update(licenceDegree).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (error) => console.error
    );
  }

  unDeleteAll() {
    this.licenceDegrees.forEach((licenceDegree) => {
      this.licenceDegreeService.update(licenceDegree).subscribe(
        (response) => {},
        (error) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  open(licenceDegree: LicenceDegree) {
    const modalRef = this.modalService.open(LicenceDegreeUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.licenceDegree = licenceDegree;
  }

  openDetail(licenceDegree: LicenceDegree) {
    const modalRef = this.modalService.open(LicenceDegreeDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.licenceDegree = licenceDegree;
  }

  clearInput1() {
    this.filter1 = null;
    this.getLicenceDegrees();
  }
}
