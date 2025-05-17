import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-userOperationClaim',
  templateUrl: './userOperationClaim.component.html',
  styleUrls: ['./userOperationClaim.component.css'],
  imports: [RouterOutlet, RouterLink, CommonModule],
})
export class UserOperationClaimComponent {
  componentTitle = 'User Operation Claims';
}
