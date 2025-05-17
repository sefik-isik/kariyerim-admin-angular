import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LicenceDegree } from '../../../models/licenceDegree';

@Component({
  selector: 'app-licenceDegreeDetail',
  templateUrl: './licenceDegreeDetail.component.html',
  styleUrls: ['./licenceDegreeDetail.component.css'],
  imports: [CommonModule],
})
export class LicenceDegreeDetailComponent implements OnInit {
  @Input() licenceDegree: LicenceDegree;
  componentTitle: string = 'Licence Degree Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
