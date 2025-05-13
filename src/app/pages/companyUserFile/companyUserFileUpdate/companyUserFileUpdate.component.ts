import { CompanyUserService } from './../../../services/companyUser.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
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

import { CompanyUserDTO } from '../../../models/companyUserDTO';
import { CompanyUserFileService } from '../../../services/companyUserFile.service';
import { CompanyUserFile } from '../../../models/companyUserFile';
import { UserDTO } from '../../../models/userDTO';
import { HttpEventType } from '@angular/common/http';
import { AdminService } from '../../../services/admin.service';
import { AdminModel } from '../../../models/adminModel';
import { LocalStorageService } from '../../../services/localStorage.service';

@Component({
  selector: 'app-companyUserFileUpdate',
  templateUrl: './companyUserFileUpdate.component.html',
  styleUrls: ['./companyUserFileUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class CompanyUserFileUpdateComponent implements OnInit {
  updateForm: FormGroup;

  componentTitle = 'Company User File Update Form';
  selectedFile: File | null = null;
  filePath: string | null = null;
  fileName: string | null = null;
  users: UserDTO[] = [];
  companyUsers: CompanyUserDTO[] = [];
  companyUserId: number;
  companyUserName: string;
  userEmail: string;
  userId: number;
  id: number;
  result: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private companyUserFileService: CompanyUserFileService,
    private router: Router,
    private companyUserService: CompanyUserService,
    private adminService: AdminService,
    private localStorageService: LocalStorageService
  ) {}
  ngOnInit() {
    this.getAdminValues();
    this.createupdateForm();

    setTimeout(() => {
      this.activatedRoute.params.subscribe((params) => {
        this.getUserValues(params['companyuserfileId']);
      });
    }, 500);
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
    this.companyUserFileService.getById(adminModel).subscribe(
      (response) => {
        this.id = response.data.id;
        this.companyUserId = response.data.companyUserId;
        this.companyUserName = this.getCompanyUserById(this.companyUserId);
        this.filePath = response.data.filePath;
        this.fileName = response.data.fileName;
        this.checkFile(this.fileName);
      },
      (error) => console.error
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];

    //const allowedFileTypes = ["image/png", "image/jpeg", "image/gif"];
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
    this.companyUserFileService.deleteFile(this.getModel()).subscribe(
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
      formData.append('companyUserId', this.companyUserId.toString());

      this.companyUserFileService
        .uploadFile(formData, this.companyUserId)
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
                'Company User File Added Successfully',
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
    this.companyUserFileService.update(this.getModel()).subscribe(
      (response) => {
        this.router.navigate(['/dashboard/companyuserfiles']);
      },
      (error) => {
        this.toastrService.error(error.error.message);
      }
    );
  }

  getModel(): CompanyUserFile {
    return Object.assign({
      id: this.id,
      companyUserId: this.companyUserId,
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
        this.getCompanyUsers(response);
      },
      (error) => console.error
    );
  }

  getCompanyUsers(adminModel: AdminModel) {
    this.companyUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.companyUsers = response.data;
      },
      (error) => console.error
    );
  }

  getCompanyUserById(companyUserId: number): string {
    return this.companyUsers.find((c) => c.id == companyUserId)
      ?.companyUserName;
  }

  clearInput1() {
    let value = this.updateForm.get('file');
    value.reset();
  }
}
