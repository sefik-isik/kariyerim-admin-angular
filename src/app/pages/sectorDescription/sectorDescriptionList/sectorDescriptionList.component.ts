import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { ValidationService } from '../../../services/validation.service';
import { SectorDescriptionDTO } from '../../../models/dto/sectorDescriptionDTO';
import { SectorDescriptionService } from '../../../services/sectorDescription.service';
import { SectorDescription } from '../../../models/component/sectorDescription';
import { SectorDescriptionUpdateComponent } from '../sectorDescriptionUpdate/sectorDescriptionUpdate.component';
import { SectorDescriptionDetailComponent } from '../sectorDescriptionDetail/sectorDescriptionDetail.component';
import { FilterSectorDescriptionPipe } from '../../../pipes/filterSectorDescription.pipe';
import { Sector } from '../../../models/component/sector';
import { SectorService } from '../../../services/sectorService';

@Component({
  selector: 'app-sectorDescriptionList',
  templateUrl: './sectorDescriptionList.component.html',
  styleUrls: ['./sectorDescriptionList.component.css'],
  imports: [CommonModule, FormsModule, FilterSectorDescriptionPipe],
})
export class SectorDescriptionListComponent implements OnInit {
  sectorDescriptionDTOs: SectorDescriptionDTO[] = [];
  sectors: Sector[] = [];
  admin: boolean = false;
  componentTitle = 'Sectors';
  filter1: string;

  constructor(
    private sectorDescriptionService: SectorDescriptionService,
    private sectorService: SectorService,
    private toastrService: ToastrService,
    private authService: AuthService,
    private modalService: NgbModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getSectorDescriptions();
    this.getSectors();

    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getSectorDescriptions();
      }
    });
  }

  getSectorDescriptions() {
    this.sectorDescriptionService.getAllDTO().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.sectorDescriptionDTOs = response.data.filter(
          (f) => f.sectorName != '-'
        );
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getSectors() {
    this.sectorService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.sectors = response.data.filter((f) => f.sectorName != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  delete(sectorDescription: SectorDescription) {
    if (!this.authService.isAdmin()) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.sectorDescriptionService.delete(sectorDescription).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.ngOnInit();
        this.toastrService.success('Başarı ile silindi');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  deleteAll() {
    if (!this.authService.isAdmin()) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Tümünü Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.sectorDescriptionDTOs.forEach((sectorDescriptionDTO) => {
      this.sectorDescriptionService.delete(sectorDescriptionDTO).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
        },
        (responseError) => this.validationService.handleErrors(responseError)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
    }, 500);
  }

  open(sectorDescriptionDTO: SectorDescriptionDTO) {
    const modalRef = this.modalService.open(SectorDescriptionUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.sectorDescriptionDTO = sectorDescriptionDTO;
  }

  openDetail(sectorDescriptionDTO: SectorDescriptionDTO) {
    const modalRef = this.modalService.open(SectorDescriptionDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.sectorDescriptionDTO = sectorDescriptionDTO;
  }

  clearInput1() {
    this.filter1 = null;
    this.getSectorDescriptions();
  }
}
