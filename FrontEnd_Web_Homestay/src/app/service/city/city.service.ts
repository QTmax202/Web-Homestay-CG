import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CityDto} from "../../models/city-dto";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }

  getCityTop1() {
    return this.http.get<CityDto[]>(API_URL + 'city/top-1')
  }

  getCityTop2() {
    return this.http.get<CityDto[]>(API_URL + 'city/top-2')
  }

  getCityTop3() {
    return this.http.get<CityDto[]>(API_URL + 'city/top-3')
  }
}
