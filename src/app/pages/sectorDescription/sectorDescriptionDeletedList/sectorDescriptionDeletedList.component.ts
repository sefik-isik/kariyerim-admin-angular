import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from '../../../services/validation.service';
import { SectorDescription } from '../../../models/component/sectorDescription';
import { SectorDescriptionDTO } from '../../../models/dto/sectorDescriptionDTO';
import { SectorDescriptionUpdateComponent } from '../sectorDescriptionUpdate/sectorDescriptionUpdate.component';
import { SectorDescriptionDetailComponent } from '../sectorDescriptionDetail/sectorDescriptionDetail.component';
import { SectorDescriptionService } from '../../../services/sectorDescription.service';
import { FilterSectorDescriptionPipe } from '../../../pipes/filterSectorDescription.pipe';
import { Sector } from '../../../models/component/sector';
import { SectorService } from '../../../services/sectorService';

@Component({
  selector: 'app-sectorDescriptionDeletedList',
  templateUrl: './sectorDescriptionDeletedList.component.html',
  styleUrls: ['./sectorDescriptionDeletedList.component.css'],
  imports: [CommonModule, FormsModule, FilterSectorDescriptionPipe],
})
export class SectorDescriptionDeletedListComponent implements OnInit {
  sectorDescriptionDTOs: SectorDescriptionDTO[] = [];
  sectors: Sector[] = [];
  dataLoaded = false;
  componentTitle = 'Position Description Deleted List';
  filter1: string;

  constructor(
    private sectorDescriptionService: SectorDescriptionService,
    private sectorService: SectorService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.getSectorDescriptions();
    this.getSectors();

    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getSectorDescriptions();
      }
    });
  }

  getSectorDescriptions() {
    this.sectorDescriptionService.getDeletedAllDTO().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.sectorDescriptionDTOs = response.data;
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

  unDelete(sectorDescription: SectorDescription) {
    this.sectorDescriptionService.update(sectorDescription).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDeleteAll() {
    this.sectorDescriptionDTOs.forEach((sectorDescription) => {
      this.sectorDescriptionService.update(sectorDescription).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
        },
        (responseError) => this.validationService.handleErrors(responseError)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  terminate(sectorDescription: SectorDescription) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.sectorDescriptionService.terminate(sectorDescription).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.toastrService.success('Başarı ile kalıcı olarak silindi');
        this.ngOnInit();
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  terminateAll() {
    if (!confirm('Tümünü Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.sectorDescriptionDTOs.forEach((sectorDescription) => {
      this.sectorDescriptionService.terminate(sectorDescription).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
        },
        (responseError) => this.validationService.handleErrors(responseError)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile kalıcı olarak silindi');
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
