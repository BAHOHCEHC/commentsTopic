import { Action } from '@ngrx/store';
import { Comment } from '../models/comment.model';

export namespace COMMENT_ACTION {
  export const ADD_COMMENT = 'ADD_COMMENT';
  export const DELETE_COMMENT = 'DELETE_COMMENT';
  export const UPDATE_COMMENT = 'UPDATE_COMMENT';
  export const LOAD_COMMENTS = 'LOAD_COMMENTS';
  // export const SEARCH = 'SEARCH_COMMENTS';
  // export const SEARCH_COMPLETE = 'SEARCH_COMPLETE';
}
// export class SearchComment implements Action {
//   readonly type = COMMENT_ACTION.SEARCH;
//   constructor(public payload: string) {}
// }

// export class SearchComplete implements Action {
//   readonly type = COMMENT_ACTION.SEARCH_COMPLETE;
//   constructor(public payload: Comment[]) {}
// }
export class AddComment implements Action {
  readonly type = COMMENT_ACTION.ADD_COMMENT;
  constructor(public payload: Comment) {}
}

export class DeleteComment implements Action {
  readonly type = COMMENT_ACTION.DELETE_COMMENT;
  constructor(public payload: Comment) {}
}

export class UpdateComment implements Action {
  readonly type = COMMENT_ACTION.UPDATE_COMMENT;
  constructor(public payload: Comment) {}
}

export class LoadComments implements Action {
  readonly type = COMMENT_ACTION.LOAD_COMMENTS;
  constructor(public payload: Comment[]) {}
}

export type CommentsAction = AddComment | DeleteComment | LoadComments | UpdateComment;
// | SearchComment | SearchComplete;
