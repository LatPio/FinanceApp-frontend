import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError} from "rxjs";
import {AuthService} from "./auth/service/auth.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {LoginResponsePayload} from "./auth/login/login.response.payload";

@Injectable({
  providedIn: 'root'
})

export class TokenInterceptor implements HttpInterceptor{

  isTokenRefreshing = false;
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private authService: AuthService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const jwtToken = this.authService.getJwtToken();

    if(jwtToken){
      return next.handle(this.addToken(req, jwtToken))
        .pipe(catchError(err => {
          if(err instanceof HttpErrorResponse && err.status === 403) {
            return this.handleAuthErrors(req, next);
          } else {
            return throwError(err)
          }
        }));
    }
    return next.handle(req);


  }
  private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler)
    : Observable<HttpEvent<any>> {
    if (!this.isTokenRefreshing) {
      this.isTokenRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((refreshTokenResponse: LoginResponsePayload) => {
          this.isTokenRefreshing = false;
          this.refreshTokenSubject
            .next(refreshTokenResponse.token);
          return next.handle(this.addToken(req,
            refreshTokenResponse.token));
        })
      )
    } else {
      return this.refreshTokenSubject.pipe(
        filter(result => result !== null),
        take(1),
        switchMap((res) => {
          return next.handle(this.addToken(req,
            this.authService.getJwtToken()))
        })
      );
    }
  }

  addToken(req: HttpRequest<any>, jwtToken: any) {
    return req.clone({
      setHeaders: {Authorization: `Bearer ${jwtToken}`}
    });
  }
}
