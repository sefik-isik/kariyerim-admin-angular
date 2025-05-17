import { Component, Input, OnInit } from '@angular/core';

import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserDTO } from '../../../models/userDTO';
import { HttpEventType } from '@angular/common/http';
import { AdminService } from '../../../services/admin.service';
import { AdminModel } from '../../../models/adminModel';
import { LocalStorageService } from '../../../services/localStorage.service';
import { PersonelUserDTO } from '../../../models/personelUserDTO';
import { PersonelUserFileService } from '../../../services/personelUserFile.service';
import { PersonelUserService } from '../../../services/personelUser.service';
import { PersonelUserFile } from '../../../models/personelUserFile';
import { PersonelUserFileDTO } from '../../../models/personelUserFileDTO';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-personelUserFileUpdate',
  templateUrl: './personelUserFileUpdate.component.html',
  styleUrls: ['./personelUserFileUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class PersonelUserFileUpdateComponent implements OnInit {
  updateForm: FormGroup;
  @Input() personelUserFileDTO: PersonelUserFileDTO;
  componentTitle = 'Personel User File Update Form';
  selectedFile: File | null = null;
  filePath: string | null = null;
  fileName: string | null = null;
  users: UserDTO[] = [];
  personelUserDTOs: PersonelUserDTO[] = [];
  personelUserId: number;
  personelUserName: string;
  userEmail: string;
  userId: number;
  id: number;
  result: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,

    private personelUserFileService: PersonelUserFileService,
    private router: Router,
    private personelUserService: PersonelUserService,
    private adminService: AdminService,
    private localStorageService: LocalStorageService,
    public activeModal: NgbActiveModal
  ) {}
  ngOnInit() {
    this.getAdminValues();
    this.createupdateForm();

    setTimeout(() => {
      this.getUserValues(this.personelUserFileDTO.id);
    }, 200);
  }

  checkFile(fileName: string) {
    if (this.fileName == 'noFile') {
      this.result = false;
    } else {
      this.result = true;
    }
  }

  createupdateForm() {
    this.updateForm = this.formBuilder.group({
      file: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  getUserValues(id: number) {
    const adminModel = {
      id: id,
      email: this.localStorageService.getFromLocalStorage('email'),
      userId: parseInt(this.localStorageService.getFromLocalStorage('id')),
      status: this.localStorageService.getFromLocalStorage('status'),
    };
    this.getById(adminModel);
  }

  getById(adminModel: AdminModel) {
    const id = parseInt(this.localStorageService.getFromLocalStorage('id'));
    this.personelUserFileService.getById(adminModel).subscribe(
      (response) => {
        this.id = response.data.id;
        this.personelUserId = response.data.personelUserId;
        this.userEmail = this.getPersonelUserById(this.personelUserId);
        this.filePath = response.data.filePath;
        this.fileName = response.data.fileName;
        this.checkFile(this.fileName);
      },
      (error) => console.error
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
      this.fileName = this.selectedFile.name;
    }
  }

  deleteFile() {
    this.personelUserFileService.deleteFile(this.getModel()).subscribe(
      (response) => {
        this.result = false;
      },
      (error) => console.error
    );
  }

  onUpload() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      formData.append('personelUserId', this.personelUserId.toString());

      this.personelUserFileService
        .uploadFile(formData, this.personelUserId)
        .subscribe(
          (event) => {
            if (event.type === HttpEventType.UploadProgress) {
              const percentDone = Math.round(
                event.loaded / (event.total * 100)
              );
              console.log(`File is ${percentDone}% uploaded.`);
            } else if (event.type === HttpEventType.Response) {
              this.fileName = event.body.name;
              this.filePath = event.body.type;

              this.update();

              this.toastrService.success(
                'Personel User File Added Successfully',
                'Success'
              );
            }
          },
          (error) => {
            console.error;
            this.toastrService.error('Error uploading file', error);
          }
        );
    } else {
      this.toastrService.error(
        'Please select a file to upload',
        'No file selected'
      );
    }
  }

  update() {
    this.personelUserFileService.update(this.getModel()).subscribe(
      (response) => {
        this.activeModal.close();
        this.router.navigate(['/dashboard/personeluserfiles']);
      },
      (error) => {
        this.toastrService.error(error.error.message);
      }
    );
  }

  getModel(): PersonelUserFile {
    return Object.assign({
      id: this.id,
      personelUserId: this.personelUserId,
      filePath: this.filePath,
      fileName: this.fileName,
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  getAdminValues() {
    this.adminService.getAdminValues(this.id).subscribe(
      (response) => {
        this.getPersonelUsers(response);
      },
      (error) => console.error
    );
  }

  getPersonelUsers(adminModel: AdminModel) {
    this.personelUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.personelUserDTOs = response.data;
      },
      (error) => console.error
    );
  }

  getPersonelUserById(personelUserId: number): string {
    return this.personelUserDTOs.find((c) => c.id == personelUserId)?.email;
  }

  clearInput1() {
    let value = this.updateForm.get('file');
    value.reset();
  }
}
