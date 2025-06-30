import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DepartmentDescriptionDTO } from '../../../models/dto/departmentDescriptionDTO';

@Component({
  selector: 'app-departmentDescriptionDetail',
  templateUrl: './departmentDescriptionDetail.component.html',
  styleUrls: ['./departmentDescriptionDetail.component.css'],
  imports: [CommonModule],
})
export class DepartmentDescriptionDetailComponent implements OnInit {
  @Input() departmentDescriptionDTO: DepartmentDescriptionDTO;
  componentTitle: string = 'Department Description';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
