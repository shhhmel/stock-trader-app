// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular CLI environemnt
import { environment } from '../environments/environment';

// @ngrx
import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';

// not used in production
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

// @angular/material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Modules
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './components/app/app.component';
import { NavComponent } from './components/nav/nav.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];

@NgModule({
  declarations: [AppComponent, NavComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
