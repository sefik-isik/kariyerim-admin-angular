import { LocalStorageService } from './../../../services/localStorage.service';
import { Component, OnInit } from '@angular/core';
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
import { Router } from '@angular/router';
import { UserDTO } from '../../../models/userDTO';
import { UserService } from '../../../services/user.service';
import { AdminService } from '../../../services/admin.service';
import { AdminModel } from '../../../models/adminModel';
import { PersonelUserDTO } from '../../../models/personelUserDTO';
import { PersonelUserFileService } from '../../../services/personelUserFile.service';
import { PersonelUserService } from '../../../services/personelUser.service';
import { PersonelUserFile } from '../../../models/personelUserFile';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-personelUserFileAdd',
  templateUrl: './personelUserFileAdd.component.html',
  styleUrls: ['./personelUserFileAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class PersonelUserFileAddComponent implements OnInit {
  addForm: FormGroup;
  selectedFile: File | null = null;
  filePath: string | null = null;
  fileName: string | null = null;
  personelUserDTOs: PersonelUserDTO[] = [];
  personelUserId: number;
  userId: number;
  userDTOs: UserDTO[] = [];
  isAdmin: boolean;
  componentTitle = 'Personel User File Add Form';

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private personelUserFileService: PersonelUserFileService,
    private router: Router,
    private personelUserService: PersonelUserService,
    private adminService: AdminService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    public activeModal: NgbActiveModal
  ) {}
  ngOnInit() {
    this.createAddForm();
    this.getAdminValues();
  }

  createAddForm() {
    this.addForm = this.formBuilder.group({
      userEmail: ['', [Validators.required, Validators.minLength(3)]],
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
      this.personelUserId = this.getPersonelUserId(
        this.addForm.value.userEmail
      );

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

              this.add(this.filePath, this.fileName);

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

  add(filePath: string | null, fileName: string | null) {
    this.personelUserFileService
      .add(this.getModel(this.filePath, this.fileName))
      .subscribe(
        (response) => {
          this.router.navigate(['/dashboard/personeluserfiles']);
        },
        (error) => {
          this.toastrService.error(error.error.message);
        }
      );
  }

  getModel(filePath: string | null, fileName: string | null): PersonelUserFile {
    return Object.assign({
      personelUserId: this.getPersonelUserId(this.addForm.value.userEmail),
      filePath: filePath,
      fileName: fileName,
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  getAdminValues() {
    const id = parseInt(this.localStorageService.getFromLocalStorage('id'));
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.getAllPersonelUsers(response);
        this.getPersonelUsers(response);
      },
      (error) => console.error
    );
  }

  getAllPersonelUsers(adminModel: AdminModel) {
    this.userService.getAllPersonelUserDTO(adminModel).subscribe(
      (response) => {
        this.userDTOs = response.data;
      },
      (error) => console.error
    );
  }

  getPersonelUsers(adminModel: AdminModel) {
    const userId = this.getUserId(this.addForm.value.userEmail);

    this.personelUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.personelUserDTOs = response.data.filter(
          (f) => f.userId === userId
        );
      },
      (error) => console.error
    );
  }

  getUserId(userEmail: string): number {
    const userId = this.userDTOs.filter((c) => c.email === userEmail)[0]?.id;

    return userId;
  }

  getPersonelUserId(userEmail: string): number {
    const personelUserId = this.personelUserDTOs.filter(
      (c) => c.email === userEmail
    )[0]?.id;

    return personelUserId;
  }

  clearInput1() {
    let value = this.addForm.get('userEmail');
    value.reset();
    this.getAdminValues();
  }

  clearInput2() {
    let value = this.addForm.get('personelUserName');
    value.reset();
    this.getAdminValues();
  }

  clearInput3() {
    let value = this.addForm.get('file');
    value.reset();
  }
}
