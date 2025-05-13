import { StatusPipe } from './../../../pipes/status.pipe';
import { CodePipe } from './../../../pipes/code.pipe';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserDTO } from '../../../models/userDTO';

@Component({
  selector: 'app-allUserDetail',
  templateUrl: './allUserDetail.component.html',
  styleUrls: ['./allUserDetail.component.css'],
  imports: [CommonModule, CodePipe, StatusPipe],
})
export class AllUserDetailComponent implements OnInit {
  @Input() userDTO: UserDTO;
  componentTitle: string = 'All User Detail';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
