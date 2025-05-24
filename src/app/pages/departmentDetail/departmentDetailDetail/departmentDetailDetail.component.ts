import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DepartmentDetailDTO } from '../../../models/departmentDetailDTO';

@Component({
  selector: 'app-departmentDetailDetail',
  templateUrl: './departmentDetailDetail.component.html',
  styleUrls: ['./departmentDetailDetail.component.css'],
  imports: [CommonModule],
})
export class DepartmentDetailDetailComponent implements OnInit {
  @Input() departmentDetailDTO: DepartmentDetailDTO;
  componentTitle: string = 'Department Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
