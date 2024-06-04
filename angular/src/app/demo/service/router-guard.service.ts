import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterGuardService {

  constructor(private router:Router) { }

  canActivate():boolean{
    const token = localStorage.getItem('accessToken')
    if (!token) {
      this.router.navigate(['/home'])
      return false
    }
    else{
      return true
    }
  }
}
