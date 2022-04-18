import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CityDto} from "../../models/city-dto";
import {Observable} from "rxjs";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }

  getCityTop1(): Observable<any> {
    return this.http.get<CityDto[]>(API_URL + 'city/top-1')
  }

  getCityTop2(): Observable<any> {
    return this.http.get<CityDto[]>(API_URL + 'city/top-2')
  }

  getCityTop3(): Observable<any> {
    return this.http.get<CityDto[]>(API_URL + 'city/top-3')
  }
}
