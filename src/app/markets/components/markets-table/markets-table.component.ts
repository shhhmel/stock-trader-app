// Angular
import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';

// @angular/material
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// Interfaces
import { Market } from '../../models/market.model';

@Component({
  selector: 'app-markets-table',
  templateUrl: './markets-table.component.html',
  styleUrls: ['./markets-table.component.css']
})
export class MarketsTableComponent implements OnInit, OnChanges {
  @Input() markets;
  @Output() buy: EventEmitter<{
    quant: number;
    market: Market;
  }> = new EventEmitter();

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['name', 'price', 'category', 'quantity', 'buy'];
  dataSource: MatTableDataSource<Market>;

  quants = [];

  constructor() {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.markets);
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.markets && !changes.markets.firstChange) {
      this.dataSource = new MatTableDataSource(this.markets);
      this.dataSource.sort = this.sort;
    }
  }

  initQuants() {
    this.markets.forEach(() => {
      this.quants.push('');
    });
  }

  onBuy(i: string, market: Market): void {
    const currentValue = parseInt(this.quants[i], 10);

    if (currentValue) {
      this.quants[i] = '';
      this.buy.emit({ quant: currentValue, market: market });
    }
  }

  sortData() {
    this.dataSource.sort = this.sort;
  }
}
