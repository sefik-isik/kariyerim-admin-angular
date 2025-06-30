import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UniversityDepartmentDTO } from '../../../models/dto/universityDepartmentDTO';

@Component({
  selector: 'app-universityDepartmentDetail',
  templateUrl: './universityDepartmentDetail.component.html',
  styleUrls: ['./universityDepartmentDetail.component.css'],
  imports: [CommonModule],
})
export class UniversityDepartmentDetailComponent implements OnInit {
  @Input() universityDepartmentDTO: UniversityDepartmentDTO;
  componentTitle: string = 'University Department Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
