import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PaymentDetail } from 'src/app/models/paymentDetail';
import { AuthManagementService } from '../auth/auth-management.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {

  endpoint = `https://deah-payment-api.herokuapp.com/api`
  // headers = new HttpHeaders().set('Authorization', `Bearer ${this.auth.getAuthorizationToken()}`).set('Content-Type', 'appilcation/json')
  // headers = new HttpHeaders().set('Content-Type', 'appilcation/json')
  
  constructor(private http: HttpClient, public auth: AuthManagementService) { }

  getPaymentDetailAll = () => {
    const api = `${this.endpoint}/PaymentDetail`
    return this.http.get(api).pipe(catchError(this.errorHandler))
  }

  getPaymentDetail = (id: number) => {
    const api = `${this.endpoint}/PaymentDetail/${id}`
    return this.http.get(api).pipe(catchError(this.errorHandler))
  }

  createPaymentDetail = (val: PaymentDetail) => {
    const api = `${this.endpoint}/PaymentDetail`
    return this.http.post(api, val).pipe(catchError(this.errorHandler))
  }

  updatePaymentDetail = (id: number, val: PaymentDetail) => {
    const api = `${this.endpoint}/PaymentDetail/${id}`
    return this.http.put(api, val).pipe(catchError(this.errorHandler))
  }

  deletePaymentDetail = (id: number) => {
    const api = `${this.endpoint}/PaymentDetail/${id}`
    return this.http.delete(api).pipe(catchError(this.errorHandler))
  }

  errorHandler = (err: HttpErrorResponse) => {
    if(err.status < 500)
      return throwError(err.error.message)
    else
    return throwError(`Server-side error code: ${err.status}\nMessage: ${err.message}`)
  }
}
