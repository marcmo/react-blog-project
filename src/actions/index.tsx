import { Post } from '../types';

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
  ADD_REMOTE_POSTS = 'ADD_REMOTE_POSTS',
  ADD_POST_WITH_NOTIFICATION = 'ADD_POST_WITH_NOTIFICATION',
  REMOVE_POST = 'REMOVE_POST',
  FETCH_POSTS = 'FETCH_POSTS',
  FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR',
}

export interface AddRemotePosts {
  type: UpdatePostListActionType.ADD_REMOTE_POSTS;
  posts: Array<Post>;
}
export interface AddPost {
  type: UpdatePostListActionType.ADD_POST;
  title: string;
  author: string;
}
export interface RemovePost {
  type: UpdatePostListActionType.REMOVE_POST;
  postId: string;
}
export interface FetchPosts {
  type: UpdatePostListActionType.FETCH_POSTS;
  query: string;
}
export interface FetchPostsError {
  type: UpdatePostListActionType.FETCH_POSTS_ERROR;
  error: string;
}
export type PostListAction =
  RemovePost |
  FetchPosts |
  FetchPostsError |
  AddRemotePosts |
  AddPost;

export const addPost = (title: string, author: string): AddPost => ({
  type: UpdatePostListActionType.ADD_POST,
  title,
  author
});
export const addRemotePosts = (posts: Array<Post>): AddRemotePosts => ({
  type: UpdatePostListActionType.ADD_REMOTE_POSTS,
  posts
});
export const fetchPosts = (query: string): FetchPosts => ({
  type: UpdatePostListActionType.FETCH_POSTS,
  query
});
export const fetchPostsError = (error: string): FetchPostsError => ({
  type: UpdatePostListActionType.FETCH_POSTS_ERROR,
  error
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
