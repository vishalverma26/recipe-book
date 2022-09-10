import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, EMPTY, Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { apiUrl } from "../shared/misc/api-url.constant";
import { User } from "./user.model";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSubject: BehaviorSubject<User> = new BehaviorSubject(null);
  queryParams: HttpParams;
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {
    this.queryParams = new HttpParams().set('key', 'AIzaSyCpNm_uKuse9919X5U-LUU-oGvFoNdGfjI');
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(apiUrl.signup,
      {
        email, password, returnSecureToken: true
      },
      {
        params: this.queryParams
      })
      .pipe(catchError(this.handleError), tap(resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(apiUrl.signin,
      {
        email, password, returnSecureToken: true
      },
      {
        params: this.queryParams
      })
      .pipe(catchError(this.handleError), tap(resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }));
  }

  logout() {
    return new Observable(subscriber => {
      subscriber.next(EMPTY);
      localStorage.removeItem('userData');
      this.userSubject.next(null);

      (this.tokenExpirationTimer && clearTimeout(this.tokenExpirationTimer));
      this.tokenExpirationTimer = null;
      this.router.navigate(['/']);

      subscriber.complete();
    });
  }

  private handleError(error: HttpErrorResponse) {
    let genericErrorMessage = 'An Unknown Error Occurred!';

    if (!error?.error) {
      return throwError(genericErrorMessage);
    }

    switch (error?.error?.error?.message) {
      case 'EMAIL_EXISTS':
        genericErrorMessage = 'Email exists already!';
        break;
      case 'EMAIL_NOT_FOUND':
        genericErrorMessage = 'No Such Email Exists!'
        break;
      case 'INVALID_PASSWORD':
        genericErrorMessage = 'Wrong password entered!';
        break;
    }

    return throwError(genericErrorMessage);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.userSubject.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogout(+expiresIn * 1000);
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if(!userData) return;

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate))

    if(loadedUser.token) {

      this.userSubject.next(loadedUser);
      const expirationDuration = (new Date(userData._tokenExpirationDate).getTime() - new Date().getTime());
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout().subscribe();
    }, expirationDuration);
  }
}
