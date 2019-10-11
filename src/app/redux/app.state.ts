import { Comments } from '../models/comment.model';

export interface AppState {
  commentsPage: {
    comments: Comments;
  };
}
