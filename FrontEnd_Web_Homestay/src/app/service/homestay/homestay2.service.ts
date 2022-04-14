import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Homestay2} from "../../models/homestay2";
import {environment} from "../../../environments/environment";

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
}
