import { invalid } from '@angular/compiler/src/render3/view/util';
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
    email: [, [Validators.email]],
    password: [, [Validators.minLength(6)]],
  });

  invalidForm: boolean = false;
  errCode: string = '';

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
      this.invalidForm = true;
      console.log(this.miFormulario.get('password')?.hasError('minlength'));
      console.log(this.miFormulario);
      return;
    }
    this.invalidForm = false;
    const { email, password } = this.miFormulario.value;
    this.authService.login(email, password).then((res) => {
      console.log(res);
      this.errCode = this.authService.errCode;
      console.log('el error es: ' + this.errCode);
    });
    // this.miFormulario.reset();
  }
  logInWithGoogleUser() {
    this.authService.loginWithGoogle().then((res) => {
      console.log(res);
    });
  }
}
