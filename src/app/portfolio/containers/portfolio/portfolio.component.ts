// Angular
import { Component, OnInit } from '@angular/core';

// @ngrx
import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';

// RxJS
import { Observable } from 'rxjs';

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

  constructor(private store: Store<fromStore.StockFeatureState>) {}

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
    this.store.dispatch(new fromStore.UpdateStock({ quant, stock }));
  }
}
