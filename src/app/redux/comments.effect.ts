import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AddComment, COMMENT_ACTION } from './comments.action';
import { switchMap, mergeMap } from 'rxjs/operators';
import { CommentService } from '../comments.service';
import { Comment } from './../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommensEffect {
  constructor(private actions$: Actions, private service: CommentService) {}

  @Effect() loadComments = this.actions$.pipe(
    ofType(COMMENT_ACTION.ADD_COMMENT),
    switchMap((action: AddComment) => {
      return this.service.preloadComments();
    }),
    mergeMap((comments: Comment[]) => {
      return [
        {
          type: COMMENT_ACTION.LOAD_COMMENTS,
          payload: comments
        }
      ];
    })
  );
}
