import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModelMenuAddComponent } from '../modelMenuAdd/modelMenuAdd.component';

@Component({
  selector: 'app-modelMenu',
  templateUrl: './modelMenu.component.html',
  styleUrls: ['./modelMenu.component.css'],
  imports: [RouterOutlet, RouterLink, CommonModule],
})
export class ModelMenuComponent {
  componentTitle = 'Model Menus';
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(ModelMenuAddComponent, {
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
