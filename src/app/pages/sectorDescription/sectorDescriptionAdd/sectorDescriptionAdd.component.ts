import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Sector } from '../../../models/component/sector';
import { SectorDescription } from '../../../models/component/sectorDescription';
import { SectorDescriptionDTO } from '../../../models/dto/sectorDescriptionDTO';
import { SectorDescriptionService } from '../../../services/sectorDescription.service';
import { SectorService } from '../../../services/sectorService';
import { ValidationService } from '../../../services/validation.service';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { angularEditorConfig } from '../../../models/concrete/angularEditorConfig';

@Component({
  selector: 'app-sectorDescriptionAdd',
  templateUrl: './sectorDescriptionAdd.component.html',
  styleUrls: ['./sectorDescriptionAdd.component.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AngularEditorModule,
  ],
})
export class SectorDescriptionAddComponent implements OnInit {
  sectorDescriptionModel: SectorDescriptionDTO = {} as SectorDescriptionDTO;
  editorCount: number = 0;
  sectors: Sector[];
  componentTitle = 'Sector Description Add Form';

  htmlContent = '';
  config: AngularEditorConfig = angularEditorConfig;

  constructor(
    private sectorDescriptionService: SectorDescriptionService,
    private toastrService: ToastrService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private sectorService: SectorService,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.getSectors();
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.sectorDescriptionService.add(this.getModel()).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);

          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/sectordescription/sectordescriptionlisttab',
          ]);
        },
        (responseError) => {
          this.validationService.handleErrors(responseError);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): SectorDescription {
    return Object.assign({
      id: '',
      sectorId: this.getSectorId(this.sectorDescriptionModel.sectorName.trim()),
      title: this.sectorDescriptionModel.title.trim(),
      description: this.htmlContent,
      createDate: new Date(Date.now()).toJSON(),
    });
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

  getSectorId(sectorName: string): string {
    const sectorId = this.sectors.filter((c) => c.sectorName === sectorName)[0]
      ?.id;

    return sectorId;
  }

  count() {
    this.editorCount = this.htmlContent.length;
  }

  sectorNameClear() {
    this.sectorDescriptionModel.sectorName = '';
  }

  titleClear() {
    this.sectorDescriptionModel.title = '';
  }

  descriptionClear() {
    this.htmlContent = '';
  }
}
