import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from './redux/app.state';
import { CommentService } from './comments.service';
import { tap, filter, map, find, takeUntil } from 'rxjs/operators';
import { Comment, Comments } from './models/comment.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  commentState$: Observable<any>;
  searchField: string = '';
  textArea: string = '';
  comments;
  asub$: Subscription;

  constructor(private store: Store<AppState>, private service: CommentService) {
    this.service.loadComments();
  }
  ngOnInit() {
    this.init();
  }
  ngOnDestroy(): void {
    if (this.asub$) {
      this.asub$.unsubscribe();
    }
  }
  init() {
    this.commentState$ = this.store.select('commentsPage');
    this.asub$ = this.commentState$.subscribe(res => {
      this.comments = res;
    });
  }

  addTopic() {
    const topic = new Comment(this.textArea);
    this.service.addComment(topic);
    this.textArea = '';
  }
  folow() {
    if (!this.searchField.length) {
      this.service.loadComments();
    }
  }
  searchComment() {
    if (!this.searchField.length) {
      this.service.loadComments();
      return;
    }
    if (this.searchField.length < 2) {
      debugger;
      this.service.loadComments();
      this.init();
      return;
    }
    this.commentState$ = this.store.select('commentsPage').pipe(
      map(arr =>
        arr.comments.filter(comment => {
          return !(comment['body'].toLowerCase().indexOf(this.searchField.toLowerCase()) !== -1) ? false : true;
        })
      )
    );

    this.asub$ = this.commentState$.subscribe(res => {
      this.comments['comments'] = res;
    });
  }
}
