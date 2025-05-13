import { LocalStorageService } from './../../../services/localStorage.service';
import { CompanyUserFileService } from './../../../services/companyUserFile.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpEventType } from '@angular/common/http';
import { CompanyUserFile } from '../../../models/companyUserFile';
import { Router, RouterLink } from '@angular/router';
import { CompanyUserService } from '../../../services/companyUser.service';
import { CompanyUserDTO } from '../../../models/companyUserDTO';
import { UserDTO } from '../../../models/userDTO';
import { UserService } from '../../../services/user.service';
import { AdminService } from '../../../services/admin.service';
import { AdminModel } from '../../../models/adminModel';

@Component({
  selector: 'app-companyUserFileAdd',
  templateUrl: './companyUserFileAdd.component.html',
  styleUrls: ['./companyUserFileAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class CompanyUserFileAddComponent {
  addForm: FormGroup;

  componentTitle = 'Company User File Add Form';
  selectedFile: File | null = null;
  filePath: string | null = null;
  fileName: string | null = null;
  companyUserDTOs: CompanyUserDTO[] = [];
  companyUserId: number;
  userId: number;
  userDTOs: UserDTO[] = [];
  isAdmin: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private companyUserFileService: CompanyUserFileService,
    private router: Router,
    private companyUserService: CompanyUserService,
    private adminService: AdminService,
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) {}
  ngOnInit() {
    this.createAddForm();
    this.getAdminValues();
  }

  createAddForm() {
    this.addForm = this.formBuilder.group({
      userEmail: ['', [Validators.required, Validators.minLength(3)]],
      companyUserName: ['', [Validators.required, Validators.minLength(3)]],
      file: ['', [Validators.required, Validators.minLength(3)]],
    });
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

  onUpload() {
    if (this.selectedFile) {
      this.companyUserId = this.getCompanyUserId(
        this.addForm.value.companyUserName
      );

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

              this.add(this.filePath, this.fileName);

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

  add(filePath: string | null, fileName: string | null) {
    this.companyUserFileService
      .add(this.getModel(this.filePath, this.fileName))
      .subscribe(
        (response) => {
          this.router.navigate(['/dashboard/companyuserfiles']);
        },
        (error) => {
          this.toastrService.error(error.error.message);
        }
      );
  }

  getModel(filePath: string | null, fileName: string | null): CompanyUserFile {
    return Object.assign({
      companyUserId: this.getCompanyUserId(this.addForm.value.companyUserName),
      filePath: filePath,
      fileName: fileName,
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  getAdminValues() {
    const id = parseInt(this.localStorageService.getFromLocalStorage('id'));
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.getAllCompanyUsers(response);
        this.getCompanyUsers(response);
      },
      (error) => console.error
    );
  }

  getAllCompanyUsers(adminModel: AdminModel) {
    this.userService.getAllCompanyUserDTO(adminModel).subscribe(
      (response) => {
        this.userDTOs = response.data;
      },
      (error) => console.error
    );
  }

  getCompanyUsers(adminModel: AdminModel) {
    const userId = this.getUserId(this.addForm.value.userEmail);

    this.companyUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.companyUserDTOs = response.data.filter((f) => f.userId === userId);
      },
      (error) => console.error
    );
  }

  getUserId(userEmail: string): number {
    const userId = this.userDTOs.filter((c) => c.email === userEmail)[0]?.id;

    return userId;
  }

  getCompanyUserId(companyUserName: string): number {
    const companyUserId = this.companyUserDTOs.filter(
      (c) => c.companyUserName === companyUserName
    )[0]?.id;

    return companyUserId;
  }

  clearInput1() {
    let value = this.addForm.get('userEmail');
    value.reset();
    this.getAdminValues();
  }

  clearInput2() {
    let value = this.addForm.get('companyUserName');
    value.reset();
    this.getAdminValues();
  }

  clearInput3() {
    let value = this.addForm.get('file');
    value.reset();
  }
}
