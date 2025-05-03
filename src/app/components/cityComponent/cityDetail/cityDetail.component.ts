import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CityDTO } from '../../../models/cityDTO';

@Component({
  selector: 'app-cityDetail',
  templateUrl: './cityDetail.component.html',
  styleUrls: ['./cityDetail.component.css'],
  imports: [CommonModule],
})
export class CityDetailComponent implements OnInit {
  @Input() cityDTO: CityDTO;
  componentTitle: string = 'City Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
