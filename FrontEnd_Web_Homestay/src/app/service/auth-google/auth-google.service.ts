import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {first, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {BillService} from "../bill/bill.service";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {

  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    private http: HttpClient,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private billService: BillService) {}

  getMailAccount(mail: any): Observable<any> {
    return this.http.get(API_URL + 'auth/check-mail/' + mail);
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }
  // Auth logic to run auth providers

  AuthLogin(provider:any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result.user?.email);
        this.getMailAccount(result.user?.email).subscribe((data) => {
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
              if (start_date <= date_today){
                if (i.status_homestay.id == 1 || i.status_homestay.id == 2){
                  if (start_date < date_next || end_date < date_today)
                    this.billService.cancellingInvoiceHostAuto(i.id).pipe(first())
                      .subscribe(
                        data => {
                          console.log(data);
                        },error => {
                          console.log(error);
                        }
                      )
                }
              }
              if (end_date <= date_today){
                if (i.status_homestay.id == 3 && end_date < date_next){
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
            }
          })
          window.location.reload();
          this.dialog.closeAll();
          this.router.navigate(['/home']);
        },error => {
          // @ts-ignore
          document.getElementById("error-form-login").innerHTML = 'Tài khoản chưa có trong hệ thống hoặc đã bị khoá!'
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
