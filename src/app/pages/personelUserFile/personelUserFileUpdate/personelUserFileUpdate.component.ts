import { Component, Input, OnInit } from '@angular/core';

import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
  NgForm,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserDTO } from '../../../models/dto/userDTO';
import { HttpEventType } from '@angular/common/http';
import { AdminService } from '../../../services/helperServices/admin.service';
import { AdminModel } from '../../../models/auth/adminModel';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { PersonelUserDTO } from '../../../models/dto/personelUserDTO';
import { PersonelUserFileService } from '../../../services/personelUserFile.service';
import { PersonelUserService } from '../../../services/personelUser.service';
import { PersonelUserFile } from '../../../models/component/personelUserFile';
import { PersonelUserFileDTO } from '../../../models/dto/personelUserFileDTO';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-personelUserFileUpdate',
  templateUrl: './personelUserFileUpdate.component.html',
  styleUrls: ['./personelUserFileUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class PersonelUserFileUpdateComponent implements OnInit {
  @Input() personelUserFileDTO: PersonelUserFileDTO;
  selectedFile: File | null = null;
  users: UserDTO[] = [];
  result: boolean;
  personelUserDTOs: PersonelUserDTO[] = [];
  componentTitle = 'Personel User File Update Form';

  constructor(
    private toastrService: ToastrService,
    private personelUserFileService: PersonelUserFileService,
    private router: Router,
    private personelUserService: PersonelUserService,
    private adminService: AdminService,
    private localStorageService: LocalStorageService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}
  ngOnInit() {
    this.getAdminValues();

    setTimeout(() => {
      this.getUserValues(this.personelUserFileDTO.id);
    }, 200);
  }

  checkFile() {
    if (this.personelUserFileDTO.fileName == 'noFile') {
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
    const id = this.localStorageService.getFromLocalStorage('id');
    this.personelUserFileService.getById(adminModel).subscribe(
      (response) => {
        this.personelUserFileDTO.id = response.data.id;
        this.personelUserFileDTO.userId = response.data.userId;
        this.personelUserFileDTO.personelUserId = response.data.personelUserId;
        this.personelUserFileDTO.filePath = response.data.filePath;
        this.personelUserFileDTO.fileName = response.data.fileName;
        this.personelUserFileDTO.fileOwnName = response.data.fileOwnName;
        this.checkFile();
      },
      (responseError) => console.error
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
      this.personelUserFileDTO.fileName = this.selectedFile.name;
    }
  }

  deleteFile() {
    this.personelUserFileService.deleteFile(this.getModel()).subscribe(
      (response) => {
        this.result = false;
      },
      (responseError) => console.error
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
          console.error;
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
      filePath: this.personelUserFileDTO.filePath,
      fileName: this.personelUserFileDTO.fileName,
      fileOwnName: this.personelUserFileDTO.fileOwnName,
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  getAdminValues() {
    this.adminService.getAdminValues(this.personelUserFileDTO.id).subscribe(
      (response) => {
        this.getPersonelUsers(response);
      },
      (responseError) => console.error
    );
  }

  getPersonelUsers(adminModel: AdminModel) {
    this.personelUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.personelUserDTOs = response.data;
      },
      (responseError) => console.error
    );
  }

  getPersonelUserById(personelUserId: string): string {
    return this.personelUserDTOs.find((c) => c.id == personelUserId)?.email;
  }

  fileOwnNameClear() {
    this.personelUserFileDTO.fileOwnName = '';
  }

  fileClear() {
    this.personelUserFileDTO.fileName = '';
  }
}
