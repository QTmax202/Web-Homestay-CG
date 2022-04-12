import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Comment} from "../../models/comment";
import {Observable} from "rxjs";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getCommentsByHomestayId(id: number): Observable<any>  {
    return this.http.get<Comment[]>(API_URL + 'comment/' + id)
  }

  createComment(comment: Comment): Observable<any> {
    return this.http.post(API_URL + 'comment', comment);
  }
}
