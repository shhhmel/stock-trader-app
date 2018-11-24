// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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

// Modules
import { CustomersRoutingModule } from './markets-routing.module';

// Components
import { MarketsComponent } from './markets.component';
import { MarketsTableComponent } from './markets-table/markets-table.component';
import { MarketsFilterComponent } from './markets-filter/markets-filter.component';

@NgModule({
  declarations: [MarketsComponent, MarketsTableComponent, MarketsFilterComponent],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatSortModule,
    MatSnackBarModule,
    MatIconModule,
    MatAutocompleteModule,
    MatSidenavModule
  ],
  entryComponents: [MarketsFilterComponent]
})
export class MarketsModule { }
