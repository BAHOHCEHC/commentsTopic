import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from './redux/app.state';
import { AddComment, DeleteComment, LoadComments, UpdateComment } from './redux/comments.action';
import { Observable } from 'rxjs';
import { Comment } from './models/comment.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  preloadComments(): Observable<any> {
    return this.http.get(environment.apiUrl + 'comments');
  }

  loadComments(): void {
    this.preloadComments().subscribe(res => {
      this.store.dispatch(new LoadComments(res));
    });
  }

  addComment(comment: Comment) {
    this.http
      .post(environment.apiUrl + 'comments', comment)
      // .toPromise()
      // .then((comment: Comment) => {
      //   this.store.dispatch(new AddComment(comment));
      // });
      .subscribe(() => {
        this.store.dispatch(new AddComment(comment));
      });
  }

  updateComment(comment: Comment) {
    this.http
      .put(environment.apiUrl + 'comments/' + comment.id, comment)
      // .toPromise()
      // .then((comment: Comment) => {
      //   this.store.dispatch(new UpdateComment(comment));
      // });
      .subscribe(() => {
        this.store.dispatch(new UpdateComment(comment));
      });
  }

  deleteComment(comment: Comment) {
    this.http
      .delete(environment.apiUrl + 'comments/' + comment.id)
      // .toPromise()
      // .then(_ => {
      //   this.store.dispatch(new DeleteComment(comment));
      // });
      .subscribe(() => {
        this.store.dispatch(new DeleteComment(comment));
      });
  }
}
