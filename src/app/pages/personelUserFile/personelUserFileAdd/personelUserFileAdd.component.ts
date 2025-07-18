import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserDTO } from '../../../models/dto/userDTO';
import { UserService } from '../../../services/user.service';
import { AdminService } from '../../../services/helperServices/admin.service';
import { AdminModel } from '../../../models/auth/adminModel';
import { PersonelUserDTO } from '../../../models/dto/personelUserDTO';
import { PersonelUserFileService } from '../../../services/personelUserFile.service';
import { PersonelUserService } from '../../../services/personelUser.service';
import { PersonelUserFile } from '../../../models/component/personelUserFile';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonelUserFileDTO } from '../../../models/dto/personelUserFileDTO';
import { ValidationService } from '../../../services/validation.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-personelUserFileAdd',
  templateUrl: './personelUserFileAdd.component.html',
  styleUrls: ['./personelUserFileAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class PersonelUserFileAddComponent implements OnInit {
  personelUserFileModel: PersonelUserFileDTO = {} as PersonelUserFileDTO;
  selectedFile: File | null = null;
  filePath: string | null = null;
  fileName: string | null = null;
  fileOwnName: string | null = null;
  personelUsers: PersonelUserDTO[] = [];
  userDTOs: UserDTO[] = [];
  admin: boolean = false;
  componentTitle = 'Personel User File Add Form';

  constructor(
    private toastrService: ToastrService,
    private personelUserFileService: PersonelUserFileService,
    private router: Router,
    private personelUserService: PersonelUserService,
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

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (!this.selectedFile) {
      this.toastrService.error(
        'Please select a file to upload',
        'No file selected'
      );
      return;
    }
    if (!form.valid) {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);

    this.personelUserFileService
      .uploadFile(
        formData,
        this.getPersonelUserId(this.personelUserFileModel.email)
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
              'Personel User File Added Successfully',
              'Success'
            );
          }
        },
        (responseError) => {
          this.toastrService.error('Error uploading file', responseError);
        }
      );
  }

  add() {
    this.personelUserFileService.add(this.getModel()).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.activeModal.close();
        this.toastrService.success(response.message, 'Başarılı');
        this.router.navigate([
          '/dashboard/personeluserfile/personeluserfilelisttab',
        ]);
      },
      (responseError) => {
        this.validationService.handleErrors(responseError);
      }
    );
  }

  getModel(): PersonelUserFile {
    return Object.assign({
      id: '',
      userId: this.getUserId(this.personelUserFileModel.email.trim()),
      personelUserId: this.getPersonelUserId(
        this.personelUserFileModel.email.trim()
      ),
      filePath: this.filePath.trim(),
      fileName: this.fileName.trim(),
      fileOwnName: this.personelUserFileModel.fileOwnName.trim(),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  getAdminValues() {
    const id = this.localStorageService.getFromLocalStorage('id');
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.getAllPersonelUsers(response);
        this.getPersonelUsers(response);
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getAllPersonelUsers(adminModel: AdminModel) {
    this.userService.getAllPersonelUserDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        if (this.admin) {
          this.userDTOs = response.data;
        } else {
          this.personelUserFileModel.email =
            this.localStorageService.getFromLocalStorage('email');
          this.personelUserFileModel.userId =
            this.localStorageService.getFromLocalStorage('id');
        }
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getPersonelUsers(adminModel: AdminModel) {
    const userId = this.getUserId(this.personelUserFileModel.email);

    this.personelUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.personelUsers = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getUserId(userEmail: string): string {
    let userId;

    if (this.admin) {
      userId = this.userDTOs.filter((c) => c.email === userEmail)[0]?.id;
    } else {
      userId = this.personelUserFileModel.userId;
    }

    return userId;
  }

  getPersonelUserId(userEmail: string): string {
    const personelUserId = this.personelUsers.filter(
      (c) => c.email === userEmail
    )[0]?.id;

    return personelUserId;
  }

  emailClear() {
    this.personelUserFileModel.email = '';
  }

  personelUserNameClear() {
    this.personelUserFileModel.firstName = '';
  }

  fileOwnNameClear() {
    this.personelUserFileModel.fileOwnName = '';
  }

  fileClear() {
    this.personelUserFileModel.fileName = '';
  }
}
