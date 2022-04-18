import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Comment} from "../../models/comment";
import {Observable} from "rxjs";
import {Rate} from "../../models/rate";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  existsCommentByAccount_IdAndHomestay_Id(accId: any, homeId: any): Observable<any> {
    return this.http.get(API_URL + 'comment/' + accId + '/' + homeId)
  }

  getCommentsByHomestayId(id: number): Observable<any>  {
    return this.http.get<Comment[]>(API_URL + 'comment/' + id)
  }

  createComment(comment: Comment): Observable<any> {
    return this.http.post(API_URL + 'comment', comment);
  }

  createRate(rate: Rate): Observable<any> {
    return this.http.post(API_URL + 'comment/rate', rate);
  }
}
