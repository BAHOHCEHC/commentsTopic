import { COMMENT_ACTION, CommentsAction } from './comments.action';

const initialState = {
  comments: []
};

export function commentsReducer(state = initialState, action: CommentsAction) {
  switch (action.type) {
    case COMMENT_ACTION.ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload]
      };
    case COMMENT_ACTION.DELETE_COMMENT:
      return {
        ...state,
        comments: [...state.comments.filter(c => c.id !== action.payload.id)]
      };
    case COMMENT_ACTION.UPDATE_COMMENT:
      const idx = state.comments.findIndex(c => c.id === action.payload.id);
      return {
        ...state,
        comments: [...state.comments]
      };
    case COMMENT_ACTION.LOAD_COMMENTS:
      return {
        ...state,
        comments: [...action.payload]
      };

    // case COMMENT_ACTION.SEARCH:
    //   const query = action.payload;
    //   if (query === '') {
    //     return {
    //       ...state,
    //       comments: [...action.payload]
    //     };
    //   }

    //   return Object.assign({}, state, {
    //     query,
    //     loading: true
    //   });
    // case COMMENT_ACTION.SEARCH_COMPLETE:
    //   const comments = action.payload;

    //   return {
    //     id: comments.map(comment => comment.id),
    //     loading: false,
    //     query: state
    //   };
    default:
      return state;
  }
}
