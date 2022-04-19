import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {SignUpComponent} from "../sign-up/sign-up.component";
import {AuthenticationService} from "../../service/authentication.service";
import {AccountService} from "../../service/account/account.service";
import {AuthGoogleService} from "../../service/auth-google/auth-google.service";
import {BillService} from "../../service/bill/bill.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    gmail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  accountUrl?: string;
  hide = true;

  constructor(private dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              public authGoogleService: AuthGoogleService,
              private billService: BillService) {
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
          if (data.status == 202) {
            // @ts-ignore
            document.getElementById("error-form-login").innerHTML = 'Tài khoản của bạn chưa có trong hệ thống hoặc sai mật khẩu!'
            localStorage.removeItem('ACCESS_TOKEN');
            localStorage.removeItem('ACCOUNT_ID');
            localStorage.removeItem('currentAccount');
          } else if (data.error) {
            // @ts-ignore
            document.getElementById("error-form-login").innerHTML = 'Tài khoản của bạn đã bị khoá hoặc sai mật khẩu!'
            localStorage.removeItem('ACCESS_TOKEN');
            localStorage.removeItem('ACCOUNT_ID');
            localStorage.removeItem('currentAccount');
          } else if (data.token != undefined) {
            localStorage.setItem('ACCESS_TOKEN', data.token);
            localStorage.setItem('ACCOUNT_ID', data.id);
            this.billService.getBillByAccountId(data.id).subscribe((result) =>{
              let today = new Date();
              let date_today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
              console.log(result);
              for (let i of result){
                console.log(i);
                let start_date = new Date(i.start_date);
                let end_date = new Date(i.end_date);
                if (i.status_homestay.id == 2){
                  if (start_date <= date_today){
                    this.billService.HomestayCheckIn(i.id).pipe(first())
                      .subscribe(
                        data => {
                          console.log(data);
                        },error => {
                          console.log(error);
                        }
                      )
                  }
                }
                if (i.status_homestay.id == 1){
                  if (start_date <= date_today){
                    this.billService.cancellingInvoiceClient(i.id).pipe(first())
                      .subscribe(
                        data => {
                          console.log(data);
                        },error => {
                          console.log(error);
                        }
                      )
                  }
                }
                if (i.status_homestay.id == 3){
                  if (end_date <= date_today){
                    this.billService.HomestayCheckOut(i.id).pipe(first())
                      .subscribe(
                        data => {
                          console.log(data);
                        },error => {
                          console.log(error);
                        }
                      )
                  }
                }
              }
            })
            this.billService.getBillByHomestayAccountId(data.id).subscribe((result) =>{
              let today = new Date();
              let date_today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
              let date_next = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3);
              for (let i of result){
                let start_date = new Date(i.start_date);
                let end_date = new Date(i.end_date);
                if ((i.status_homestay.id == 1 || i.status_homestay.id == 2) && (start_date < date_next || end_date < date_today)){
                  this.billService.cancellingInvoiceHostAuto(i.id).pipe(first())
                    .subscribe(
                      data => {
                        console.log(data);
                      },error => {
                        console.log(error);
                      }
                    )
                }
                if (i.status_homestay.id == 3 && end_date <= date_next){
                  this.billService.HomestayCheckOutAuto(i.id).pipe(first())
                    .subscribe(
                      data => {
                        console.log(data);
                      },error => {
                        console.log(error);
                      }
                    )
                }
              }
            })
            console.log(localStorage.getItem('currentAccount'));
            window.location.reload();
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
