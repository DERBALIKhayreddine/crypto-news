// angular import
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-right',
  templateUrl: './toolbar-right.component.html',
  styleUrls: ['./toolbar-right.component.scss']
})
export class NavRightComponent {

  constructor(private router: Router) {}
  userEmail: string | null = localStorage.getItem('email');

  logout() {
    // Clear user session (you can add more cleanup if needed)
    localStorage.removeItem('token');
    this.router.navigate(['/home']); // Redirect to login page after logout
  }
}
