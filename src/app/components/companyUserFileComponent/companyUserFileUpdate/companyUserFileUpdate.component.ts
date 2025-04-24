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
import { LocalStorageService } from '../../../services/localStorage.service';
import { CompanyUserDTO } from '../../../models/companyUserDTO';
import { CompanyUserFileService } from '../../../services/companyUserFile.service';
import { CompanyUserFile } from '../../../models/companyUserFile';
import { UserDTO } from '../../../models/userDTO';
import { UserService } from '../../../services/user.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-companyUserFileUpdate',
  templateUrl: './companyUserFileUpdate.component.html',
  styleUrls: ['./companyUserFileUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class CompanyUserFileUpdateComponent implements OnInit {
  uptadeForm: FormGroup;
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
    private localStorageService: LocalStorageService,
    private userService: UserService
  ) {}
  ngOnInit() {
    this.getUsers();
    this.getCompanyUsers();
    this.createUptadeForm();

    setTimeout(() => {
      this.activatedRoute.params.subscribe((params) => {
        this.getById(params['companyuserfileId']);
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

  createUptadeForm() {
    this.uptadeForm = this.formBuilder.group({
      file: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  getById(id: number) {
    this.companyUserFileService.getById(id).subscribe(
      (response) => {
        this.id = response.data.id;
        this.userId = response.data.userId;
        this.userEmail = this.getEmailByUserId(response.data.userId);
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
      (error) => console.log(error)
    );
  }

  onUpload() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      formData.append('companyUserId', this.companyUserId.toString());
      formData.append('userId', this.userId.toString());

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

              this.add();

              this.toastrService.success(
                'Company User File Added Successfully',
                'Success'
              );
            }
          },
          (error) => {
            console.log(error);
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

  add() {
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
      userId: this.userId,
      companyUserId: this.companyUserId,
      filePath: this.filePath,
      fileName: this.fileName,
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  getUsers() {
    this.userId = parseInt(this.localStorageService.getFromLocalStorage('id'));

    this.userService.getAllDTO(this.userId).subscribe(
      (response) => {
        this.users = response.data.filter((f) => f.deletedDate == null);
      },
      (error) => console.error
    );
  }

  getCompanyUsers() {
    this.companyUserService.getAllDTO(this.userId).subscribe(
      (response) => {
        this.companyUsers = response.data.filter((f) => f.deletedDate == null);
      },
      (error) => console.error
    );
  }

  getUserId(userEmail: string): number {
    const userId = this.users.filter(
      (c) => c.email.toLowerCase() === userEmail.toLowerCase()
    )[0]?.id;

    return userId;
  }

  getEmailByUserId(userId: number): string {
    return this.users.find((u) => u.id == userId)?.email;
  }

  getCompanyUserById(companyUserId: number): string {
    return this.companyUsers.find((c) => c.id == companyUserId)
      ?.companyUserName;
  }

  clearInput1() {
    let value = this.uptadeForm.get('file');
    value.reset();
  }
}
