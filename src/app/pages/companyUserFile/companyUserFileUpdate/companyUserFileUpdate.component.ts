import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { CompanyUserFileService } from './../../../services/companyUserFile.service';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpEventType } from '@angular/common/http';
import { CompanyUserFile } from '../../../models/component/companyUserFile';
import { Router } from '@angular/router';
import { AdminModel } from '../../../models/auth/adminModel';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyUserFileDTO } from '../../../models/dto/companyUserFileDTO';
import { ValidationService } from '../../../services/validation.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-companyUserFileUpdate',
  templateUrl: './companyUserFileUpdate.component.html',
  styleUrls: ['./companyUserFileUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class CompanyUserFileUpdateComponent implements OnInit {
  @Input() companyUserFileDTO: CompanyUserFileDTO;
  selectedFile: File | null = null;
  result: boolean;
  admin: boolean = false;
  componentTitle = 'Company User File Update Form';

  constructor(
    private toastrService: ToastrService,
    private companyUserFileService: CompanyUserFileService,
    private router: Router,
    private localStorageService: LocalStorageService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    setTimeout(() => {
      this.getUserValues(this.companyUserFileDTO.id);
    }, 200);
  }

  checkFile() {
    if (this.companyUserFileDTO.fileName == 'noFile') {
      this.result = false;
    } else {
      this.result = true;
    }
  }

  getUserValues(id: string) {
    const adminModel = {
      id: id,
      email: this.localStorageService.getFromLocalStorage('email'),
      userId: this.localStorageService.getFromLocalStorage('id'),
      status: this.localStorageService.getFromLocalStorage('status'),
    };
    this.getById(adminModel);
  }

  getById(adminModel: AdminModel) {
    this.companyUserFileService.getById(adminModel).subscribe(
      (response) => {
        this.companyUserFileDTO.filePath = response.data.filePath;
        this.companyUserFileDTO.fileName = response.data.fileName;
        this.checkFile();
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
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
      this.companyUserFileDTO.fileName = this.selectedFile.name;
    }
  }

  deleteFile() {
    this.companyUserFileService.deleteFile(this.getModel()).subscribe(
      (response) => {
        this.result = false;
      },
      (responseError) => this.validationService.handleErrors(responseError)
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

    this.companyUserFileService
      .uploadFile(formData, this.companyUserFileDTO.companyUserId)
      .subscribe(
        (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round(event.loaded / (event.total * 100));
            console.log(`File is ${percentDone}% uploaded.`);
          } else if (event.type === HttpEventType.Response) {
            this.companyUserFileDTO.fileName = event.body.name;
            this.companyUserFileDTO.filePath = event.body.type;

            this.update();

            this.toastrService.success(
              'Company User File Added Successfully',
              'Success'
            );
          }
        },
        (responseError) => {
          this.validationService.handleErrors(responseError);
          this.toastrService.error('Error uploading file', responseError);
        }
      );
  }

  update() {
    this.companyUserFileService.update(this.getModel()).subscribe(
      (response) => {
        this.activeModal.close();
        this.toastrService.success(response.message, 'Başarılı');
        this.router.navigate([
          '/dashboard/companyuserfile/companyuserfilelisttab',
        ]);
      },
      (responseError) => {
        this.validationService.handleErrors(responseError);
      }
    );
  }

  getModel(): CompanyUserFile {
    return Object.assign({
      id: this.companyUserFileDTO.id,
      userId: this.companyUserFileDTO.userId,
      companyUserId: this.companyUserFileDTO.companyUserId,
      filePath: this.companyUserFileDTO.filePath.trim(),
      fileName: this.companyUserFileDTO.fileName.trim(),
      fileOwnName: this.companyUserFileDTO.fileOwnName.trim(),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  fileNameClear() {
    this.companyUserFileDTO.fileName = '';
  }

  fileOwnNameClear() {
    this.companyUserFileDTO.fileOwnName = '';
  }
}
