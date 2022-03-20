import { invalid } from '@angular/compiler/src/render3/view/util';
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
  userLocStg: any;
  userJSON: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getLocalStorage();
    if (this.userLocStg) {
      this.router.navigate(['../dashboard']);
    }
  }
  getLocalStorage() {
    /*Si hay en el local storage un usuario logeado lo guarda en 'user'*/
    this.userJSON = localStorage.getItem('Usuario');
    if (this.userJSON) {
      this.userLocStg = JSON.parse(this.userJSON);
    }
  }

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
      return;
    }
    this.invalidForm = false;
    const { email, password } = this.miFormulario.value;
    this.authService.login(email, password).then((res) => {
      console.log('res.user: ', res?.user);
      if (res?.user) {
        /*si el logeo es exitoso navego hacia el dashboard*/
        this.router.navigate(['../dashboard']);
        this.setLocalStorage(res.user); /* seteo el usuario en el localstorage*/
        this.miFormulario.reset();
      }
      this.errCode = this.authService.errCode;
    });

    // this.miFormulario.reset();
  }
  logInWithGoogleUser() {
    this.authService.loginWithGoogle().then((res) => {
      console.log(res?.user);
      if (res?.user) {
        /*si el logeo es exitoso navego hacia el dashboard*/
        this.router.navigate(['../dashboard']);
        this.setLocalStorage(res.user); /* seteo el usuario en el localstorage*/
        this.miFormulario.reset();
      }
    });
  }
  setLocalStorage(data: any) {
    localStorage.setItem('Usuario', JSON.stringify(data));
  }
}
