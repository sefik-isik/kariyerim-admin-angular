import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DriverLicence } from '../../../models/driverLicence';

@Component({
  selector: 'app-driverLicenceDetail',
  templateUrl: './driverLicenceDetail.component.html',
  styleUrls: ['./driverLicenceDetail.component.css'],
  imports: [CommonModule],
})
export class DriverLicenceDetailComponent implements OnInit {
  @Input() driverLicence: DriverLicence;
  componentTitle: string = 'Driver Licence Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
