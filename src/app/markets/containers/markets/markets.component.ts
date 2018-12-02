// Angular
import { Component, OnInit } from '@angular/core';

// @ngrx
import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromStocksStore from '../../../portfolio/store';

// RxJS
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

// Interfaces
import { Market } from '../../models/market.model';

@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.css']
})
export class MarketsComponent implements OnInit {
  markets$: Observable<Market[]>;
  categories$: Observable<string[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store<fromStore.MarketFeatureState>) {}

  ngOnInit() {
    this.loadMarkets();

    this.markets$ = this.store.pipe(select(fromStore.getAllMarkets));
    this.loading$ = this.store.pipe(select(fromStore.getMarketsLoading));
    this.categories$ = this.store.pipe(
      select(fromStore.getMarketsCategories),
      take(2)
    );

    this.store.dispatch(new fromStocksStore.LoadStocks());
  }

  loadMarkets(category?: string) {
    this.store.dispatch(new fromStore.LoadMarkets(category));
  }

  onBuy({ quant, market }): void {
    this.store.dispatch(new fromStore.BuyMarket({ quant, market }));
  }
}
