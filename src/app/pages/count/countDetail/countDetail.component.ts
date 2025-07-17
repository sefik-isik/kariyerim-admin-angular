import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Count } from '../../../models/component/count';

@Component({
  selector: 'app-countDetail',
  templateUrl: './countDetail.component.html',
  styleUrls: ['./countDetail.component.css'],
  imports: [CommonModule],
})
export class CountDetailComponent implements OnInit {
  @Input() count: Count;
  componentTitle: string = 'Count Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
