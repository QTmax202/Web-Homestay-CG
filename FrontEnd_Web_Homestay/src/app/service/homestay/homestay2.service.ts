import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Homestay2} from "../../models/homestay2";
import {environment} from "../../../environments/environment";
import {ImageOfHomestay} from "../../models/image-of-homestay";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class Homestay2Service {

  constructor(private http: HttpClient) { }

  getAllHomestay() {
    return this.http.get<Homestay2[]>(API_URL + 'homestay');
  }

  getHomestayById(id: number) {
    return this.http.get<Homestay2>(API_URL + 'homestay/' + id);
  }

  findImageOfHomestaysByHomestay_Id(id: number) {
    return this.http.get<ImageOfHomestay>(API_URL + 'homestay/image-of-homestay/' + id);
  }
}
