// Angular
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

// @ngrx
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-markets-filter',
  templateUrl: './markets-filter.component.html',
  styleUrls: ['./markets-filter.component.css']
})
export class MarketsFilterComponent implements OnInit {

  @Input() categories: string[];
  @Output() filter: EventEmitter<string> = new EventEmitter();
  @Output() reset: EventEmitter<void> = new EventEmitter();

  categotyControl = new FormControl();
  filteredCategories: Observable<string[]>;

  constructor() { }

  ngOnInit() {
    this.filteredCategories = this.categotyControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  public _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.categories.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSubmit(): void {
    if (this.categotyControl.value) {
      this.filter.emit(this.categotyControl.value);
    }
  }

  onReset(): void {
    this.categotyControl.setValue('');
    this.reset.emit();
  }

}
