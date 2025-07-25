import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UniversityDepartmentDescriptionAddComponent } from '../universityDepartmentDescriptionAdd/universityDepartmentDescriptionAdd.component';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-universityDepartmentDescription',
  templateUrl: './universityDepartmentDescription.component.html',
  styleUrls: ['./universityDepartmentDescription.component.css'],
  imports: [RouterOutlet, RouterLink, CommonModule],
})
export class UniversityDepartmentDescriptionComponent {
  componentTitle = 'University Department Descriptions';
  admin: boolean = false;

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
  }

  open() {
    if (!this.admin) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    const modalRef = this.modalService.open(
      UniversityDepartmentDescriptionAddComponent,
      {
        size: 'lg',
        backdrop: 'static',
        keyboard: true,
        centered: true,
        scrollable: false,
        windowClass: 'modal-holder',
        backdropClass: 'modal-backdrop',
      }
    );
  }
}
