import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LanguageLevelAddComponent } from '../languageLevelAdd/languageLevelAdd.component';

@Component({
  selector: 'app-languageLevel',
  templateUrl: './languageLevel.component.html',
  styleUrls: ['./languageLevel.component.css'],
  imports: [RouterOutlet, RouterLink, CommonModule],
})
export class LanguageLevelComponent {
  componentTitle = 'Language Levels';
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(LanguageLevelAddComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
  }
}
