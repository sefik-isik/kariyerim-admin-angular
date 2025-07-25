import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UniversityDescriptionDTO } from '../../../models/dto/universityDescriptionDTO';

@Component({
  selector: 'app-universityDescriptionDetail',
  templateUrl: './universityDescriptionDetail.component.html',
  styleUrls: ['./universityDescriptionDetail.component.css'],
  imports: [CommonModule],
})
export class UniversityDescriptionDetailComponent implements OnInit {
  @Input() universityDescriptionDTO: UniversityDescriptionDTO;
  componentTitle: string = 'University Description';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
