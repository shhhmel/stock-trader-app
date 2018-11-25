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

// Modules
import { PortfolioRoutingModule } from './portfolio-routing.module';

// @ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';

// Components
import { PortfolioComponent } from './containers/portfolio/portfolio.component';
import { StocksTableComponent } from './components/stocks-table/stocks-table.component';

@NgModule({
  declarations: [PortfolioComponent, StocksTableComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    PortfolioRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('stocks-feature', reducers),
    EffectsModule.forFeature(effects),
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatSortModule,
    MatSnackBarModule
  ]
})
export class PortfolioModule {}
