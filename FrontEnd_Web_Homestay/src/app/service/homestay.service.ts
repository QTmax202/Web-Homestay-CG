import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Homestay} from "../models/homestay";
import {Observable} from "rxjs";
import {HomestayType} from "../models/homestay-type";
import {City} from "../models/city";



@Injectable({
  providedIn: 'root'
})
export class HomestayService {

  constructor(private http: HttpClient) { }

  public createHome(homestay: Homestay): Observable<Homestay[]> {
    return this.http.post<any>('http://localhost:8080/api/homestay/create', homestay);
  }


  public getAllType(): Observable<HomestayType[]> {
    return this.http.get<HomestayType[]>('http://localhost:8080/api/homestay/type-home')
  }
  public getAllCity(): Observable<City[]> {
    return this.http.get<City[]>('http://localhost:8080/api/homestay/city')
  }
}
