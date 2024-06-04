// angular import
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppUserService } from 'src/app/demo/service/app-user.service';

// project import
import { SharedModule } from 'src/app/demo/shared/shared.module';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule, RouterModule ,CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../authentication.scss']
})
export default class RegisterComponent implements OnInit {
  registerForm:any= FormGroup;
  hide = true;
  coHide = true;

  constructor(
    private formBuilder: FormBuilder,
    private userService: AppUserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(6)]],
      terms: [false, Validators.requiredTrue]
    });
  }

  handleSubmit(): void {
    if (this.registerForm.invalid) {
      this.toastr.error('Please fill in all required fields and agree to the terms.');
      return;
    }

    const formData = this.registerForm.value;
    if (formData.password !== formData.confirmPassword) {
      this.toastr.error('Passwords do not match.');
      return;
    }

    const data = {
      name: formData.name,
      email: formData.email,
      password: formData.password
    };

    this.userService.register(data).subscribe(
      (response: any) => {
        this.toastr.success('User registered successfully!');
        this.router.navigate(['/auth/login']);
      },
      (error) => {
        this.toastr.error('Registration failed! Please try again.');
        console.error('Registration failed', error);
      }
    );
  }

  getEmailErrorMessage() {
    if (this.registerForm.controls['email'].hasError('required')) {
      return 'You must enter an email';
    }

    return this.registerForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }
}
