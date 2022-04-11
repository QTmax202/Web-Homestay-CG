import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Comment} from "../../models/comment";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getCommentsByHomestayId(id: number) {
    return this.http.get<Comment[]>(API_URL + 'comment/' + id)
  }
}
