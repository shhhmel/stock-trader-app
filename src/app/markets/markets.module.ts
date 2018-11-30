// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// @angular/material
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Modules
import { CustomersRoutingModule } from './markets-routing.module';

// @ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';

// Components
import { MarketsComponent } from './containers/markets/markets.component';
import { MarketsTableComponent } from './components/markets-table/markets-table.component';
import { MarketsFilterComponent } from './components/markets-filter/markets-filter.component';

@NgModule({
  declarations: [
    MarketsComponent,
    MarketsTableComponent,
    MarketsFilterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CustomersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('markets-feature', reducers),
    EffectsModule.forFeature(effects),
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatSortModule,
    MatSnackBarModule,
    MatIconModule,
    MatAutocompleteModule,
    MatSidenavModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [MarketsFilterComponent]
})
export class MarketsModule {}
