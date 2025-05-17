import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonelUserFileAddComponent } from '../personelUserFileAdd/personelUserFileAdd.component';

@Component({
  selector: 'app-personelUserFile',
  templateUrl: './personelUserFile.component.html',
  styleUrls: ['./personelUserFile.component.css'],
  imports: [RouterOutlet, RouterLink, CommonModule],
})
export class PersonelUserFileComponent {
  componentTitle = 'Personel User Files';
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(PersonelUserFileAddComponent, {
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
