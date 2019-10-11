import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CommentsComponent } from './comments/comments.component';
import { CommensEffect } from './redux/comments.effect';
// import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { commentsReducer } from './redux/comments.reducer';

@NgModule({
  declarations: [AppComponent, CommentsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    // EffectsModule.forRoot([CommensEffect]),
    StoreModule.forRoot({ commentsPage: commentsReducer }),
    RouterModule.forRoot([{ path: '', component: AppComponent }]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
