// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Materila
import { MatCardModule } from '@angular/material/card';

// Modules
import { CustomersRoutingModule } from './markets-routing.module';

// Components
import { MarketsComponent } from './markets.component';

@NgModule({
  declarations: [MarketsComponent],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    MatCardModule
  ]
})
export class MarketsModule { }
