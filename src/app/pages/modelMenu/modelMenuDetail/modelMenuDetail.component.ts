import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CityDTO } from '../../../models/cityDTO';
import { ModelMenu } from '../../../models/modelMenu';

@Component({
  selector: 'app-modelMenuDetail',
  templateUrl: './modelMenuDetail.component.html',
  styleUrls: ['./modelMenuDetail.component.css'],
  imports: [CommonModule],
})
export class ModelMenuDetailComponent implements OnInit {
  @Input() modelMenu: ModelMenu;
  componentTitle: string = 'Model Menu Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
