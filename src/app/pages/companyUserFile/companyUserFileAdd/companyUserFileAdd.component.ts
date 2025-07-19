import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { CompanyUserFileService } from './../../../services/companyUserFile.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpEventType } from '@angular/common/http';
import { CompanyUserFile } from '../../../models/component/companyUserFile';
import { Router } from '@angular/router';
import { CompanyUserService } from '../../../services/companyUser.service';
import { CompanyUserDTO } from '../../../models/dto/companyUserDTO';
import { UserDTO } from '../../../models/dto/userDTO';
import { UserService } from '../../../services/user.service';
import { AdminService } from '../../../services/helperServices/admin.service';
import { AdminModel } from '../../../models/auth/adminModel';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyUserFileDTO } from '../../../models/dto/companyUserFileDTO';
import { ValidationService } from '../../../services/validation.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-companyUserFileAdd',
  templateUrl: './companyUserFileAdd.component.html',
  styleUrls: ['./companyUserFileAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class CompanyUserFileAddComponent {
  companyUserFileModel: CompanyUserFileDTO = {} as CompanyUserFileDTO;
  selectedFile: File | null = null;
  filePath: string | null = null;
  fileName: string | null = null;
  fileOwnName: string | null = null;
  companyUsers: CompanyUserDTO[] = [];
  userDTOs: UserDTO[] = [];
  admin: boolean = false;
  componentTitle = 'Company User File Add Form';

  constructor(
    private toastrService: ToastrService,
    private companyUserFileService: CompanyUserFileService,
    private router: Router,
    private companyUserService: CompanyUserService,
    private adminService: AdminService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getAdminValues();
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (!this.selectedFile) {
      this.toastrService.error(
        'Please select a file to upload',
        'No file selected'
      );
      this.fileNameClear();
      return;
    }

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

      this.fileNameClear();
      return;
    }

    if (this.selectedFile.size > 5 * 1024 * 1024) {
      this.toastrService.error(
        'File size exceeds 5 MB. Please select a smaller file',
        'File too large'
      );
      this.fileNameClear();
      return;
    }

    if (this.selectedFile.size < 1024) {
      this.toastrService.error(
        'File size is too small. Please select a larger file',
        'File too small'
      );
      this.fileNameClear();
      return;
    }

    this.toastrService.success('File selected successfully', 'Success');
    this.fileName = this.selectedFile.name;

    if (!form.valid) {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);

    this.companyUserFileService
      .uploadFile(
        formData,
        this.getCompanyUserId(this.companyUserFileModel.companyUserName)
      )
      .subscribe(
        (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round(event.loaded / (event.total * 100));
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
        (responseError) => {
          this.validationService.handleErrors(responseError);
        }
      );
  }

  add() {
    this.companyUserFileService.add(this.getModel()).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
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
      id: '',
      userId: this.getUserId(this.companyUserFileModel.email),
      companyUserId: this.getCompanyUserId(
        this.companyUserFileModel.companyUserName
      ),
      filePath: this.filePath,
      fileName: this.fileName,
      fileOwnName: this.companyUserFileModel.fileOwnName,

      createDate: new Date(Date.now()).toJSON(),
    });
  }

  getAdminValues() {
    const id = this.localStorageService.getFromLocalStorage('id');
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.getAllCompanyUsers(response);
        this.getCompanyUsers(response);
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getAllCompanyUsers(adminModel: AdminModel) {
    this.userService.getAllCompanyUserDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        if (this.admin) {
          this.userDTOs = response.data;
        } else {
          this.companyUserFileModel.email = adminModel.email;
          this.companyUserFileModel.userId = adminModel.id;
        }
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getCompanyUsers(adminModel: AdminModel) {
    this.companyUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);

        this.companyUsers = response.data.filter(
          (f) => f.email == this.companyUserFileModel.email
        );
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  setCompanyUserMail(email: string) {
    this.companyUserFileModel.email = email;

    this.getAdminValues();
  }

  getUserId(userEmail: string): string {
    let userId;

    if (this.admin) {
      userId = this.userDTOs.filter((c) => c.email === userEmail)[0]?.id;
    } else {
      userId = this.companyUserFileModel.userId;
    }

    return userId;
  }

  getCompanyUserId(companyUserName: string): string {
    const companyUserId = this.companyUsers.filter(
      (c) => c.companyUserName === companyUserName
    )[0]?.id;

    return companyUserId;
  }

  emailClear() {
    this.companyUserFileModel.email = '';
  }

  companyUserNameClear() {
    this.companyUserFileModel.companyUserName = '';
  }

  fileOwnNameClear() {
    this.companyUserFileModel.fileOwnName = '';
  }

  fileNameClear() {
    this.companyUserFileModel.fileName = '';
  }
}
