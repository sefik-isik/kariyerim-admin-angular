import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UniversityDepartmentDescriptionDTO } from '../../../models/dto/universityDepartmentDescriptionDTO';

@Component({
  selector: 'app-universityDepartmentDescriptionDetail',
  templateUrl: './universityDepartmentDescriptionDetail.component.html',
  styleUrls: ['./universityDepartmentDescriptionDetail.component.css'],
  imports: [CommonModule],
})
export class UniversityDepartmentDescriptionDetailComponent implements OnInit {
  @Input()
  universityDepartmentDescriptionDTO: UniversityDepartmentDescriptionDTO;
  componentTitle: string = 'University Department Description';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
