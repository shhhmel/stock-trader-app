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
import { Stock } from '../../models/stock.model';

@Component({
  selector: 'app-stocks-table',
  templateUrl: './stocks-table.component.html',
  styleUrls: ['./stocks-table.component.css']
})
export class StocksTableComponent implements OnInit, OnChanges {
  @Input() stocks: Stock[];
  @Input() totalPrice: string;
  @Output() sell: EventEmitter<{
    quant: number;
    stock: Stock;
  }> = new EventEmitter();

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['market', 'price', 'count', 'quantity', 'sell'];
  dataSource: MatTableDataSource<Stock>;
  quants = [];

  constructor() {}

  ngOnInit() {
    this.renderTable();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.stocks && !changes.stocks.firstChange) {
      this.initQuants();
      this.renderTable();
    }
  }

  initQuants() {
    this.stocks.forEach(() => {
      this.quants.push('');
    });
  }

  renderTable() {
    this.dataSource = new MatTableDataSource(this.stocks);
    this.dataSource.sort = this.sort;
  }

  onSell(i: string, stock: Stock): void {
    let currentValue = parseInt(this.quants[i], 10);

    currentValue = currentValue > stock.count ? 0 : currentValue;

    if (currentValue) {
      this.quants[i] = '';
      this.sell.emit({ quant: currentValue, stock: stock });
    }
  }

  sortData() {
    this.dataSource.sort = this.sort;
  }
}
