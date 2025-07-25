import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PositionDescriptionDTO } from '../../../models/dto/positionDescriptionDTO';

@Component({
  selector: 'app-positionDescriptionDetail',
  templateUrl: './positionDescriptionDetail.component.html',
  styleUrls: ['./positionDescriptionDetail.component.css'],
  imports: [CommonModule],
})
export class PositionDescriptionDetailComponent implements OnInit {
  @Input() positionDescriptionDTO: PositionDescriptionDTO;
  componentTitle: string = 'Position Description';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
