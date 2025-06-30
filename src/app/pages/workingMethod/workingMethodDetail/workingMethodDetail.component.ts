import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { WorkingMethod } from '../../../models/component/workingMethod';

@Component({
  selector: 'app-workingMethodDetail',
  templateUrl: './workingMethodDetail.component.html',
  styleUrls: ['./workingMethodDetail.component.css'],
  imports: [CommonModule],
})
export class WorkingMethodDetailComponent implements OnInit {
  @Input() workingMethod: WorkingMethod;
  componentTitle: string = 'Working Method Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
