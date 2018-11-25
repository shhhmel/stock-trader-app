// Angular
import {
  Component,
  OnInit,
  ViewChildren,
  ElementRef,
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

  @ViewChildren('quantInput') quantInputs;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['market', 'price', 'count', 'quantity', 'sell'];
  dataSource: MatTableDataSource<Stock>;

  constructor() {}

  ngOnInit() {
    this.renderTable();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.stocks && !changes.stocks.firstChange) {
      this.renderTable();
    }
  }

  renderTable() {
    this.dataSource = new MatTableDataSource(this.stocks);
    this.dataSource.sort = this.sort;
  }

  onSell(i: string, stock: Stock): void {
    const input = this.quantInputs._results[i];
    const values = this.quantInputs._results.map((el: ElementRef) => {
      return el.nativeElement.value;
    });
    let currentValue = parseInt(values[i], 10);

    currentValue = currentValue > stock.count ? 0 : currentValue;

    if (currentValue) {
      input.nativeElement.value = '';
      input.nativeElement.dispatchEvent(new Event('input'));
      this.sell.emit({ quant: currentValue, stock: stock });
    }
  }

  sortData() {
    this.dataSource.sort = this.sort;
  }
}
