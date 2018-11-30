// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

// RxJS
import { Observable, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

// Interfaces
import { Market } from 'src/app/markets/models/market.model';

@Injectable({
  providedIn: 'root'
})
export class MarketsService {
  constructor(private http: HttpClient) {}

  getMarkets(category?: string): Observable<Market[]> {
    return this.http
      .get<Market[]>(`/api/markets`, {
        params: category ? new HttpParams().set('category', category) : null
      })
      .pipe(
        delay(250),
        catchError((error: any) => throwError(error.json()))
      );
  }
}
