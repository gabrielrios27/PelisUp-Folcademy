import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    email: [, [Validators.required, Validators.email]],
    password: [, [Validators.required, Validators.min(6)]],
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
  registerUser() {
    if (this.miFormulario.invalid) {
      this.invalidForm = true;
      return;
    }
    this.invalidForm = false;
    const { email, password } = this.miFormulario.value;
    this.authService.register(email, password).then((res) => {
      console.log(res);
      this.errCode = this.authService.errCode;
      console.log('el error es: ' + this.errCode);
    });
    // this.miFormulario.reset();
  }
}
