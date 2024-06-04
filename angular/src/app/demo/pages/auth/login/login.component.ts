import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppUserService } from 'src/app/demo/service/app-user.service';

// project import
import { SharedModule } from 'src/app/demo/shared/shared.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../authentication.scss']
})
export default class LoginComponent implements OnInit {
  loginForm:any= FormGroup;
  hide: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private userService: AppUserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  handleSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const formData = this.loginForm.value;
    const data = {
      email: formData.email,
      password: formData.password
    };

    this.userService.login(data).subscribe(
      (response: any) => {
        this.toastr.success('Login successful!');
         localStorage.setItem('email', response.email); // Store email in local storage
        localStorage.setItem('accessToken', response.accessToken);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.toastr.error('Login failed! Please check your credentials and try again.');
        console.error('Login failed', error);
      }
    );
  }

  getErrorMessage() {
    if (this.loginForm.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }
    return this.loginForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }
}
