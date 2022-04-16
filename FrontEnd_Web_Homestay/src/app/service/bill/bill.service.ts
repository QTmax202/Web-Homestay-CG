import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Bill} from "../../models/bill";
import {Observable} from "rxjs";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient) { }

  book_homsstay(bill : Bill):Observable<any>{
    return this.http.post(API_URL + 'bill/create-bill',bill);
  }

  bill_homestay_status(id : any): Observable<any>{
    return this.http.get<Bill[]>(API_URL + 'bill/bill-homestay-status/' + id);
  }
}
