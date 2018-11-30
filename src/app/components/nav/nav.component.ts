// Angular
import { Component, OnInit } from '@angular/core';

// @ngrx
import { Store, select } from '@ngrx/store';

// RxJS
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromStore from '../../store';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  balance$: Observable<string>;

  constructor(private store: Store<fromStore.AppState>) {}

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadBalance());

    this.balance$ = this.store.pipe(
      select(fromStore.getBalance),
      map(balance => balance.value)
    );
  }
}
