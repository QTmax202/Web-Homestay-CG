import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Homestay2} from "../../models/homestay2";
import {environment} from "../../../environments/environment";
import {ImageOfHomestay} from "../../models/image-of-homestay";
import {Rate} from "../../models/rate";
import {Observable} from "rxjs";
import {MyHomestayDto} from "../../models/my-homestay-dto";
import {YourBillDto} from "../../models/your-bill-dto";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class Homestay2Service {

  constructor(private http: HttpClient) { }

  //bill by account
  getYourBillByAccountId(id: any): Observable<any> {
    return this.http.get<YourBillDto[]>(API_URL + 'bill/account/' + id);
  }

  getMyBillByAccountId(id: any): Observable<any> {
    return this.http.get<YourBillDto[]>(API_URL + 'bill/account-my-bill/' + id);
  }

  //homestay by account

  getHomestayByAccountId(id: any): Observable<any> {
    return this.http.get<MyHomestayDto[]>(API_URL + 'homestay/account/' + id);
  }

  //home

  getAllHomestay(): Observable<any> {
    return this.http.get<Homestay2[]>(API_URL + 'homestay');
  }

  getAllHomestaySignIn(id: any): Observable<any> {
    return this.http.get<Homestay2[]>(API_URL + 'homestay/acc/' + id);
  }

  getHomestayById(id: number): Observable<any> {
    return this.http.get<Homestay2>(API_URL + 'homestay/' + id);
  }

  // image

  getAllImage(): Observable<any> {
    return this.http.get<ImageOfHomestay[]>(API_URL + 'homestay/image-of-homestay');
  }

  findImageOfHomestaysByHomestay_Id(id: number): Observable<any> {
    return this.http.get<ImageOfHomestay[]>(API_URL + 'homestay/image-of-homestay/' + id);
  }

  // rate

  getAllRateByHomestay(id: number): Observable<any> {
    return this.http.get<Rate[]>(API_URL + 'rate/homestay/' + id);
  }

  getAllRateByAccount(id: number): Observable<any> {
    return this.http.get<Rate[]>(API_URL + 'rate/account/' + id);
  }


}
