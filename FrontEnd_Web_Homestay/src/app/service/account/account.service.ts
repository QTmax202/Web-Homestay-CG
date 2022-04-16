import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Account} from "../../models/account";
import {Observable} from "rxjs";
import {ChangePassword} from "../../models/change-password";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  // change password
  changePassword(changePassword: ChangePassword, id: any): Observable<any> {
    return this.http.put(API_URL + 'sign-up/' + id, changePassword);
  }

  createAccount(account: Account): Observable<any> {
    return this.http.post(API_URL + 'sign-up', account);
  }

  getInformationAccount(id: any): Observable<any> {
    return this.http.get(API_URL + 'sign-up/' + id);
  }
}
