import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {SignUpComponent} from "../sign-up/sign-up.component";
import {AuthenticationService} from "../../service/authentication.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    gmail: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(5)])
  });

  accountUrl?: string;
  hide = true;

  constructor(private dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService) {
    console.log(this.authenticationService.currentUserValue);
  }

  ngOnInit(): void {
    const {returnUrl: returnUrl} = this.activatedRoute.snapshot.queryParams;
    this.accountUrl = returnUrl || '/';
  }

  openSignUp() {
    this.dialog.closeAll();
    this.dialog.open(SignUpComponent, {
      width: '30%',
    });
  }

  login() {
    this.authenticationService.login(this.loginForm.value.gmail, this.loginForm.value.password)
      .pipe(first())
      .subscribe(
        data => {
          if (data.status == 202){
            // @ts-ignore
            document.getElementById("error-form-login").innerHTML = 'Tài khoản của bạn chưa có trong hệ thống hoặc sai mật khẩu!'
            localStorage.removeItem('ACCESS_TOKEN');
            localStorage.removeItem('ACCOUNT_ID');
            localStorage.removeItem('currentAccount');
          } else if (data.error){
            // @ts-ignore
            document.getElementById("error-form-login").innerHTML = 'Tài khoản của bạn đã bị khoá hoặc sai mật khẩu!'
            localStorage.removeItem('ACCESS_TOKEN');
            localStorage.removeItem('ACCOUNT_ID');
            localStorage.removeItem('currentAccount');
          } else if (data.token != undefined){
            localStorage.setItem('ACCESS_TOKEN', data.token);
            localStorage.setItem('ACCOUNT_ID', data.id);
            console.log(localStorage.getItem('currentAccount'));
              this.router.navigate([this.accountUrl]);
              this.dialog.closeAll();
          }
        },
        error => {
          // @ts-ignore
          document.getElementById("error-form-login").innerHTML = 'Tài khoản của bạn đã bị khoá hoặc sai mật khẩu!'
          localStorage.removeItem('currentAccount');
          localStorage.removeItem('ACCOUNT_ID');
          localStorage.removeItem('ACCESS_TOKEN');
        });
  }
}
