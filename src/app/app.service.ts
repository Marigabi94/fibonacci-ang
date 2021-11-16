import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Fibonacci {
  id: number;
  serie: string;
  nesimoTermino: string;
}



@Injectable({
  providedIn: 'root'
})

export class AppService {
  configUrl = 'http://localhost:3000/fibonacci/';

  constructor(private http: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }



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


  getFibonacci(id: number): Observable<Fibonacci> {
    return this.http.get<Fibonacci>(this.configUrl + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }



  postFibonacci(fibonacci: any): Observable<Fibonacci> {
    return this.http.post<Fibonacci>(this.configUrl , JSON.stringify(fibonacci), this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


}
