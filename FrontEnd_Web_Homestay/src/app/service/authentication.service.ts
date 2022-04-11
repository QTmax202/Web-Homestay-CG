import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {AccToken} from "../models/acc-token";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<AccToken>;
  public currentUser: Observable<AccToken>;
  update = new EventEmitter<string>();

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<AccToken>(JSON.parse(<any>localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): AccToken {
    return this.currentUserSubject.value;
  }

  login(gmail: string, password: string) {
    return this.http.post<any>('http://localhost:8080/api/auth/sign-in', {gmail, password})
      .pipe(map(account => {
          localStorage.setItem('currentAccount', JSON.stringify(account));
          this.currentUserSubject.next(account);
          this.update.emit('login');
          return account;
      }));
  }

  logout() {
    localStorage.removeItem('currentAccount');
    // localStorage.removeItem('ROLE');
    // localStorage.removeItem('ACCESS_TOKEN');
    // localStorage.removeItem('EMAIL');
    // this.currentUserSubject.next(null);
  }
}
