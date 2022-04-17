import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

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
  ) {}

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
          console.log(localStorage.getItem('ACCOUNT_ID'));
          window.location.reload();
          this.router.navigate(['/']);
          this.dialog.closeAll();
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
