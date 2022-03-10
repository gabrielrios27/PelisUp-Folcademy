import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    email: [, [Validators.required, Validators.email]],
    password: [, [Validators.required, Validators.min(6)]],
  });

  constructor(private fb: FormBuilder, private authService: AuthService) {}
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
  logInUser() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }
    const { email, password } = this.miFormulario.value;
    this.authService.login(email, password).then((res) => {
      console.log(res);
    });
    console.log(this.miFormulario.value);
    // this.miFormulario.reset();
  }
  logInWithGoogleUser() {
    this.authService.loginWithGoogle().then((res) => {
      console.log(res);
    });
  }
}
