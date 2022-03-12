import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  miRegistro: FormGroup = this.fb.group({
    email: [, [Validators.email]],
    password: [, [Validators.minLength(6)]],
  });

  invalidForm: boolean = false;
  errCode: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  OnClickSeePassword() {
    const passwordInput: any = document.getElementById('password');
    const imgEyePassword: any = document.getElementById('imgEyePassword');
    if (passwordInput.type == 'password') {
      passwordInput.type = 'text';
      imgEyePassword.src = '../../../assets/ico/eyeRightIcon-Light.svg';
    } else {
      passwordInput.type = 'password';
      imgEyePassword.src = '../../../assets/ico/eye-slash.svg';
    }
  }
  registerUser() {
    console.log(this.miRegistro);
    if (this.miRegistro.invalid) {
      this.invalidForm = true;
      return;
    }
    this.invalidForm = false;
    const { email, password } = this.miRegistro.value;
    this.authService.register(email, password).then((res) => {
      console.log(res);
      this.errCode = this.authService.errCode;
      if (res) {
        this.router.navigate(['../dashboard']);
      }
    });
    // this.miRegistro.reset();
  }
}
