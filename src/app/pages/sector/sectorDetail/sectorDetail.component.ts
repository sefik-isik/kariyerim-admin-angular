import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Sector } from '../../../models/component/sector';

@Component({
  selector: 'app-sectorDetail',
  templateUrl: './sectorDetail.component.html',
  styleUrls: ['./sectorDetail.component.css'],
  imports: [CommonModule],
})
export class SectorDetailComponent implements OnInit {
  @Input() sector: Sector;
  componentTitle: string = 'Sector Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
