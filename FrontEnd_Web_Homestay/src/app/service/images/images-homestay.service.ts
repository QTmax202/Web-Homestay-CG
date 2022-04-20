import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ImageOfHomestay} from "../../models/image-of-homestay";
import {Observable} from "rxjs";
import {Homestay2} from "../../models/homestay2";
import {environment} from "../../../environments/environment";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class ImagesHomestayService {

  constructor(private http: HttpClient) { }

  save_image(image: { images: any; homestay: Homestay2 }):Observable<any> {
    return this.http.post<ImageOfHomestay>(API_URL + 'image/save-image', image);
  }

  get_images_of_homestay(id : any):Observable<any>{
    return this.http.get<ImageOfHomestay[]>(API_URL + 'image/images-of-homestay/' + id)
  }

  deleteImageHomestay(id : any):Observable<any>{
    return this.http.delete<any>(API_URL + 'image/delete-image-homestay/' +id);
  }
}
