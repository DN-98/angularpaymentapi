import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
  
export class AuthManagementService {
  endpoint: string = `https://deah-payment-api.herokuapp.com`
  headers = new HttpHeaders().set('Content-Type', 'appilcation/json')

  constructor(private http: HttpClient, public router: Router) { }

  get isAuthenticated(){
    let isTokenValid = this.cekToken().subscribe(() => true, ()=> false)
    return !!this.getAuthorizationToken() && isTokenValid
  }

  getAuthorizationToken = () => localStorage.getItem('token')

  setAuthorizationToken = (token: string, refreshToken : string) => {
    localStorage.setItem('refreshToken', refreshToken);
    return localStorage.setItem('token', token);
  }
  

  login(user: User): Observable<any>{
    const api = `${this.endpoint}/api/authmanagement/login`;
    return this.http.post(api, user).pipe(catchError(this.errorHandler))
  }

  register(user: User): Observable<any>{
    const api = `${this.endpoint}/api/authmanagement/register`;
    return this.http.post(api, user).pipe(catchError(this.errorHandler))
  }

  cekToken(){
    const api = `${this.endpoint}/api/authmanagement/RefreshToken`
    return this.http.post(api, {"token" : localStorage.getItem('token'), "refreshToken" : localStorage.getItem('refreshToken')}).pipe(catchError(this.errorHandler))
  }

  errorHandler = (err: HttpErrorResponse) => {
    if(err.status < 500)
    return throwError(err.error.message)
    else
    return throwError(`Server-side error code: ${err.status}\nMessage: ${err.message}`)
  }
}
