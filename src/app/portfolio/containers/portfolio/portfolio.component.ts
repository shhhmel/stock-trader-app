// Angular
import { Component, OnInit } from '@angular/core';

// @angular/material
import { MatSnackBar } from '@angular/material/snack-bar';

// @ngrx
import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';

// RxJS
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Interfaces
import { Stock } from '../../models/stock.model';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  stocks$: Observable<Stock[]>;
  totalPrice$: Observable<any>;
  loading$: Observable<boolean>;
  stocks: Stock[];

  constructor(
    private store: Store<fromStore.StockFeatureState>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.LoadStocks();

    this.stocks$ = this.store.pipe(select(fromStore.getAllStocks));
    this.totalPrice$ = this.store.pipe(select(fromStore.getTotalPrice));
    this.loading$ = this.store.pipe(select(fromStore.getStocksLoading));
  }

  LoadStocks() {
    this.store.dispatch(new fromStore.LoadStocks());
  }

  onSell({ quant, stock }): void {
    // ------------
    // NGRX DISPATCH SELL
    // ------------
    this.showBuyMessage(quant, stock.market);
  }

  showBuyMessage(quant: number, name: string): void {
    const message =
      quant > 1
        ? `${quant} "${name}" were sold`
        : `${quant} "${name}" was sold`;
    this.snackBar.open(message, '', {
      duration: 5000,
      verticalPosition: 'top'
    });
  }

  private generateID(): string {
    return (
      String.fromCharCode(Math.floor(Math.random() * 11)) +
      Math.floor(Math.random() * 1000000)
    );
  }
}
