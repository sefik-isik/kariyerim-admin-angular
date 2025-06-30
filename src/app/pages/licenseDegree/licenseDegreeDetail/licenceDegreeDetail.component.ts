import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LicenseDegree } from '../../../models/component/licenseDegree';

@Component({
  selector: 'app-licenseDegreeDetail',
  templateUrl: './licenseDegreeDetail.component.html',
  styleUrls: ['./licenseDegreeDetail.component.css'],
  imports: [CommonModule],
})
export class LicenseDegreeDetailComponent implements OnInit {
  @Input() licenseDegree: LicenseDegree;
  componentTitle: string = 'Licence Degree Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
