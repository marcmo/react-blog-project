export enum PostUpdateActionType {
  INCREMENT_POPULARITY = 'INCREMENT_POPULARITY',
  DECREMENT_POPULARITY = 'DECREMENT_POPULARITY',
  CHANGE_POST_CONTENT = 'CHANGE_POST_CONTENT',
  UPDATE_CATEGORY = 'UPDATE_CATEGORY',
}
export interface IncrementPopularity {
  type: PostUpdateActionType.INCREMENT_POPULARITY;
}
export interface DecrementPopularity {
  type: PostUpdateActionType.DECREMENT_POPULARITY;
}
export interface ChangePostContent {
  type: PostUpdateActionType.CHANGE_POST_CONTENT;
  newContent: string;
  postId: string;
}
export interface UpdateCategory {
  type: PostUpdateActionType.UPDATE_CATEGORY;
  newCategory: string;
  postId: string;
}

export type PostUpdateAction =
  IncrementPopularity
  | DecrementPopularity
  | ChangePostContent
  | UpdateCategory;

export const decrementPopularity = (): DecrementPopularity => ({
  type: PostUpdateActionType.DECREMENT_POPULARITY
});
export const incrementPopularity = (): IncrementPopularity => ({
  type: PostUpdateActionType.INCREMENT_POPULARITY
});
export const updateCategory = (id: string, category: string): UpdateCategory => ({
  type: PostUpdateActionType.UPDATE_CATEGORY,
  newCategory: category,
  postId: id,
});
export const changeContent = (id: string, content: string): ChangePostContent => ({
  type: PostUpdateActionType.CHANGE_POST_CONTENT,
  newContent: content,
  postId: id,
});

// post list actions
export enum UpdatePostListActionType {
  ADD_POST = 'ADD_POST',
  ADD_POST_WITH_NOTIFICATION = 'ADD_POST_WITH_NOTIFICATION',
  REMOVE_POST = 'REMOVE_POST',
  FETCH_POSTS = 'FETCH_POSTS',
}

export interface AddPost {
  type: UpdatePostListActionType.ADD_POST;
  title: string;
  id: string;
}
export interface RemovePost {
  type: UpdatePostListActionType.REMOVE_POST;
  postId: string;
}
export interface FetchPosts {
  type: UpdatePostListActionType.FETCH_POSTS;
  query: string;
}
export type PostListAction =
  RemovePost |
  FetchPosts |
  AddPost;

export const addPost = (title: string, id: string): AddPost => ({
  type: UpdatePostListActionType.ADD_POST,
  title,
  id
});
export const fetchPosts = (query: string): FetchPosts => ({
  type: UpdatePostListActionType.FETCH_POSTS,
  query
});
export const doAddPostWithNotification = (title: string, id: string) => ({
  type: UpdatePostListActionType.ADD_POST_WITH_NOTIFICATION,
  post: { id, name },
});
export const removePost = (id: string): RemovePost => ({
  type: UpdatePostListActionType.REMOVE_POST,
  postId: id,
});
// filter list actions
export enum FilterActionType {
  SHOW_CURRENT = 'SHOW_CURRENT',
  SHOW_DELETED = 'SHOW_DELETED',
  SHOW_ALL = 'SHOW_DELETED',
}
export interface ApplyFilter {
  type: FilterActionType.SHOW_CURRENT;
  filter: string;
}
export interface RemoveFilter {
  type: FilterActionType.SHOW_DELETED;
}
export const applyFilter = (f: string): ApplyFilter => ({
  type: FilterActionType.SHOW_CURRENT,
  filter: f,
});
export const removeFilter = (): RemoveFilter => ({
  type: FilterActionType.SHOW_DELETED
});
export type FilterListAction =
  ApplyFilter |
  RemoveFilter;
