import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Homestay2} from "../../models/homestay2";
import {environment} from "../../../environments/environment";
import {ImageOfHomestay} from "../../models/image-of-homestay";
import {Rate} from "../../models/rate";
import {Observable} from "rxjs";
import {MyHomestayDto} from "../../models/my-homestay-dto";
import {YourBillDto} from "../../models/your-bill-dto";
import {HomestayType} from "../../models/homestay-type";
import {City} from "../../models/city";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class Homestay2Service {

  constructor(private http: HttpClient) {
  }
  createHome(id: number, homestay: Homestay2): Observable<Homestay2[]> {
    return this.http.post<any>(API_URL + `homestay/create/${id}`, homestay);
  }

  createHomestay(homestay: Homestay2): Observable<any> {
    return this.http.post<Homestay2>(API_URL + 'homestay', homestay);
  }

  editHome(id: any, homestay: Homestay2): Observable<Homestay2> {
    return this.http.put<Homestay2>(API_URL + `${id}`, homestay);
  }

  getImageOfHomestayById(id: any): Observable<ImageOfHomestay> {
    return this.http.get<ImageOfHomestay>(API_URL + `image-of-homestay/${id}`)
  }

  getAllType(): Observable<HomestayType[]> {
    return this.http.get<HomestayType[]>('http://localhost:8080/api/homestay/type-home')
  }

  getAllCity(): Observable<City[]> {
    return this.http.get<City[]>('http://localhost:8080/api/homestay/city')
  }

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

  create(image: ImageOfHomestay): Observable<ImageOfHomestay> {
    return this.http.post<ImageOfHomestay>(API_URL + `save-image`, image);
  }
}
