import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PositionLevel } from '../../../models/component/positionLevel';

@Component({
  selector: 'app-positionLevelDetail',
  templateUrl: './positionLevelDetail.component.html',
  styleUrls: ['./positionLevelDetail.component.css'],
  imports: [CommonModule],
})
export class PositionLevelDetailComponent implements OnInit {
  @Input() positionLevel: PositionLevel;
  componentTitle: string = 'Position Level Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
