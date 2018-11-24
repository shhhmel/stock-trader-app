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
import { Market } from '../market';

@Component({
  selector: 'app-markets-table',
  templateUrl: './markets-table.component.html',
  styleUrls: ['./markets-table.component.css']
})
export class MarketsTableComponent implements OnInit, OnChanges {

  @Input() markets;
  @Output() buy: EventEmitter<{quant: number, market: Market}> = new EventEmitter();

  @ViewChildren('quantInput') quantInputs;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['name', 'price', 'category', 'quantity', 'buy'];
  dataSource: MatTableDataSource<Market>;

  constructor() { }

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

  onBuy(i: string, market: Market): void {
    const input = this.quantInputs._results[i];
    const values = this.quantInputs._results.map((el: ElementRef) => {
      return el.nativeElement.value;
    });
    const currentValue = parseInt(values[i], 10);

    if (currentValue) {
      input.nativeElement.currentValue = '';
      this.buy.emit({ quant: currentValue, market: market });
    }
  }

}
