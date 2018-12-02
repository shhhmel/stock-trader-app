// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// RxJS
import { Observable, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

// Interfaces
import { Stock } from '../../models/stock.model';

@Injectable({
  providedIn: 'root'
})
export class StocksService {
  constructor(private http: HttpClient) {}

  getStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>(`/api/stocks`).pipe(
      delay(250),
      catchError((error: any) => throwError(error.json()))
    );
  }

  addStock(payload): Observable<Stock> {
    return this.http
      .post<Stock>(`/api/stocks`, payload)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  updateStock(payload): Observable<Stock> {
    return this.http
      .put<Stock>(`/api/stocks/${payload.id}`, payload)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  deleteStock(payload): Observable<Stock> {
    return this.http
      .delete<Stock>(`/api/stocks/${payload.id}`)
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
