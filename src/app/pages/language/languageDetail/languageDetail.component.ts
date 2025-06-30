import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Language } from '../../../models/component/language';

@Component({
  selector: 'app-languageDetail',
  templateUrl: './languageDetail.component.html',
  styleUrls: ['./languageDetail.component.css'],
  imports: [CommonModule],
})
export class LanguageDetailComponent implements OnInit {
  @Input() language: Language;
  componentTitle: string = 'Language Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
