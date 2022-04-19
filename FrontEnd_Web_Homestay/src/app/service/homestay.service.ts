import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Homestay2} from "../models/homestay2";
import {Observable} from "rxjs";
import {ImageOfHomestay} from "../models/image-of-homestay";
import {environment} from "../../environments/environment";
import {HomestayType} from "../models/homestay-type";
import {City} from "../models/city";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class HomestayService {

  constructor(private http: HttpClient) { }

  // tao nha theo id account
  createHome(id: number, homestay: Homestay2): Observable<Homestay2[]> {
    return this.http.post<any>(API_URL + `homestay/create/${id}`, homestay);
  }
  // sua thong tin nha
  editHome(id: any, homestay: Homestay2): Observable<Homestay2> {
    return this.http.put<Homestay2>(API_URL + `homestay/${id}`, homestay);
  }
  //them anh
  create(image: ImageOfHomestay): Observable<ImageOfHomestay> {
    return this.http.post<ImageOfHomestay>(API_URL + `homestay/save-image`, image);
  }
  getAllType(): Observable<HomestayType[]> {
    return this.http.get<HomestayType[]>(API_URL + 'homestay/type-home')
  }

  getAllCity(): Observable<City[]> {
    return this.http.get<City[]>(API_URL + 'homestay/city')
  }
}
