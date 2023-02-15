import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SignupRequestPayload} from "../signup/signup-request.payload";
import {map, Observable, tap} from "rxjs";
import {LoginRequestPayload} from "../login/login.request.payload";
import {LoginResponsePayload} from "../login/login.response.payload";
import {LocalStorageService} from "ngx-webstorage";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() userEmail: EventEmitter<string> = new EventEmitter();



  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  }

    constructor(private http:HttpClient,
                private localStorage:LocalStorageService) { }


  signup(signupRequestPayload: SignupRequestPayload) : Observable<any>{
      const url = 'http://localhost:8080/api/auth/signup';
      return this.http.post(url, signupRequestPayload, {responseType: 'text'});
  }

  login(loginRequestPayload: LoginRequestPayload) : Observable<any>{
    const url = 'http://localhost:8080/api/auth/login';
    return this.http.post<LoginResponsePayload>(url, loginRequestPayload)
      .pipe(map(data => {
        this.localStorage.store('token', data.token);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);
        this.localStorage.store('email', data.email)


        this.loggedIn.emit(true)
        this.userEmail.emit(data.email)
        return true;
      }));
  }

  getJwtToken() {
    return this.localStorage.retrieve('token');
  }

  refreshToken() {
    return this.http.post<LoginResponsePayload>('http://localhost:8080/api/auth/refresh/token', this.refreshTokenPayload)
      .pipe(tap(response => {
        this.localStorage.clear('token');
        this.localStorage.clear('expiresAt');

        this.localStorage.store('token', response.token);
        this.localStorage.store('expiresAt', response.expiresAt);
      }));
  }

  private getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  private getUserName() {
    return this.localStorage.retrieve('username');
  }

  isLoggedIn() {
    return this.getJwtToken() !=null;
  }

  getUserEmail() {
    return this.localStorage.retrieve('email');
  }

  logout() {
    this.http.post('http://localhost:8080/api/auth/logout', this.refreshTokenPayload,{responseType: 'text'})
      .subscribe( (data)=> {
        console.log(data);
    }, error => {
        throw error;
      })
    this.localStorage.clear('token');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
    this.localStorage.clear('email')
    this.loggedIn.emit(false)
  }
}
