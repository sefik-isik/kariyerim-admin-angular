import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Position } from '../../../models/component/position';

@Component({
  selector: 'app-positionDetail',
  templateUrl: './positionDetail.component.html',
  styleUrls: ['./positionDetail.component.css'],
  imports: [CommonModule],
})
export class PositionDetailComponent implements OnInit {
  @Input() position: Position;
  componentTitle: string = 'Position Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
