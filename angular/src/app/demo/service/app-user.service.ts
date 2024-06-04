import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppUserService {

  constructor(private http: HttpClient) { }

  login(data: any) {
    return this.http.post("http://localhost:3000/api/appuser/login", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    });
  }

  register(data: any) {
    return this.http.post("http://localhost:3000/api/appuser/addNewAppuser", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    });
  }

  getAllAppUsers(token: string) {
    return this.http.get("http://localhost:3000/api/appuser/getAllAppusers", {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    });
  }

  updateUserStatus(token: string, user: any) {
    return this.http.post("http://localhost:3000/api/appuser/updateUserStatus", user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    });
  }

  updateUser(token: string, user: any) {
    return this.http.post("http://localhost:3000/api/appuser/updateUser", user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    });
  }

  checkToken(token: string) {
    return this.http.get("http://localhost:3000/api/appuser/checkToken", {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    });
  }
}
