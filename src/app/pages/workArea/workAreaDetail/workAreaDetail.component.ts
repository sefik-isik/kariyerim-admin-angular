import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { WorkArea } from '../../../models/component/workArea';

@Component({
  selector: 'app-workAreaDetail',
  templateUrl: './workAreaDetail.component.html',
  styleUrls: ['./workAreaDetail.component.css'],
  imports: [CommonModule],
})
export class WorkAreaDetailComponent implements OnInit {
  @Input() workArea: WorkArea;
  componentTitle: string = 'WorkArea Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
