import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Homestay2} from "../../models/homestay2";
import {environment} from "../../../environments/environment";
import {ImageOfHomestay} from "../../models/image-of-homestay";
import {Rate} from "../../models/rate";
import {Observable} from "rxjs";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class Homestay2Service {

  constructor(private http: HttpClient) { }

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
