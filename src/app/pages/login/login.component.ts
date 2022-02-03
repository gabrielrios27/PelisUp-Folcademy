import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor() {}
  OnClickSeePassword() {
    const passwordInput: any = document.getElementById('password');
    const imgEyePassword: any = document.getElementById('imgEyePassword');
    if (passwordInput.type == 'password') {
      passwordInput.type = 'text';
      imgEyePassword.src = '../../../assets/ico/eyeRightIcon-Light.svg';
    } else {
      passwordInput.type = 'password';
      imgEyePassword.src = '../../../assets/ico/eyeRightIcon.svg';
    }
  }
  ngOnInit(): void {}
}
