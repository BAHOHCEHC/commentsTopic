import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CommentsComponent } from './comments/comments.component';
import { CommensEffect } from './redux/comments.effect';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { commentsReducer } from './redux/comments.reducer';
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    // console.log('state', state);
    // console.log('action', action);
    return reducer(state, action);
  };
}
export const metaReducers: MetaReducer<any>[] = [debug];

@NgModule({
  declarations: [AppComponent, CommentsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    EffectsModule.forRoot([CommensEffect]),
    StoreModule.forRoot({ commentsPage: commentsReducer }, { metaReducers }),
    RouterModule.forRoot([{ path: '', component: AppComponent }]),
    StoreRouterConnectingModule.forRoot()
    // environment.production ? [] : StoreDevtoolsModule.instrument() //активация расширения
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
