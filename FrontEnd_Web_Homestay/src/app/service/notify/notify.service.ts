import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Notify} from "../../models/notify";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private http: HttpClient) { }

  getNotifyByAccountDesc(id: any): Observable<any> {
    return this.http.get<Notify>(API_URL + 'notify/account/' + id);
  }

  editNotify(id: any): Observable<any> {
    return this.http.get<Notify>(API_URL + 'notify/' + id);
  }

  check1Notify(id: any): Observable<any> {
    return this.http.get<Notify>(API_URL + 'notify/check' + id);
  }
}
