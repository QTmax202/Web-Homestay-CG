import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Account} from "../../models/account";
import {Observable} from "rxjs";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  createAccount(account: Account): Observable<any> {
    return this.http.post(API_URL + '/sign-up', account);
  }

  findById(id: any): Observable<any> {
    return this.http.get(API_URL + '/profile/' + id);
  }

  updateProfile(account: Account, id: any): Observable<Account> {
    return this.http.put<Account>(API_URL + `/profile/update/` + id, account);
  }
}
