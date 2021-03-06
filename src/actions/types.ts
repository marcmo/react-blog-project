
export enum UpdatePostListActionType {
  CREATE_POST = 'CREATE_POST',
  ADD_POST = 'ADD_POST',
  ADD_COMMENT = 'ADD_COMMENT',
  UPDATE_LOCAL_COMMENTS = 'UPDATE_LOCAL_COMMENTS',
  ADD_FETCHED_POSTS = 'ADD_FETCHED_POSTS',
  UPDATE_POST = 'UPDATE_POST',
  EDIT_POST = 'EDIT_POST',
  EDIT_COMMENT = 'EDIT_COMMENT',
  DELETE_COMMENT = 'DELETE_COMMENT',
  POST_SELECTED = 'POST_SELECTED',
  POST_DESELECTED = 'POST_DESELECTED',
  REMOVE_POST = 'REMOVE_POST',
  FETCH_POSTS = 'FETCH_POSTS',
  FETCH_POST_DETAILS = 'FETCH_POST_DETAILS',
  FETCH_POST_COMMENTS = 'FETCH_POST_COMMENTS',
  FETCH_CATEGORIES = 'FETCH_CATEGORIES',
  FETCH_ERROR = 'FETCH_ERROR',
  INCREMENT_POPULARITY = 'INCREMENT_POPULARITY',
  DECREMENT_POPULARITY = 'DECREMENT_POPULARITY',
  INCREMENT_POPULARITY_COMMENT = 'INCREMENT_POPULARITY_COMMENT',
  DECREMENT_POPULARITY_COMMENT = 'DECREMENT_POPULARITY_COMMENT',
}

export enum FilterActionType {
  APPLY_FILTER = 'APPLY_FILTER',
  SHOW_DELETED = 'SHOW_DELETED',
  ADD_REMOTE_CATEGORIES = 'ADD_REMOTE_CATEGORIES',
}
