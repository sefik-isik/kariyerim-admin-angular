import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Country } from '../../../models/component/country';

@Component({
  selector: 'app-countryDetail',
  templateUrl: './countryDetail.component.html',
  styleUrls: ['./countryDetail.component.css'],
  imports: [CommonModule],
})
export class CountryDetailComponent implements OnInit {
  @Input() country: Country;
  componentTitle: string = 'Country Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
