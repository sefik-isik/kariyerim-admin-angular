import { CommonModule } from '@angular/common';
import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PersonelUserFile } from '../../../models/component/personelUserFile';
import { PersonelUserFileDTO } from '../../../models/dto/personelUserFileDTO';
import { PersonelUserFileService } from '../../../services/personelUserFile.service';
import { ValidationService } from '../../../services/validation.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-personelUserFileUpdate',
  templateUrl: './personelUserFileUpdate.component.html',
  styleUrls: ['./personelUserFileUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class PersonelUserFileUpdateComponent implements OnInit {
  @Input() personelUserFileDTO: PersonelUserFileDTO;
  selectedFile: File | null = null;
  result: boolean;
  admin: boolean = false;
  componentTitle = 'Personel User File Update Form';

  constructor(
    private toastrService: ToastrService,
    private personelUserFileService: PersonelUserFileService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.checkFile();
  }

  checkFile() {
    if (this.personelUserFileDTO.fileName == 'noFile') {
      this.result = false;
    } else {
      this.result = true;
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];

    const allowedFileTypes = [
      'document/txt',
      'document/doc',
      'document/docx',
      'document/pdf',
      'application/rar',
      'application/zip',
      'application/x-zip-compressed',
      'application/pdf',
    ];

    if (!allowedFileTypes.includes(this.selectedFile.type)) {
      this.toastrService.error(
        'Please select a file with .doc, .docx, rar, zip or .pdf extension',
        'Invalid file type'
      );
    } else if (this.selectedFile.size > 5 * 1024 * 1024) {
      this.toastrService.error(
        'File size exceeds 5 MB. Please select a smaller file',
        'File too large'
      );
    } else if (this.selectedFile.size < 1024) {
      this.toastrService.error(
        'File size is too small. Please select a larger file',
        'File too small'
      );
    } else {
      this.toastrService.success('File selected successfully', 'Success');
      this.personelUserFileDTO.fileName = this.selectedFile.name;
    }
  }

  deleteFile() {
    this.personelUserFileService.deleteFile(this.getModel()).subscribe(
      (response) => {
        this.result = false;
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
      return;
    }

    if (!this.selectedFile) {
      this.toastrService.error(
        'Please select a file to upload',
        'No file selected'
      );
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);

    this.personelUserFileService
      .uploadFile(formData, this.personelUserFileDTO.personelUserId)
      .subscribe(
        (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round(event.loaded / (event.total * 100));
            console.log(`File is ${percentDone}% uploaded.`);
          } else if (event.type === HttpEventType.Response) {
            this.personelUserFileDTO.fileName = event.body.name;
            this.personelUserFileDTO.filePath = event.body.type;

            this.update();

            this.toastrService.success(
              'Personel User File Added Successfully',
              'Success'
            );
          }
        },
        (responseError) => {
          this.toastrService.error(responseError.error.message);
          this.toastrService.error('Error uploading file', responseError);
        }
      );
  }

  update() {
    this.personelUserFileService.update(this.getModel()).subscribe(
      (response) => {
        this.activeModal.close();
        this.toastrService.success(response.message, 'Başarılı');
        this.router.navigate([
          '/dashboard/personeluserfile/personeluserfilelisttab',
        ]);
      },
      (responseError) => {
        this.toastrService.error(responseError.error.message);
      }
    );
  }

  getModel(): PersonelUserFile {
    return Object.assign({
      id: this.personelUserFileDTO.id,
      userId: this.personelUserFileDTO.userId,
      personelUserId: this.personelUserFileDTO.personelUserId,
      filePath: this.personelUserFileDTO.filePath.trim(),
      fileName: this.personelUserFileDTO.fileName.trim(),
      fileOwnName: this.personelUserFileDTO.fileOwnName.trim(),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  fileOwnNameClear() {
    this.personelUserFileDTO.fileOwnName = '';
  }

  fileClear() {
    this.personelUserFileDTO.fileName = '';
  }
}
