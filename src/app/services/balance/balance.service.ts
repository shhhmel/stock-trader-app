// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// RxJS
import { Observable, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

// Interfaces
import { Balance } from '../../models/balance.model';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  constructor(private http: HttpClient) {}

  getBalance(): Observable<Balance> {
    return this.http.get<Balance>(`/api/balance`);
  }

  updateBalance(payload): Observable<Balance> {
    payload = payload.toFixed(2);
    return this.http.put<Balance>(`/api/balance`, {
      value: payload
    });
  }
}
