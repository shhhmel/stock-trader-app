// Angular
import { Component, OnInit } from '@angular/core';

// @angular/material
import { MatSnackBar } from '@angular/material/snack-bar';

// Interfaces
import { Market } from './market';

import DATA from '../data';

@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.css']
})
export class MarketsComponent implements OnInit {

  markets: Market[];
  filteredMarkets: Market[];
  categories: string[];

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getMarkets();
    this.getCategories();
  }

  getMarkets() {
    // -----------
    // NGRX SELECT MARKETS
    // -----------
    this.markets = [...DATA];
    this.filteredMarkets = [...DATA];
  }

  getCategories() {
    // -----------
    // NGRX SELECT CATEGORIES
    // -----------
    const allCtegories = this.markets.map(market => market.category);
    this.categories = [...new Set(allCtegories)];
  }

  onBuy({ quant, market }): void {
    // ------------
    // NGRX DISPATCH BUY
    // ------------
    this.showBuyMessage(quant, market.name);
  }

  onFilter(category: string): void {
    // ------------
    // NGRX DISPATCH FILTER BY CATEGORY
    // ------------
    this.filteredMarkets = this.markets.filter(market => market.category === category);
  }

  onReset() {
    // ------------
    // NGRX DISPATCH RESET CATEGORY
    // ------------
    this.filteredMarkets = [...this.markets];
  }

  showBuyMessage(quant: number, name: string): void {
    const message = quant > 1
      ? `${quant} "${name}" were added to your Portfolio`
      : `${quant} "${name}" was added to your Portfolio`;
    this.snackBar.open(message, '', {
      duration: 5000,
      verticalPosition: 'top'
    });
  }

}
