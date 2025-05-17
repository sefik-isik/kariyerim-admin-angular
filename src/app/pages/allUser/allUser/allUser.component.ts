import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-allUser',
  templateUrl: './allUser.component.html',
  styleUrls: ['./allUser.component.css'],
  imports: [RouterOutlet, RouterLink, CommonModule],
})
export class AllUserComponent {
  componentTitle = 'All Users';
}
