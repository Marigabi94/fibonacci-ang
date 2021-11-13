import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


export interface Fibonacci {
  numero: string;
  serie: string;
  nesimoTermino: string;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})

export class AppService {
  configUrl = 'assets/fibonacci.json';

  constructor(private http: HttpClient) { }
  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }


  getFibonacci() {
    return this.http.get<Fibonacci>(this.configUrl);
  }

  putFibonacci(valor: any, arreglo: any, enesimoT: any): Observable<Fibonacci>{
    return this.http.put<Fibonacci>(this.configUrl, [valor, arreglo, enesimoT], httpOptions)
      .pipe(
        catchError(this.handleError)
        );

  }




}
