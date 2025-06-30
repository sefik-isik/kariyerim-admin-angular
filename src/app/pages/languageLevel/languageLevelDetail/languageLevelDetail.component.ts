import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LanguageLevel } from '../../../models/component/languageLevel';

@Component({
  selector: 'app-languageLevelDetail',
  templateUrl: './languageLevelDetail.component.html',
  styleUrls: ['./languageLevelDetail.component.css'],
  imports: [CommonModule],
})
export class LanguageLevelDetailComponent implements OnInit {
  @Input() languageLevel: LanguageLevel;
  componentTitle: string = 'Language Level Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
