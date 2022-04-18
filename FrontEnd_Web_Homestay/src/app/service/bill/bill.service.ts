import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Bill} from "../../models/bill";
import {Observable} from "rxjs";
import {TurnOver} from "../../models/turn-over";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient) {
  }

  book_homsstay(bill: Bill): Observable<any> {
    return this.http.post(API_URL + 'bill/create-bill', bill);
  }

  bill_homestay_status(id: any): Observable<any> {
    return this.http.get<Bill[]>(API_URL + 'bill/bill-homestay-status/' + id);
  }

  findTurnOverByAccountAndStartDate(id: any, startDate1: string, startDate2: string): Observable<any> {
    return this.http.get<TurnOver[]>(API_URL + 'bill/turn-over?id=' + id +
      '&startDate1=' + startDate1 + '&startDate2=' + startDate2)
  }

  findBillById(id:any):Observable<any> {
    return this.http.get<Bill>(API_URL + 'bill/find-bill/' + id);
  }

  cancellingInvoiceClient(id:any): Observable<any> {
    return this.http.post(API_URL + 'bill/cancelling-invoice-client', id);
  }
}
