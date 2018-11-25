// Angular
import { Component, OnInit } from '@angular/core';

// @angular/material
import { MatSnackBar } from '@angular/material/snack-bar';

// @ngrx
import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';

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

  constructor(
    private store: Store<fromStore.MarketFeatureState>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadMarkets();
    this.markets$ = this.store.pipe(select(fromStore.getAllMarkets));
    this.categories$ = this.store.pipe(
      select(fromStore.getMarketsCategories),
      take(2)
    );
  }

  loadMarkets(category?: string) {
    this.store.dispatch(new fromStore.LoadMarkets(category));
  }

  onBuy({ quant, market }): void {
    // ------------
    // NGRX DISPATCH BUY
    // ------------
    this.showBuyMessage(quant, market.name);
  }

  showBuyMessage(quant: number, name: string): void {
    const message =
      quant > 1
        ? `${quant} "${name}" were added to your Portfolio`
        : `${quant} "${name}" was added to your Portfolio`;
    this.snackBar.open(message, '', {
      duration: 5000,
      verticalPosition: 'top'
    });
  }
}
